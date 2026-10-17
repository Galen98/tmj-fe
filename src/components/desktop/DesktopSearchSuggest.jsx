import {
    useEffect,
    useState,
} from "react";

import {
    Link,
} from "react-router-dom";

import {
    FontAwesomeIcon,
} from "@fortawesome/react-fontawesome";

import {
    faLocationDot,
    faSuitcaseRolling,
    faLandmark,
    faArrowRight,
    faMagnifyingGlass,
    faSpinner,
} from "@fortawesome/free-solid-svg-icons";

import {
    getSearchSuggestions,
} from "../../services/searchService";


export default function DesktopSearchSuggest({
    keyword,
    isFocus,
    onClose,
}) {

    /*
     * =========================================
     * STATE
     * =========================================
     */

    const [
        suggestions,
        setSuggestions,
    ] = useState([]);


    const [
        isLoading,
        setIsLoading,
    ] = useState(false);


    /*
     * =========================================
     * SEARCH KEYWORD
     * =========================================
     */

    const searchKeyword =
        keyword.trim();


    /*
     * =========================================
     * SEARCH API
     * =========================================
     */

    useEffect(() => {

        /*
         * Jangan request kalau:
         *
         * - input tidak focus
         * - keyword kurang dari 2 karakter
         */

        if (
            !isFocus ||
            searchKeyword.length < 2
        ) {
            return;
        }


        /*
         * =========================================
         * ABORT CONTROLLER
         * =========================================
         *
         * Digunakan untuk membatalkan request
         * sebelumnya ketika keyword berubah.
         */

        const controller =
            new AbortController();


        /*
         * =========================================
         * DEBOUNCE
         * =========================================
         *
         * Tunggu 400ms setelah user berhenti
         * mengetik sebelum request API.
         */

        const timer =
            setTimeout(
                async () => {

                    try {

                        /*
                         * Loading
                         */

                        setIsLoading(true);


                        /*
                         * Request API
                         */

                        const data =
                            await getSearchSuggestions(
                                searchKeyword,
                                controller.signal
                            );


                        /*
                         * Jangan update state
                         * kalau request sudah dibatalkan.
                         */

                        if (
                            controller.signal.aborted
                        ) {
                            return;
                        }


                        /*
                         * Set hasil search.
                         */

                        setSuggestions(
                            data
                        );

                    } catch (error) {


                        /*
                         * AbortError bukan error.
                         *
                         * Biasanya terjadi karena
                         * user mengetik keyword baru.
                         */

                        if (
                            error.name ===
                            "AbortError"
                        ) {
                            return;
                        }


                        console.error(
                            "Gagal mengambil search suggestions:",
                            error
                        );


                        setSuggestions([]);

                    } finally {


                        /*
                         * Jangan update loading
                         * kalau request sudah dibatalkan.
                         */

                        if (
                            !controller.signal.aborted
                        ) {

                            setIsLoading(false);

                        }

                    }

                },
                400
            );


        /*
         * =========================================
         * CLEANUP
         * =========================================
         *
         * Ketika keyword berubah:
         *
         * 1. Batalkan debounce sebelumnya
         * 2. Batalkan request sebelumnya
         */

        return () => {

            clearTimeout(
                timer
            );


            controller.abort();

        };

    }, [
        searchKeyword,
        isFocus,
    ]);


    /*
     * =========================================
     * TYPE ICON
     * =========================================
     */

    const getTypeIcon = (
        type
    ) => {

        switch (type) {

            case "city":

                return faLocationDot;


            case "travel":

                return faSuitcaseRolling;


            case "poi":

                return faLandmark;


            default:

                return faLocationDot;

        }

    };


    /*
     * =========================================
     * HIDE SEARCH
     * =========================================
     */

    if (
        !isFocus ||
        !searchKeyword
    ) {

        return null;

    }


    /*
     * =========================================
     * VIEW
     * =========================================
     */

    return (

        <div className="desktop-search-suggest">


            {/* ================================= */}
            {/* MINIMUM KEYWORD */}
            {/* ================================= */}

            {searchKeyword.length < 2 && (

                <div className="desktop-search-suggest__loading">

                    <FontAwesomeIcon
                        icon={
                            faMagnifyingGlass
                        }
                    />


                    <span>
                        Ketik minimal 2 karakter
                    </span>

                </div>

            )}


            {/* ================================= */}
            {/* LOADING */}
            {/* ================================= */}

            {searchKeyword.length >= 2 &&
                isLoading && (

                <div className="desktop-search-suggest__loading">

                    <FontAwesomeIcon
                        icon={
                            faSpinner
                        }
                        spin
                    />


                    <span>
                        Mencari...
                    </span>

                </div>

            )}


            {/* ================================= */}
            {/* SEARCH RESULT */}
            {/* ================================= */}

            {searchKeyword.length >= 2 &&
                !isLoading &&
                suggestions.length > 0 && (

                <>

                    {suggestions.map(
                        (
                            item,
                            index
                        ) => (

                            <Link

                                /*
                                 * City dan POI bisa mempunyai
                                 * ID yang sama.
                                 *
                                 * Jadi gunakan:
                                 *
                                 * city-1
                                 * poi-1
                                 */

                                key={
                                    `${item.type}-${item.id}`
                                }


                                /*
                                 * URL sudah diberikan
                                 * backend.
                                 */

                                to={
                                    item.to
                                }


                                className={
                                    `desktop-search-suggest__item ${
                                        index === 0
                                            ? "desktop-search-suggest__item--first"
                                            : ""
                                    }`
                                }


                                onClick={
                                    onClose
                                }

                            >


                                {/* ========================= */}
                                {/* IMAGE / ICON */}
                                {/* ========================= */}

                                {item.image ? (

                                    <img
                                        src={
                                            item.image
                                        }
                                        alt={
                                            item.name
                                        }
                                        className="desktop-search-suggest__image"
                                        loading="lazy"
                                    />

                                ) : (

                                    <div className="desktop-search-suggest__icon">

                                        <FontAwesomeIcon
                                            icon={
                                                getTypeIcon(
                                                    item.type
                                                )
                                            }
                                        />

                                    </div>

                                )}


                                {/* ========================= */}
                                {/* CONTENT */}
                                {/* ========================= */}

                                <div className="desktop-search-suggest__content">


                                    {/* NAME */}

                                    <div className="desktop-search-suggest__name">

                                        {
                                            item.name
                                        }

                                    </div>


                                    {/* DESCRIPTION */}

                                    {item.description && (

                                        <div className="desktop-search-suggest__description">

                                            {
                                                item.description
                                            }

                                        </div>

                                    )}

                                </div>

                            </Link>

                        )
                    )}


                    {/* ================================= */}
                    {/* SHOW ALL */}
                    {/* ================================= */}

                    <Link
                        to={
                            `/search/filter?keyword=${encodeURIComponent(
                                searchKeyword
                            )}`
                        }
                        className="desktop-search-suggest__all"
                        onClick={
                            onClose
                        }
                    >

                        <span>

                            Tampilkan hasil untuk{" "}

                            <strong>
                                "{searchKeyword}"
                            </strong>

                        </span>


                        <FontAwesomeIcon
                            icon={
                                faArrowRight
                            }
                        />

                    </Link>

                </>

            )}


            {/* ================================= */}
            {/* EMPTY */}
            {/* ================================= */}

            {searchKeyword.length >= 2 &&
                !isLoading &&
                suggestions.length === 0 && (

                <Link
                    to={
                        `/search/filter?keyword=${encodeURIComponent(
                            searchKeyword
                        )}`
                    }
                    className="desktop-search-suggest__empty"
                    onClick={
                        onClose
                    }
                >

                    <div className="desktop-search-suggest__empty-icon">

                        <FontAwesomeIcon
                            icon={
                                faMagnifyingGlass
                            }
                        />

                    </div>


                    <span>

                        Tampilkan hasil untuk{" "}

                        <strong>
                            "{searchKeyword}"
                        </strong>

                    </span>


                    <FontAwesomeIcon
                        icon={
                            faArrowRight
                        }
                        className="desktop-search-suggest__empty-arrow"
                    />

                </Link>

            )}

        </div>

    );
}