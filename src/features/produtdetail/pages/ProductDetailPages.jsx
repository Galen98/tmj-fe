
import {
    useEffect,
    useState,
    useRef,
} from "react";

import {
    useNavigate,
    useParams,
    useLocation,
    Link,
} from "react-router-dom";

import ProductGallery from "../components/ProductGallery";
import ProductInfo from "../components/ProductInfo";
import ReviewSection from "../components/ReviewSection";
import ImageModal from "../components/ImageModal";
import MobileBookingBar from "../components/MobileBookingBar";
import ChatPackageButton from "../components/ChatPackageButton";
import RelatedProducts from "../components/RelatedProducts";
import { trackPageView } from "../../../api/analyticsApi";
import { initializeUserToken } from "../../../services/tokenUserService";

import SEO from "../../../components/SEO";
import FootTags from "../../../components/utils/FootTags";

import {
    getProductDetail,
} from "../api/productDetailApi";

import {
    getFavorites,
    toggleFavorite,
} from "../store/productDetailStorage";

const formatPrice = (value) => {
    return new Intl.NumberFormat("id-ID").format(
        Number(value || 0)
    );
};

export default function ProductDetailPages() {
    const { slug } = useParams();

    const navigate = useNavigate();
    const location = useLocation();

    const optionsSectionRef = useRef(null);

    const [activeTab, setActiveTab] = useState("description");

    /*
    |--------------------------------------------------------------------------
    | STATE
    |--------------------------------------------------------------------------
    */

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isFavorite, setIsFavorite] = useState(false);

    const [modalImages, setModalImages] = useState([]);
    const [modalIndex, setModalIndex] = useState(0);

    const tripVariationsRef = useRef(null);

    const scrollToTripVariations = () => {
        tripVariationsRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };
    /*
    |--------------------------------------------------------------------------
    | LOAD PRODUCT DETAIL
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        let active = true;

        const loadProduct = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await getProductDetail(slug);

                // Mendukung response API:
                // { data: { ... } }
                // maupun object product langsung.

                const detail = response?.data ?? response;

                if (!detail || !detail.id) {
                    throw new Error(
                        "Produk wisata tidak ditemukan."
                    );
                }

                if (!active) return;

                /*
                 * API Laravel menggunakan is_group.
                 * Komponen lama menggunakan tipe.
                 *
                 * Kita normalisasi supaya kompatibel.
                 */

                const normalizedProduct = {
                    ...detail,

                    tipe: detail.is_group
                        ? "group"
                        : "person",

                    city: detail.city ?? null,
                    poi: detail.poi ?? null,

                    options: Array.isArray(detail.options)
                        ? detail.options
                        : [],

                    reviews: Array.isArray(detail.reviews)
                        ? detail.reviews
                        : [],

                    includes: Array.isArray(detail.includes)
                        ? detail.includes
                        : [],

                    rating: Number(detail.rating || 0),

                    total_rating: Number(
                        detail.total_rating || 0
                    ),
                };

                setProduct(normalizedProduct);

                const favorites = getFavorites();

                setIsFavorite(
                    favorites.some(
                        (item) =>
                            String(item.id) ===
                            String(normalizedProduct.id)
                    )
                );

            } catch (err) {
                console.error(
                    "Gagal mengambil detail wisata:",
                    err
                );

                if (active) {
                    setError(
                        err.message ||
                        "Gagal memuat detail wisata."
                    );
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        loadProduct();

        return () => {
            active = false;
        };
    }, [slug]);

     /*
    |--------------------------------------------------------------------------
    | TRACK ANALYTICS - TRAVEL DETAIL
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (
            !product?.id ||
            product.slug !== slug
        ) {
            return;
        }

        let cancelled = false;

        const trackTravelDetail = async () => {
            try {
                const userToken = await initializeUserToken();

                if (cancelled) return;

                await trackPageView({
                    path: location.pathname + location.search,
                    userToken,
                    travelId: product.id,
                });

            } catch (error) {
                if (!cancelled) {
                    console.error(
                        "Gagal tracking travel detail:",
                        error
                    );
                }
            }
        };

        trackTravelDetail();

        return () => {
            cancelled = true;
        };
    }, [
        product?.id,
        product?.slug,
        slug,
        location.pathname,
        location.search,
    ]);


    /*
    |--------------------------------------------------------------------------
    | FAVORITE
    |--------------------------------------------------------------------------
    */

    const handleFavorite = () => {
        if (!product) return;

        const active = toggleFavorite(product);

        setIsFavorite(active);
    };

    /*
    |--------------------------------------------------------------------------
    | IMAGE MODAL
    |--------------------------------------------------------------------------
    */

    const openImages = (images, index = 0) => {
        setModalImages(images);
        setModalIndex(index);
    };

    /*
    |--------------------------------------------------------------------------
    | NAVIGATE TO OPTION DETAIL
    |--------------------------------------------------------------------------
    */

    const handleSelectOption = (option) => {
        if (!product || !option) return;

        const editCartId =
            location.state?.editCartId ?? null;

        navigate(
            `/travels/${product.slug}/option/${option.id}`,
            {
                state: editCartId
                    ? { editCartId }
                    : undefined,
            }
        );
    };

    /*
    |--------------------------------------------------------------------------
    | SCROLL TO OPTIONS
    |--------------------------------------------------------------------------
    */

    // const scrollToOptions = () => {
    //     optionsSectionRef.current?.scrollIntoView({
    //         behavior: "smooth",
    //         block: "start",
    //     });
    // };

    /*
    |--------------------------------------------------------------------------
    | OPTION PRICE
    |--------------------------------------------------------------------------
    |
    | Menampilkan harga awal/termurah dari tier
    | yang diberikan backend.
    |
    */

    const getOptionPrice = (option) => {
        const prices = option.prices || [];

        if (!prices.length) {
            return null;
        }

        const validPrices = prices
            .filter((price) => price.status !== false)
            .map((price) => Number(price.price))
            .filter(
                (price) =>
                    Number.isFinite(price) &&
                    price >= 0
            );

        if (!validPrices.length) {
            return null;
        }

        return Math.min(...validPrices);
    };

    /*
    |--------------------------------------------------------------------------
    | TRIP VARIATIONS
    |--------------------------------------------------------------------------
    */

    const renderTripVariations = () => {
        const options = product?.options || [];

        return (
            <section
                ref={optionsSectionRef}
                className="trip-variations"
                id="trip-variations"
            >
                <h2>
                    Pilihan Variasi Trip
                </h2>

                {options.length === 0 ? (
                    <p className="mb-0">
                        Belum ada variasi trip yang tersedia.
                    </p>
                ) : (
                    <div className="trip-variations__list">
                        {options.map((option) => {
                            const price = getOptionPrice(option);

                            return (
                                <div
                                    key={option.id}
                                    className="trip-variation-card"
                                >
                                    <div className="trip-variation-card__body">
                                        <h3>
                                            {option.option_name}
                                        </h3>

                                        {option.description && (
                                            <p>
                                                {option.description}
                                            </p>
                                        )}

                                        <div className="trip-variation-card__bottom">
                                            <div>
                                                <small>
                                                    {price !== null
                                                        ? "Mulai dari"
                                                        : "Harga"}
                                                </small>

                                                <strong>
                                                    {price !== null
                                                        ? `Rp ${formatPrice(price)}`
                                                        : "Hubungi admin"}
                                                </strong>
                                            </div>

                                            <button
                                                type="button"
                                                className="trip-variation-card__select"
                                                onClick={() =>
                                                    handleSelectOption(option)
                                                }
                                            >
                                                Pilih
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>
        );
    };

    /*
    |--------------------------------------------------------------------------
    | LOADING
    |--------------------------------------------------------------------------
    */

    if (loading) {
        return (
            <div
                className="container d-flex flex-column align-items-center justify-content-center py-5"
                style={{ minHeight: "65vh" }}
            >
                <div
                    className="spinner-border text-primary mb-3"
                    role="status"
                    style={{ width: "2.5rem", height: "2.5rem" }}
                >
                    <span className="visually-hidden">Loading...</span>
                </div>

                <h6 className="fw-semibold text-dark mb-1">
                    Memuat Detail Wisata
                </h6>

                <p className="text-muted small text-center mb-0">
                    Tunggu sebentar, kami sedang menyiapkan informasi wisata...
                </p>
            </div>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | ERROR
    |--------------------------------------------------------------------------
    */

    if (error || !product) {
        return (
            <div className="container py-5 text-center mt-5 mb-5">
                <h3>
                    Data wisata tidak tersedia
                </h3>

                <p>
                    {error || "Produk tidak ditemukan."}
                </p>

                <Link
                    to="/recommendations"
                    className="btn btn-primary rounded-5 mt-3"
                >
                    Lihat Wisata Lainnya
                </Link>
            </div>
        );
    }

    const isCorporate =
        product.is_corporate === true ||
        product.is_corporate === 1 ||
        product.is_corporate === "1";

    /*
    |--------------------------------------------------------------------------
    | RENDER
    |--------------------------------------------------------------------------
    */

    return (
        <>
            <SEO
                title={`${product.travel_name} | Travel Murah Jogja`}
                description={product.short_description}
                path={`/travels/${product.slug}`}
            />

             {isCorporate && (
                <div className="corporate-mobile-detail-cta d-lg-none">

                    <Link
                        to="/korporasi/pengajuan"
                        className="corporate-mobile-detail-cta__button btn-primary"
                    >
                        KLIK DISINI UNTUK MINTA PENAWARAN
                    </Link>

                </div>
            )}

            <div className="product-detail-page">
                <div className="container py-4">

                    {/* BREADCRUMB */}

                    <div className="product-breadcrumb">
                        {product.city?.slug && (
                            <>
                                <Link
                                    to={`/city/${product.city.slug}`}
                                    className="product-breadcrumb__link"
                                >
                                    {product.city.name}
                                </Link>

                                <span className="product-breadcrumb__separator">
                                    /
                                </span>
                            </>
                        )}

                        {product.poi?.slug && product.city?.slug && (
                            <>
                                <Link
                                    to={`/point-of-interest/${product.city.slug}/${product.poi.slug}`}
                                    className="product-breadcrumb__link"
                                >
                                    {product.poi.name}
                                </Link>

                                <span className="product-breadcrumb__separator">
                                    /
                                </span>
                            </>
                        )}

                        <strong className="product-breadcrumb__current">
                            {product.travel_name}
                        </strong>
                    </div>

                    {/* GALLERY */}

                    <ProductGallery
                        product={product}
                        onOpen={openImages}
                    />

                    {/* MAIN LAYOUT */}

                    <div className="product-detail-layout">

                        <main className="product-detail-main">

                            {/* PRODUCT INFORMATION */}

                            <ProductInfo
                                product={product}
                                isFavorite={isFavorite}
                                onFavorite={handleFavorite}
                            />

                            {/*
                                MOBILE:
                                Pilihan variasi langsung
                                setelah ProductInfo,
                                yaitu setelah lokasi
                                penjemputan.
                            */}

                            <div
                                ref={tripVariationsRef}
                                className="d-block d-lg-none trip-variations-section"
                            >
                                {renderTripVariations()}
                            </div>

                            {/* MOBILE: DESCRIPTION & FACILITIES TABS */}

<div className="d-block d-lg-none product-mobile-tabs">

    <div
        className="nav nav-tabs product-mobile-tabs__nav"
        role="tablist"
        aria-label="Informasi wisata"
    >
        <button
            type="button"
            role="tab"
            aria-selected={activeTab === "description"}
            className={`nav-link ${
                activeTab === "description" ? "active" : ""
            }`}
            onClick={() => setActiveTab("description")}
        >
            Deskripsi
        </button>

        <button
            type="button"
            role="tab"
            aria-selected={activeTab === "facilities"}
            className={`nav-link ${
                activeTab === "facilities" ? "active" : ""
            }`}
            onClick={() => setActiveTab("facilities")}
        >
            Fasilitas
        </button>

    </div>

    <div className="product-mobile-tabs__content">

        {activeTab === "description" && (
            <section className="product-description">
                <div
                    dangerouslySetInnerHTML={{
                        __html: product.full_description || "",
                    }}
                />
            </section>
        )}

        {activeTab === "facilities" && (
            <section className="product-includes">
                {product.includes.length > 0 ? (
                    <ul>
                        {product.includes.map((item) => (
                            <li key={item.id}>
                                {item.include_desc}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="mb-0">
                        Belum ada informasi fasilitas.
                    </p>
                )}
            </section>
        )}

    </div>

        </div>


        {/* DESKTOP: DESCRIPTION */}

        <section className="product-description d-none d-lg-block">
            <h2>Deskripsi</h2>

            <div
                dangerouslySetInnerHTML={{
                    __html: product.full_description || "",
                }}
            />
        </section>


        {/* DESKTOP: FACILITIES */}

        {product.includes.length > 0 && (
            <section className="product-includes d-none d-lg-block">
                <h2>Fasilitas</h2>

                <ul>
                    {product.includes.map((item) => (
                        <li key={item.id}>
                            {item.include_desc}
                        </li>
                    ))}
                </ul>
            </section>
        )}
                            {/*
                                DESKTOP:
                                Pilihan variasi setelah
                                fasilitas.
                            */}

                            <div className="d-none d-lg-block">
                                {renderTripVariations()}

                                {isCorporate && (
                                    <div className="corporate-detail-cta">

                                        <h3>
                                            Butuh paket wisata untuk perusahaan?
                                        </h3>

                                        <p>
                                            Sesuaikan perjalanan dengan kebutuhan perusahaan Anda.
                                            Ajukan penawaran paket wisata, gathering, outing,
                                            atau kegiatan perusahaan lainnya bersama tim kami.
                                        </p>

                                        <Link
                                            to="/korporasi/pengajuan"
                                            className="btn btn-primary"
                                        >
                                            KLIK DISINI UNTUK MINTA PENAWARAN
                                        </Link>

                                    </div>
                                )}
                            </div>

                            {/* REVIEWS */}
                            <section id="product-reviews">
                                <ReviewSection
                                    reviews={product.reviews}
                                    onOpenImages={openImages}
                                />
                            </section>

                        </main>

                    </div>

                    {/* RELATED PRODUCTS */}

                    <RelatedProducts
                        currentProductId={product.id}
                    />

                    <FootTags />

                </div>

                {/* FLOATING CHAT DESKTOP */}

                <ChatPackageButton
                    onClick={() =>
                        console.log("Chat package")
                    }
                />

                {/* MOBILE BOTTOM BAR */}

                <MobileBookingBar
                    onChat={() =>
                        console.log("Chat package")
                    }
                    onCart={scrollToTripVariations}
                    onBuy={scrollToTripVariations}
                />

                {/* IMAGE MODAL */}

                {modalImages.length > 0 && (
                    <ImageModal
                        images={modalImages}
                        index={modalIndex}
                        onChange={setModalIndex}
                        onClose={() =>
                            setModalImages([])
                        }
                    />
                )}

            </div>
        </>
    );
}
