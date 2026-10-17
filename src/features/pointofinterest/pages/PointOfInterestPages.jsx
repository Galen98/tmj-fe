import {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    useParams,
    useSearchParams,
} from "react-router-dom";

import ListingPages
    from "../../../components/ListingPages";

import SEO
    from "../../../components/SEO";

import {
    getPointOfInterestProducts,
} from "../api/pointOfInterestApi";


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

    }));
};


export default function PointOfInterestPages() {

    /*
     * =========================================
     * QUERY PARAMETERS
     * =========================================
     */

    const { city, poi } = useParams();

    const [searchParams] = useSearchParams();

    const filter = searchParams.get("filter") || "";

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
     * DISPLAY NAME
     * =========================================
     */

    const cityName = city
        ? city
            .split("-")
            .map((word) =>
                word.charAt(0).toUpperCase() +
                word.slice(1)
            )
            .join(" ")
        : "City";

    const poiName = poi
        ? poi
            .split("-")
            .map((word) =>
                word.charAt(0).toUpperCase() +
                word.slice(1)
            )
            .join(" ")
        : "Point of Interest";


    /*
     * =========================================
     * INITIAL LOAD / FILTER / SORT
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

                const response = await getPointOfInterestProducts({
                    poi,
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
                    "Gagal mengambil POI products:",
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

    }, [city, poi, filter, sort]);


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

            const response = await getPointOfInterestProducts({
                poi,
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
                    "Gagal load more POI products:",
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

            {/* ================================= */}
            {/* SEO */}
            {/* ================================= */}

            <SEO
                title={`${poiName} | Travel Murah Jogja`}
                description={`Temukan kegiatan wisata menarik di ${poiName}, ${cityName}. Pilih paket wisata terbaik untuk perjalanan Anda.`}
                path={`/point-of-interest/${city}/${poi}`}
            />


            {/* ================================= */}
            {/* LISTING */}
            {/* ================================= */}

            <ListingPages
                title={poiName}
                description={`Temukan kegiatan wisata yang menarik di ${poiName}.`}
                type="point-of-interest"
                slug={poi}
                city={city}
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
                        label: cityName,
                        to: `/city/${city}`,
                    },
                    {
                        label: poiName,
                    },
                ]}
            />

        </div>

    );
}