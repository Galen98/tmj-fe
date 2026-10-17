import {
    useEffect,
    useState,
} from "react";

import ProductCard
    from "../../../components/ProductCard";

import ProductCardSkeleton
    from "../../../components/ProductCardSkeleton";

import {
    getRecommendationProducts,
} from "../api/recommendationApi";


export default function RecommendationContent({
    filter,
}) {

    const [products, setProducts] =
        useState([]);

    const [page, setPage] =
        useState(1);

    const [hasMore, setHasMore] =
        useState(false);

    const [isLoading, setIsLoading] =
        useState(true);

    const [
        isLoadingMore,
        setIsLoadingMore,
    ] = useState(false);


    /*
     * =========================================
     * INITIAL LOAD
     * =========================================
     */

    useEffect(() => {

        let isActive = true;


        const fetchProducts =
            async () => {

                try {

                    setIsLoading(true);


                    const result =
                        await getRecommendationProducts({
                            page: 1,
                            limit: 12,
                            filter,
                        });


                    if (!isActive) {
                        return;
                    }


                    setProducts(
                        result.data || []
                    );


                    setPage(
                        result.meta
                            ?.current_page ?? 1
                    );


                    setHasMore(
                        (result.meta?.current_page ?? 1) <
                        (result.meta?.last_page ?? 1)
                    );

                } catch (error) {

                    if (!isActive) {
                        return;
                    }


                    console.error(
                        "Gagal mengambil recommendation:",
                        error
                    );


                    setProducts([]);

                    setHasMore(false);

                } finally {

                    if (isActive) {

                        setIsLoading(
                            false
                        );

                    }

                }

            };


        fetchProducts();


        return () => {

            isActive = false;

        };

    }, [filter]);


    /*
     * =========================================
     * LOAD MORE
     * =========================================
     */

    const handleLoadMore =
        async () => {

            if (
                isLoadingMore ||
                !hasMore
            ) {
                return;
            }


            try {

                setIsLoadingMore(
                    true
                );


                const nextPage =
                    page + 1;


                const result =
                    await getRecommendationProducts({
                        page:
                            nextPage,

                        limit:
                            12,

                        filter,
                    });


                setProducts(
                    (currentProducts) => [
                        ...currentProducts,
                        ...(result.data || []),
                    ]
                );


                setPage(
                    result.meta
                        ?.current_page ??
                    nextPage
                );


                setHasMore(
                    (result.meta?.current_page ?? nextPage) <
                    (result.meta?.last_page ?? nextPage)
                );

            } catch (error) {

                console.error(
                    "Gagal load more:",
                    error
                );

            } finally {

                setIsLoadingMore(
                    false
                );

            }

        };


    return (

        <div className="app__container border-top-soft">

            <div className="container product-container mt-5 mb-5">

                <div className="section-header">

                    <h3 className="section-title">
                        Rekomendasi
                    </h3>

                    <div className="section-underline"></div>

                </div>


                <div className="row g-3 mt-2">

                    {isLoading ? (

                        Array.from({
                            length: 10,
                        }).map(
                            (_, index) => (

                                <div
                                    key={index}
                                    className="col-6 col-md-4 col-lg-2-4"
                                >
                                    <ProductCardSkeleton />
                                </div>

                            )
                        )

                    ) : (

                        products.map(
                            (item) => {

                                const product = {
                                    ...item,

                                    name:
                                        item.travel_name,

                                    location:
                                        item.city?.name ?? "",

                                    category:
                                        item.poi?.name ?? "",

                                    duration:
                                        `${item.durasi} ${item.satuan_durasi}`,

                                    image:
                                        item.image1,

                                    price:
                                        item.price_now,

                                    oldPrice:
                                        item.price_discount,

                                    totalRating:
                                        item.total_rating,
                                };


                                return (

                                    <ProductCard
                                        key={item.id}
                                        product={product}
                                    />

                                );

                            }
                        )

                    )}

                </div>


                {!isLoading &&
                    products.length === 0 && (

                        <div className="text-center py-5 text-muted">
                            Belum ada paket wisata
                            yang tersedia.
                        </div>

                    )}


                {!isLoading &&
                    hasMore && (

                        <div className="text-center mt-5 mb-5">

                            <button
                                type="button"
                                className="btn-load-more"
                                onClick={
                                    handleLoadMore
                                }
                                disabled={
                                    isLoadingMore
                                }
                            >

                                {isLoadingMore
                                    ? "Memuat..."
                                    : "Lihat Lainnya"}

                            </button>

                        </div>

                    )}

            </div>

        </div>

    );
}