import {
    useSearchParams,
} from "react-router-dom";

import TagsFilter
    from "../components/TagsFilter";

import ProductCard
    from "../components/ProductCard";

import LoadMore
    from "../components/LoadMore";

import EmailSubscribe
    from "../components/EmailSubscribe";

import GlobalBreadscrumb
    from "../components/utils/GlobalBreadscrumb";

import CityRating
    from "../components/utils/CityRating";

import FootTags
    from "./utils/FootTags";

import LoadingContent
    from "./LoadingContent";


export default function ListingPages({
    title,
    description,
    products = [],
    type,
    hasMore = false,
    onLoadMore,
    slug,
    city,
    breadcrumbItems = [],
    rating,
    totalReviews,
    serverSideFilter = false,
    isLoading = false,
}) {

    /*
    |--------------------------------------------------------------------------
    | QUERY PARAMETER
    |--------------------------------------------------------------------------
    */

    const [searchParams] = useSearchParams();

    const filter = searchParams.get("filter");

    const sort = searchParams.get("sort");


    /*
    |--------------------------------------------------------------------------
    | FILTER PRODUCTS
    |--------------------------------------------------------------------------
    |
    | Jika serverSideFilter = true:
    | - Filter dilakukan oleh Laravel.
    | - Sorting dilakukan oleh Laravel.
    |
    | Jika false:
    | - Filter kategori dilakukan di frontend.
    | - Sorting tetap perlu ditangani parent/API.
    |
    */

    const filteredProducts =
        !serverSideFilter && filter
            ? products.filter((product) =>
                product.tags?.some((tag) =>
                    typeof tag === "string"
                        ? tag === filter
                        : tag.slug === filter
                )
            )
            : products;


    /*
    |--------------------------------------------------------------------------
    | ACTIVE SORT LABEL
    |--------------------------------------------------------------------------
    */

    const sortingLabels = {
        "most-popular": "Trip Paling Populer",
        "lowest-price": "Harga Terendah",
        "highest-price": "Harga Tertinggi",
        "shortest-duration": "Durasi Tersingkat",
        "longest-duration": "Durasi Terlama",
    };

    const activeSortLabel =
        sortingLabels[sort] || null;


    /*
    |--------------------------------------------------------------------------
    | VIEW
    |--------------------------------------------------------------------------
    */

    return (

        <div className="app__container border-top-soft mt-mobile">

            <div className="listing-pages">

                <div className="container">


                    {/* ================================= */}
                    {/* TAG FILTER */}
                    {/* ================================= */}

                    {type !== "korporasi" && (

                        <TagsFilter
                            type={type}
                            slug={slug}
                            city={city}
                        />

                    )}


                    {/* ================================= */}
                    {/* HEADER */}
                    {/* ================================= */}

                    <div className="listing-pages__header mt-4 mb-4">

                        <h1>
                            {title}
                        </h1>

                        {description && (

                            <p
                                className={
                                    type === "korporasi"
                                        ? "d-none d-md-block"
                                        : ""
                                }
                            >
                                {description}
                            </p>

                        )}

                        {activeSortLabel && (

                            <div className="mt-2 text-muted small">

                                Diurutkan berdasarkan:{" "}
                                <strong>
                                    {activeSortLabel}
                                </strong>

                            </div>

                        )}

                    </div>


                    {/* ================================= */}
                    {/* CORPORATE MOBILE OFFER */}
                    {/* ================================= */}

                    {type === "korporasi" && (

                        <div className="corporate-mobile-offer d-md-none">

                            <a
                                href="/korporasi/pengajuan"
                                className="corporate-mobile-offer__button btn-primary"
                            >
                                KLIK DISINI UNTUK MINTA PENAWARAN
                            </a>

                        </div>

                    )}


                    {/* ================================= */}
                    {/* LOADING / PRODUCTS */}
                    {/* ================================= */}

                    {isLoading ? (

                        <LoadingContent
                            type="product"
                            count={10}
                        />

                    ) : filteredProducts.length > 0 ? (

                        <>

                            <div className="row listing-pages__products">

                                {filteredProducts.map((product) => (

                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                    />

                                ))}

                            </div>


                            {/* ================================= */}
                            {/* LOAD MORE */}
                            {/* ================================= */}

                            <LoadMore
                                hasMore={hasMore}
                                onLoadMore={onLoadMore}
                            />

                        </>

                    ) : (

                        <div className="listing-pages__empty">

                            <h3>

                                {filter
                                    ? "Belum ada kegiatan untuk kategori ini"
                                    : "Belum ada kegiatan"}

                            </h3>

                            <p>

                                {filter
                                    ? "Belum ada kegiatan yang sesuai dengan kategori yang dipilih."
                                    : "Belum ada kegiatan yang tersedia untuk kategori ini."}

                            </p>

                        </div>

                    )}


                    {/* ================================= */}
                    {/* EMAIL / CORPORATE */}
                    {/* ================================= */}

                    <div className="mt-5 mb-5">

                        {type !== "korporasi" ? (

                            <EmailSubscribe
                                image="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/05/ef/93/sewa-mobil-jogja-paket.jpg?w=1200&h=-1&s=1"
                            />

                        ) : (

                            <div className="corporate-cta">

                                <div className="corporate-cta__content">

                                    <h3>
                                        Butuh paket wisata untuk perusahaan?
                                    </h3>

                                    <p>
                                        Sesuaikan perjalanan dengan kebutuhan
                                        perusahaan Anda. Ajukan paket wisata,
                                        gathering, outing, atau kegiatan
                                        perusahaan lainnya bersama tim kami.
                                    </p>

                                    <a
                                        href="/korporasi/pengajuan"
                                        className="btn btn-primary"
                                    >
                                        KLIK DISINI UNTUK MINTA PENAWARAN
                                    </a>

                                </div>

                            </div>

                        )}

                    </div>


                    {/* ================================= */}
                    {/* CITY RATING */}
                    {/* ================================= */}

                    {type === "city" && (

                        <CityRating
                            rating={rating}
                            totalReviews={totalReviews}
                        />

                    )}


                    {/* ================================= */}
                    {/* BREADCRUMB */}
                    {/* ================================= */}

                    <GlobalBreadscrumb
                        items={breadcrumbItems}
                    />


                    {/* ================================= */}
                    {/* FOOT TAGS */}
                    {/* ================================= */}

                    <FootTags />

                </div>

            </div>

        </div>

    );
}