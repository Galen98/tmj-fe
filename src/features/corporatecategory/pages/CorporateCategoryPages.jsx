import {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    useSearchParams,
} from "react-router-dom";

import ListingPages
    from "../../../components/ListingPages";

import SEO
    from "../../../components/SEO";

import {
    getCorporateProducts,
} from "../api/corporateApi";


const LIMIT = 12;


/*
 * =========================================
 * MAPPING PRODUCT
 * =========================================
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

        is_group: item.is_group,

        jumlahPeserta: item.jumlahPeserta,

        is_corporate: item.is_corporate,

    }));
};


export default function CorporateCategoryPages() {

    /*
     * =========================================
     * QUERY PARAMETERS
     * =========================================
     */

    const [searchParams] = useSearchParams();

    const sort = searchParams.get("sort") || "";


    /*
     * =========================================
     * STATE
     * =========================================
     */

    const [products, setProducts] = useState([]);

    const [page, setPage] = useState(1);

    const [hasMore, setHasMore] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const requestIdRef = useRef(0);

    const loadingMoreRef = useRef(false);


    /*
     * =========================================
     * INITIAL LOAD / SORT
     * =========================================
     */

    useEffect(() => {

        let isActive = true;

        const requestId = ++requestIdRef.current;

        loadingMoreRef.current = false;

        const fetchProducts = async () => {

            setIsLoading(true);

            setIsLoadingMore(false);

            setProducts([]);

            setPage(1);

            setHasMore(false);

            try {

                const response = await getCorporateProducts({
                    page: 1,
                    limit: LIMIT,
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
                    "Gagal mengambil corporate products:",
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
            requestIdRef.current++;
        };

    }, [sort]);


    /*
     * =========================================
     * LOAD MORE
     * =========================================
     */

    const handleLoadMore = async () => {

        if (
            isLoading ||
            loadingMoreRef.current ||
            !hasMore
        ) {
            return;
        }

        loadingMoreRef.current = true;

        setIsLoadingMore(true);

        const requestId = requestIdRef.current;

        const nextPage = page + 1;

        try {

            const response = await getCorporateProducts({
                page: nextPage,
                limit: LIMIT,
                sort,
            });

            if (requestId !== requestIdRef.current) {
                return;
            }

            const newProducts = mapProducts(
                response.data || []
            );

            setProducts((currentProducts) => {

                const existingIds = new Set(
                    currentProducts.map((item) => item.id)
                );

                const uniqueProducts = newProducts.filter(
                    (item) => !existingIds.has(item.id)
                );

                return [
                    ...currentProducts,
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
                    "Gagal load more corporate products:",
                    error
                );

            }

        } finally {

            if (requestId === requestIdRef.current) {

                loadingMoreRef.current = false;

                setIsLoadingMore(false);

            }

        }

    };


    /*
     * =========================================
     * VIEW
     * =========================================
     */

    return (

        <div>

            <SEO
                title="Korporasi | Travel Murah Jogja"
                description="Temukan berbagai paket wisata, gathering, outbound, dan perjalanan untuk kebutuhan perusahaan di Yogyakarta."
                path="/korporasi"
            />

            <ListingPages
                title="Korporasi"
                description="Temukan berbagai paket wisata dan aktivitas untuk kebutuhan perusahaan."
                type="korporasi"
                products={products}
                hasMore={
                    hasMore &&
                    !isLoadingMore &&
                    !isLoading
                }
                onLoadMore={handleLoadMore}
                isLoading={isLoading}
                serverSideFilter={true}
                breadcrumbItems={[
                    {
                        label: "Beranda",
                        to: "/",
                    },
                    {
                        label: "Korporasi",
                    },
                ]}
            />

        </div>

    );
}