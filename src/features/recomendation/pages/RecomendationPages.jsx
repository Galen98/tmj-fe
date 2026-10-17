import {
    useEffect,
    useState,
    useRef,
} from "react";

import {
    useSearchParams,
} from "react-router-dom";

import ListingPages
    from "../../../components/ListingPages";

import {
    getRecommendationProducts,
} from "../api/recommendationApi";


const LIMIT = 12;


/*
|--------------------------------------------------------------------------
| MAPPING PRODUCT
|--------------------------------------------------------------------------
*/

const mapProducts = (items = []) => {
    return items.map((item) => ({
        ...item,

        name: item.travel_name,

        location: item.city?.name ?? "",

        category: item.poi?.name ?? "",

        duration: `${item.durasi} ${item.satuan_durasi}`,

        price: item.price_now,

        oldPrice: item.price_discount,

        rating: Number(item.rating ?? 0),

        totalRating: Number(item.total_rating ?? 0),

        is_group: Boolean(item.is_group),

        jumlahPeserta: item.jumlahPeserta,
    }));
};


export default function RecommendationPages() {

    /*
    |--------------------------------------------------------------------------
    | QUERY PARAMETER
    |--------------------------------------------------------------------------
    */

    const [searchParams] = useSearchParams();

    const filter = searchParams.get("filter") || "";

    const sort = searchParams.get("sort") || "";


    /*
    |--------------------------------------------------------------------------
    | STATE
    |--------------------------------------------------------------------------
    */

    const [products, setProducts] = useState([]);

    const [page, setPage] = useState(1);

    const [hasMore, setHasMore] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const requestIdRef = useRef(0);


    /*
    |--------------------------------------------------------------------------
    | INITIAL LOAD / FILTER / SORT
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        let isActive = true;

        const requestId = ++requestIdRef.current;

        const fetchProducts = async () => {

            setIsLoading(true);

            setProducts([]);

            setPage(1);

            setHasMore(false);

            try {

                const response = await getRecommendationProducts({
                    page: 1,
                    limit: LIMIT,
                    filter,
                    sort,
                });

                if (
                    !isActive ||
                    requestId !== requestIdRef.current
                ) {
                    return;
                }

                const currentPage =
                    response.meta?.current_page ?? 1;

                const lastPage =
                    response.meta?.last_page ?? 1;

                setProducts(
                    mapProducts(response.data || [])
                );

                setPage(currentPage);

                setHasMore(currentPage < lastPage);

            } catch (error) {

                if (
                    !isActive ||
                    requestId !== requestIdRef.current
                ) {
                    return;
                }

                console.error(
                    "Gagal mengambil recommendation:",
                    error
                );

                setProducts([]);

                setPage(1);

                setHasMore(false);

            } finally {

                if (
                    isActive &&
                    requestId === requestIdRef.current
                ) {
                    setIsLoading(false);
                }

            }

        };

        fetchProducts();

        return () => {
            isActive = false;
        };

    }, [filter, sort]);


    /*
    |--------------------------------------------------------------------------
    | LOAD MORE
    |--------------------------------------------------------------------------
    */

    const handleLoadMore = async () => {

        if (
            isLoading ||
            isLoadingMore ||
            !hasMore
        ) {
            return;
        }

        const requestId = requestIdRef.current;

        const nextPage = page + 1;

        setIsLoadingMore(true);

        try {

            const response = await getRecommendationProducts({
                page: nextPage,
                limit: LIMIT,
                filter,
                sort,
            });

            if (requestId !== requestIdRef.current) {
                return;
            }

            const newProducts = mapProducts(
                response.data || []
            );

            setProducts((previous) => {

                const existingIds = new Set(
                    previous.map((item) => item.id)
                );

                const uniqueProducts = newProducts.filter(
                    (item) => !existingIds.has(item.id)
                );

                return [
                    ...previous,
                    ...uniqueProducts,
                ];

            });

            const currentPage =
                response.meta?.current_page ?? nextPage;

            const lastPage =
                response.meta?.last_page ?? currentPage;

            setPage(currentPage);

            setHasMore(currentPage < lastPage);

        } catch (error) {

            if (requestId === requestIdRef.current) {
                console.error(
                    "Gagal load more recommendation:",
                    error
                );
            }

        } finally {

            if (requestId === requestIdRef.current) {
                setIsLoadingMore(false);
            }

        }

    };


    /*
    |--------------------------------------------------------------------------
    | VIEW
    |--------------------------------------------------------------------------
    */

    return (

        <ListingPages
            title="Rekomendasi Paket Wisata"
            description="Temukan berbagai pilihan paket wisata dan aktivitas menarik untuk perjalananmu."
            products={products}
            type="rekomendasi"
            hasMore={
                hasMore &&
                !isLoadingMore &&
                !isLoading
            }
            onLoadMore={handleLoadMore}
            serverSideFilter={true}
            isLoading={isLoading}
            breadcrumbItems={[
                {
                    label: "Beranda",
                    href: "/",
                },
                {
                    label: "Rekomendasi",
                },
            ]}
        />

    );
}