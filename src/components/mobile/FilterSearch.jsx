import {
    useEffect,
    useState,
} from "react";

import {
    Link,
    useNavigate,
} from "react-router-dom";

import {
    FontAwesomeIcon,
} from "@fortawesome/react-fontawesome";

import {
    faMagnifyingGlass,
    faXmark,
    faLocationDot,
    faSuitcaseRolling,
    faLandmark,
    faArrowRight,
    faSpinner,
} from "@fortawesome/free-solid-svg-icons";

import {
    getSearchSuggestions,
} from "../../services/searchService";


export default function FilterSearch() {

    /*
     * =========================================
     * STATE
     * =========================================
     */

    const [isOpen, setIsOpen] =
        useState(false);

    const [keyword, setKeyword] =
        useState("");

    const [suggestions, setSuggestions] =
        useState([]);

    const [isLoading, setIsLoading] =
        useState(false);


    /*
     * =========================================
     * NAVIGATE
     * =========================================
     */

    const navigate =
        useNavigate();


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
         * Tidak perlu request jika:
         *
         * - popup tidak terbuka
         * - keyword kurang dari 2 karakter
         */

        if (
            !isOpen ||
            searchKeyword.length < 2
        ) {
            return;
        }


        /*
         * Abort request lama jika user
         * mengetik keyword baru.
         */

        const controller =
            new AbortController();


        /*
         * =========================================
         * DEBOUNCE
         * =========================================
         *
         * Tunggu 400ms setelah user
         * berhenti mengetik.
         */

        const timer =
            setTimeout(
                async () => {

                    try {

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


                        setSuggestions(
                            data
                        );

                    } catch (error) {

                        /*
                         * Abort bukan error sebenarnya.
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
         */

        return () => {

            clearTimeout(
                timer
            );

            controller.abort();

        };

    }, [
        searchKeyword,
        isOpen,
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
     * HANDLE SEARCH
     * =========================================
     */

    const handleSearch = (
        e
    ) => {

        e.preventDefault();


        if (
            searchKeyword.length < 2
        ) {
            return;
        }


        /*
         * Tutup popup.
         */

        setIsOpen(false);


        /*
         * Ke halaman semua hasil.
         */

        navigate(
            `/search/filter?keyword=${encodeURIComponent(
                searchKeyword
            )}`
        );

    };


    /*
     * =========================================
     * CLOSE SEARCH
     * =========================================
     */

    const closeSearch = () => {

        setIsOpen(false);

        setKeyword("");

    };


    /*
     * =========================================
     * CLEAR SEARCH
     * =========================================
     */

    const clearSearch = () => {

        setKeyword("");

    };


    /*
     * =========================================
     * VIEW
     * =========================================
     */

    return (

        <>


            {/* ================================= */}
            {/* SEARCH BUTTON */}
            {/* ================================= */}

            <button
                type="button"
                className="filter-search__trigger"
                onClick={() =>
                    setIsOpen(true)
                }
                aria-label="Cari"
            >

                <FontAwesomeIcon
                    icon={
                        faMagnifyingGlass
                    }
                />

            </button>


            {/* ================================= */}
            {/* SEARCH POPUP */}
            {/* ================================= */}

            {isOpen && (

                <div className="filter-search">


                    {/* OVERLAY */}

                    <div
                        className="filter-search__overlay"
                        onClick={
                            closeSearch
                        }
                    />


                    {/* POPUP */}

                    <div className="filter-search__popup">


                        {/* ============================= */}
                        {/* HEADER */}
                        {/* ============================= */}

                        <div className="filter-search__header">


                            {/* SEARCH FORM */}

                            <form
                                className="filter-search__form"
                                onSubmit={
                                    handleSearch
                                }
                            >

                                <FontAwesomeIcon
                                    icon={
                                        faMagnifyingGlass
                                    }
                                    className="filter-search__icon"
                                />


                                <input
                                    type="text"
                                    value={
                                        keyword
                                    }
                                    onChange={(
                                        e
                                    ) =>
                                        setKeyword(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Cari destinasi dan paket wisata..."
                                    autoFocus
                                />


                                {/* CLEAR */}

                                {keyword && (

                                    <button
                                        type="button"
                                        className="filter-search__clear"
                                        onClick={
                                            clearSearch
                                        }
                                        aria-label="Hapus pencarian"
                                    >

                                        <FontAwesomeIcon
                                            icon={
                                                faXmark
                                            }
                                        />

                                    </button>

                                )}

                            </form>


                            {/* CLOSE */}

                            <button
                                type="button"
                                className="filter-search__close"
                                onClick={
                                    closeSearch
                                }
                            >
                                Batal
                            </button>

                        </div>


                        {/* ============================= */}
                        {/* MINIMUM KEYWORD */}
                        {/* ============================= */}

                        {searchKeyword.length === 1 && (

                            <div className="filter-search__results">

                                <div className="filter-search__loading">

                                    <FontAwesomeIcon
                                        icon={
                                            faMagnifyingGlass
                                        }
                                    />

                                    <span>
                                        Ketik minimal 2 karakter
                                    </span>

                                </div>

                            </div>

                        )}


                        {/* ============================= */}
                        {/* SEARCH RESULTS */}
                        {/* ============================= */}

                        {searchKeyword.length >= 2 && (

                            <div className="filter-search__results">


                                {/* ========================= */}
                                {/* LOADING */}
                                {/* ========================= */}

                                {isLoading && (

                                    <div className="filter-search__loading">

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


                                {/* ========================= */}
                                {/* RESULTS */}
                                {/* ========================= */}

                                {!isLoading &&
                                    suggestions.length > 0 && (

                                    <>

                                        {suggestions.map(
                                            (
                                                item,
                                                index
                                            ) => (

                                                <Link
                                                    key={
                                                        `${item.type}-${item.id}`
                                                    }
                                                    to={
                                                        item.to
                                                    }
                                                    className={
                                                        `filter-search__result ${
                                                            index === 0
                                                                ? "filter-search__result--first"
                                                                : ""
                                                        }`
                                                    }
                                                    onClick={
                                                        closeSearch
                                                    }
                                                >


                                                    {/* IMAGE */}

                                                    {item.image ? (

                                                        <img
                                                            src={
                                                                item.image
                                                            }
                                                            alt={
                                                                item.name
                                                            }
                                                            className="filter-search__result-image"
                                                            loading="lazy"
                                                        />

                                                    ) : (

                                                        <div className="filter-search__result-icon">

                                                            <FontAwesomeIcon
                                                                icon={
                                                                    getTypeIcon(
                                                                        item.type
                                                                    )
                                                                }
                                                            />

                                                        </div>

                                                    )}


                                                    {/* CONTENT */}

                                                    <div className="filter-search__result-content">

                                                        <div className="filter-search__result-name">

                                                            {
                                                                item.name
                                                            }

                                                        </div>


                                                        {item.description && (

                                                            <div className="filter-search__result-description">

                                                                {
                                                                    item.description
                                                                }

                                                            </div>

                                                        )}

                                                    </div>

                                                </Link>

                                            )
                                        )}


                                        {/* ================= */}
                                        {/* SHOW ALL */}
                                        {/* ================= */}

                                        <Link
                                            to={
                                                `/search/filter?keyword=${encodeURIComponent(
                                                    searchKeyword
                                                )}`
                                            }
                                            className="filter-search__all"
                                            onClick={
                                                closeSearch
                                            }
                                        >

                                            <span>

                                                Lihat semua hasil untuk{" "}

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


                                {/* ========================= */}
                                {/* EMPTY */}
                                {/* ========================= */}

                                {!isLoading &&
                                    suggestions.length === 0 && (

                                    <div className="filter-search__empty">

                                        <div className="filter-search__empty-icon">

                                            <FontAwesomeIcon
                                                icon={
                                                    faMagnifyingGlass
                                                }
                                            />

                                        </div>


                                        <Link
                                            to={
                                                `/search/filter?keyword=${encodeURIComponent(
                                                    searchKeyword
                                                )}`
                                            }
                                            className="filter-search__empty-link"
                                            onClick={
                                                closeSearch
                                            }
                                        >

                                            Tampilkan hasil untuk{" "}

                                            <strong>
                                                "{searchKeyword}"
                                            </strong>

                                        </Link>


                                        <FontAwesomeIcon
                                            icon={
                                                faArrowRight
                                            }
                                            className="filter-search__empty-arrow"
                                        />

                                    </div>

                                )}

                            </div>

                        )}

                    </div>

                </div>

            )}

        </>

    );
}