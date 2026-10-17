import {
    useNavigate,
    useSearchParams,
    useLocation,
} from "react-router-dom";

import {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    FontAwesomeIcon,
} from "@fortawesome/react-fontawesome";

import {
    faChevronRight,
    faArrowRightArrowLeft,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";

import {
    getTags,
} from "../api/tagApi";


const sortingOptions = [
    {
        id: 1,
        label: "Trip Paling Populer",
        value: "most-popular",
    },
    {
        id: 2,
        label: "Harga Terendah",
        value: "lowest-price",
    },
    {
        id: 3,
        label: "Harga Tertinggi",
        value: "highest-price",
    },
    {
        id: 4,
        label: "Durasi Tersingkat",
        value: "shortest-duration",
    },
    {
        id: 5,
        label: "Durasi Terlama",
        value: "longest-duration",
    },
];


export default function TagsFilter({
    type,
    slug,
    city,
}) {

    const navigate = useNavigate();

    const location = useLocation();

    const [searchParams] = useSearchParams();

    const containerRef = useRef(null);

    const sortingRef = useRef(null);


    /*
    |--------------------------------------------------------------------------
    | STATE
    |--------------------------------------------------------------------------
    */

    const [tags, setTags] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const [showScrollArrow, setShowScrollArrow] = useState(false);

    const [showSorting, setShowSorting] = useState(false);


    /*
    |--------------------------------------------------------------------------
    | ACTIVE FILTER & SORT
    |--------------------------------------------------------------------------
    */

    const activeFilter = searchParams.get("filter");

    const selectedSort = searchParams.get("sort") || "";

    const activeTag = tags.find(
        (tag) => tag.slug === activeFilter
    )?.id;


    /*
    |--------------------------------------------------------------------------
    | GET TAGS
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        let cancelled = false;

        const fetchTags = async () => {

            try {

                setIsLoading(true);

                const data = await getTags();

                if (!cancelled) {
                    setTags(Array.isArray(data) ? data : []);
                }

            } catch (error) {

                console.error(
                    "Gagal mengambil tags:",
                    error
                );

                if (!cancelled) {
                    setTags([]);
                }

            } finally {

                if (!cancelled) {
                    setIsLoading(false);
                }

            }

        };

        fetchTags();

        return () => {
            cancelled = true;
        };

    }, []);


    /*
    |--------------------------------------------------------------------------
    | CHECK HORIZONTAL SCROLL
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        const container = containerRef.current;

        if (!container) return;

        const checkScroll = () => {

            const hasMore =
                container.scrollWidth >
                container.clientWidth +
                container.scrollLeft + 5;

            setShowScrollArrow(hasMore);

        };

        const timeout = setTimeout(checkScroll, 0);

        container.addEventListener(
            "scroll",
            checkScroll
        );

        window.addEventListener(
            "resize",
            checkScroll
        );

        return () => {

            clearTimeout(timeout);

            container.removeEventListener(
                "scroll",
                checkScroll
            );

            window.removeEventListener(
                "resize",
                checkScroll
            );

        };

    }, [tags]);


    /*
    |--------------------------------------------------------------------------
    | CLOSE SORTING WHEN CLICK OUTSIDE
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        const handleClickOutside = (event) => {

            if (
                sortingRef.current &&
                !sortingRef.current.contains(event.target)
            ) {
                setShowSorting(false);
            }

        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

        };

    }, []);


    /*
    |--------------------------------------------------------------------------
    | HANDLE SORT
    |--------------------------------------------------------------------------
    |
    | - Klik sorting baru: aktif
    | - Klik sorting yang sama: nonaktif
    | - Filter tetap dipertahankan
    | - Reset pagination
    |
    */

    const handleSort = (value) => {

        const params = new URLSearchParams(
            searchParams
        );

        if (selectedSort === value) {

            params.delete("sort");

        } else {

            params.set("sort", value);

        }

        params.delete("page");

        const query = params.toString();

        navigate({
            pathname: location.pathname,
            search: query ? `?${query}` : "",
        });

        setShowSorting(false);

    };


    /*
    |--------------------------------------------------------------------------
    | BUILD FILTER URL
    |--------------------------------------------------------------------------
    |
    | Mempertahankan sorting ketika kategori berubah.
    |
    */

    const getFilterPath = (filterValue) => {

        let basePath;

        if (type === "rekomendasi") {

            basePath = "/recommendations";

        } else if (type === "point-of-interest") {

            basePath = `/point-of-interest/${city}/${slug}`;

        } else {

            basePath = `/${type}/${slug}`;

        }

        const params = new URLSearchParams(
            searchParams
        );

        if (filterValue) {

            params.set("filter", filterValue);

        } else {

            params.delete("filter");

        }

        params.delete("page");

        const query = params.toString();

        return query
            ? `${basePath}?${query}`
            : basePath;

    };


    /*
    |--------------------------------------------------------------------------
    | HANDLE TAG CLICK
    |--------------------------------------------------------------------------
    */

    const handleTagClick = (tag) => {

        /*
         * Korporasi memiliki halaman sendiri.
         */

        if (tag.slug === "korporasi") {

            navigate("/korporasi");

            return;

        }

        /*
         * Toggle filter.
         */

        const isSameFilter =
            activeFilter === tag.slug;

        if (isSameFilter) {

            navigate(
                getFilterPath("")
            );

            return;

        }

        navigate(
            getFilterPath(tag.slug)
        );

    };


    /*
    |--------------------------------------------------------------------------
    | LOADING
    |--------------------------------------------------------------------------
    */

    if (isLoading) {

        return (
            <div className="tags-filter">
                <div className="tags-filter__container">
                    <button
                        type="button"
                        className="tags-filter__item"
                        disabled
                    >
                        Memuat...
                    </button>
                </div>
            </div>
        );

    }


    /*
    |--------------------------------------------------------------------------
    | EMPTY
    |--------------------------------------------------------------------------
    */

    if (tags.length === 0) {
        return null;
    }


    /*
    |--------------------------------------------------------------------------
    | RENDER
    |--------------------------------------------------------------------------
    */

    return (

        <div className="tags-filter">

            {/* ================================= */}
            {/* SORTING */}
            {/* ================================= */}

            <div
                className="tags-filter__sorting"
                ref={sortingRef}
            >

                <button
                    type="button"
                    className={`
                        tags-filter__sort-button
                        ${
                            selectedSort
                                ? "tags-filter__sort-button--active"
                                : ""
                        }
                    `}
                    onClick={() =>
                        setShowSorting(
                            (current) => !current
                        )
                    }
                    aria-label="Urutkan"
                    aria-expanded={showSorting}
                >

                    <FontAwesomeIcon
                        icon={faArrowRightArrowLeft}
                    />

                </button>


                {/* ================================= */}
                {/* SORTING POPUP */}
                {/* ================================= */}

                {showSorting && (

                    <div className="tags-filter__sort-popup">

                        <div className="tags-filter__sort-header">

                            <div>
                                <h5>
                                    Urutkan
                                </h5>

                                <p>
                                    Pilih urutan paket wisata
                                </p>
                            </div>

                            <button
                                type="button"
                                className="tags-filter__sort-close"
                                onClick={() =>
                                    setShowSorting(false)
                                }
                                aria-label="Tutup"
                            >

                                <FontAwesomeIcon
                                    icon={faXmark}
                                />

                            </button>

                        </div>


                        {/* ================================= */}
                        {/* SORT OPTIONS */}
                        {/* ================================= */}

                        <div className="tags-filter__sort-options">

                            {sortingOptions.map((option) => {

                                const isSelected =
                                    selectedSort === option.value;

                                return (

                                    <label
                                        key={option.id}
                                        className={`
                                            tags-filter__sort-option
                                            ${
                                                isSelected
                                                    ? "tags-filter__sort-option--active"
                                                    : ""
                                            }
                                        `}
                                    >

                                        <span>
                                            {option.label}
                                        </span>

                                        <input
                                            type="radio"
                                            name="product-sort"
                                            value={option.value}
                                            checked={isSelected}
                                            onClick={() => {

                                                if (isSelected) {
                                                    handleSort(
                                                        option.value
                                                    );
                                                }

                                            }}
                                            onChange={() => {

                                                if (!isSelected) {
                                                    handleSort(
                                                        option.value
                                                    );
                                                }

                                            }}
                                        />

                                        <span className="tags-filter__sort-radio" />

                                    </label>

                                );

                            })}

                        </div>

                    </div>

                )}

            </div>


            {/* ================================= */}
            {/* TAGS */}
            {/* ================================= */}

            <div
                className="tags-filter__container"
                ref={containerRef}
            >

                {tags.map((tag) => (

                    <button
                        key={tag.id}
                        type="button"
                        className={`
                            tags-filter__item
                            ${
                                activeTag === tag.id
                                    ? "tags-filter__item--active"
                                    : ""
                            }
                        `}
                        onClick={() =>
                            handleTagClick(tag)
                        }
                    >
                        {tag.name}
                    </button>

                ))}

            </div>


            {/* ================================= */}
            {/* SCROLL ARROW */}
            {/* ================================= */}

            {showScrollArrow && (

                <button
                    type="button"
                    className="tags-filter__arrow"
                    onClick={() => {

                        containerRef.current?.scrollBy({
                            left: 150,
                            behavior: "smooth",
                        });

                    }}
                    aria-label="Geser kategori"
                >

                    <FontAwesomeIcon
                        icon={faChevronRight}
                    />

                </button>

            )}

        </div>

    );
}