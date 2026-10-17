import {
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
} from "react-router-dom";

import {
    faCar,
    faGroupArrowsRotate,
    faHiking,
    faSuitcase,
    faPlaneDeparture,
    faTags,
    faCalendarDays,
    faHotel,
} from "@fortawesome/free-solid-svg-icons";

import {
    FontAwesomeIcon,
} from "@fortawesome/react-fontawesome";

import {
    getTags,
} from "../api/homeApi";


export default function CategorySection() {

    const navigate =
        useNavigate();


    /*
     * =========================================
     * STATE
     * =========================================
     */

    const [
        tags,
        setTags,
    ] = useState([]);

    const [
        isLoading,
        setIsLoading,
    ] = useState(true);


    /*
     * =========================================
     * ICON MAPPING
     * =========================================
     */

    const iconMap = {
        faPlaneDeparture,
        faTags,
        faHotel,
        faSuitcase,
        faCar,
        faHiking,
        faCalendarDays,
        faGroupArrowsRotate,
    };


    /*
     * =========================================
     * GET CATEGORIES
     * =========================================
     */

    useEffect(() => {

        const fetchCategories =
            async () => {

                try {

                    setIsLoading(
                        true
                    );


                    const data =
                        await getTags();


                    setTags(
                        data
                    );

                } catch (error) {

                    console.error(
                        "Gagal mengambil kategori:",
                        error
                    );


                    setTags([]);

                } finally {

                    setIsLoading(
                        false
                    );

                }

            };


        fetchCategories();

    }, []);


    /*
     * =========================================
     * HANDLE CATEGORY CLICK
     * =========================================
     */

    const handleCategoryClick = (
        item
    ) => {

        /*
         * Korporasi punya halaman sendiri
         */

        if (
            item.slug ===
            "korporasi"
        ) {

            navigate(
                "/korporasi"
            );

            return;

        }


        /*
         * Category lainnya masuk recommendation
         */

        navigate(
            `/recommendations?filter=${encodeURIComponent(
                item.slug
            )}`
        );

    };


    /*
     * =========================================
     * VIEW
     * =========================================
     */

    return (

        <div className="category-section bg-white p-4 rounded mb-5">


            {/* ================================= */}
            {/* HEADER */}
            {/* ================================= */}

            <div className="section-header mb-5">

                <h3 className="section-title">
                    Pilih Kategori
                </h3>

                <div className="section-underline"></div>

            </div>


            {/* ================================= */}
            {/* CONTENT */}
            {/* ================================= */}

            {isLoading ? (

                <div className="text-center py-5 text-muted">

                    Memuat kategori...

                </div>

            ) : tags.length > 0 ? (

                <div className="category-slider">

                    {tags.map(
                        (item) => {

                            const icon =
                                iconMap[
                                    item.icon
                                ] ||
                                faTags;


                            return (

                                <div
                                    className="category-slider__item"
                                    key={
                                        item.id
                                    }
                                >

                                    <button
                                        type="button"
                                        className="category-card category-card--button"
                                        onClick={() =>
                                            handleCategoryClick(
                                                item
                                            )
                                        }
                                    >

                                        <div className="category-icon">

                                            <FontAwesomeIcon
                                                icon={
                                                    icon
                                                }
                                            />

                                        </div>


                                        <div className="category-title">

                                            {item.name}

                                        </div>

                                    </button>

                                </div>

                            );

                        }
                    )}

                </div>

            ) : (

                <div className="text-center py-5 text-muted">

                    Belum ada kategori tersedia.

                </div>

            )}

        </div>

    );

}