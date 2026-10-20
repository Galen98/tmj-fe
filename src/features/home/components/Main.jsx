import {
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
} from "react-router-dom";

import PointOfInterest from "./PointInterest";
import DestinationSection from "./DestinationSection";
import StepBooking from "./StepBooking";
import VoucherCardSection from "./VoucherCardSection";

import ProductCard from "../../../components/ProductCard";
import ProductCardSkeleton from "../../../components/ProductCardSkeleton";

import {
    getProducts,
} from "../api/homeApi";
import CategorySection from "./CategorySection";
import SortingSection from "./SortingSection";


const Main = () => {

    /*
     * =========================================
     * STATE
     * =========================================
     */

    const [showToast, setShowToast] =
        useState(false);

    const [products, setProducts] =
        useState([]);

    const [isLoadingProducts, setIsLoadingProducts] =
        useState(true);


    const navigate =
        useNavigate();


    /*
     * =========================================
     * GET PRODUCTS
     * =========================================
     */

    useEffect(() => {

        const fetchProducts =
            async () => {

                try {

                    const data =
                        await getProducts();

                    setProducts(data);

                } catch (error) {

                    console.error(
                        "Gagal mengambil products:",
                        error
                    );

                    setProducts([]);

                } finally {

                    setIsLoadingProducts(false);

                }

            };


        fetchProducts();

    }, []);


    /*
     * =========================================
     * COPY VOUCHER
     * =========================================
     */

    const handleCopySuccess = () => {

        setShowToast(true);

        setTimeout(() => {

            setShowToast(false);

        }, 2000);

    };


    return (
        <>
            <div className="app__container border-top-soft">

                <br />

                <div className="container product-container mt-5 mb-5">
                    
                    <CategorySection/>

                    <SortingSection/>

                    {/* ================================= */}
                    {/* RECOMMENDATION */}
                    {/* ================================= */}

                    <div className="recommendation-section bg-white p-4 rounded mb-5">

                        {/* HEADER */}

                        <div className="section-header mb-5">

                            <h3 className="section-title">
                                Rekomendasi
                            </h3>

                            <div className="section-underline"></div>

                        </div>

                        {/* PRODUCTS */}

                        <div className="row g-3 recommendation-products">

                            {isLoadingProducts ? (

                                Array.from({
                                    length: 10,
                                }).map((_, index) => (

                                    <div
                                        className="col-6 col-md-4 col-lg-2-4"
                                        key={index}
                                    >
                                        <ProductCardSkeleton />
                                    </div>

                                ))

                            ) : (

                                products.map((item) => {

                                    const product = {
                                        ...item,

                                        name: item.travel_name,

                                        location: item.city?.name ?? "",

                                        category: item.poi?.name ?? "",

                                        duration: `${item.durasi} ${item.satuan_durasi}`,

                                        image: item.image1,

                                        price: item.price_now,

                                        oldPrice: item.price_discount,

                                        rating: Number(item.rating ?? 0),

                                        totalRating: Number(item.total_rating ?? 0),
                                    };

                                    return (

                                        <ProductCard
                                            key={item.id}
                                            product={product}
                                        />

                                    );

                                })

                            )}

                        </div>

                        {/* LIHAT LAINNYA */}

                        {!isLoadingProducts && products.length > 0 && (

                            <div className="text-center mt-5">

                                <button
                                    type="button"
                                    className="btn-load-more"
                                    onClick={() =>
                                        navigate("/recommendations")
                                    }
                                >
                                    Lihat Lainnya
                                </button>

                            </div>

                        )}

                    </div>


                    {/* ================================= */}
                    {/* VOUCHER */}
                    {/* ================================= */}

                    <VoucherCardSection
                        onCopySuccess={
                            handleCopySuccess
                        }
                    />


                    {/* ================================= */}
                    {/* POINT OF INTEREST */}
                    {/* ================================= */}

                    <PointOfInterest />


                    {/* ================================= */}
                    {/* DESTINATION */}
                    {/* ================================= */}

                    <DestinationSection />


                    {/* ================================= */}
                    {/* STEP BOOKING */}
                    {/* ================================= */}

                    <StepBooking />

                </div>

            </div>


            {/* ================================= */}
            {/* TOAST */}
            {/* ================================= */}

            <div
                className={`toast position-fixed bottom-0 end-0 m-3 toast-copy ${
                    showToast
                        ? "show"
                        : ""
                }`}
                style={{
                    display:
                        showToast
                            ? "block"
                            : "none",

                    zIndex: 9999,
                }}
            >

                <div className="toast-body">
                    Kupon berhasil disalin!
                </div>

            </div>
        </>
    );
};


export default Main;