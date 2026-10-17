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
    getCityProducts,
    getCityDetail,
} from "../api/cityApi";


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


export default function CityPages() {

    /*
     * =========================================
     * QUERY PARAMETERS
     * =========================================
     */

    const { city } = useParams();

    const [searchParams] = useSearchParams();

    const filter = searchParams.get("filter") || "";

    const sort = searchParams.get("sort") || "";


    /*
     * =========================================
     * STATE
     * =========================================
     */
    const [cityDetail, setCityDetail] = useState(null);

    const [products, setProducts] = useState([]);

    const [page, setPage] = useState(1);

    const [hasMore, setHasMore] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const requestIdRef = useRef(0);

    const loadingMoreRef = useRef(false);


    /*
     * =========================================
     * CITY NAME
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


    /*
     * =========================================
     * INITIAL LOAD / FILTER / SORT
     * =========================================
     */

    useEffect(() => {
        let active = true;

        const fetchCityDetail = async () => {
            try {
                const data = await getCityDetail(city);

                if (active) {
                    setCityDetail(data);
                }
            } catch (error) {
                console.error(
                    "Gagal mengambil detail city:",
                    error
                );

                if (active) {
                    setCityDetail(null);
                }
            }
        };

        if (city) {
            fetchCityDetail();
        }

        return () => {
            active = false;
        };
    }, [city]);

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

                const response = await getCityProducts({
                    city,
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
                    "Gagal mengambil city products:",
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

    }, [city, filter, sort]);


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

            const response = await getCityProducts({
                city,
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
                    "Gagal load more city products:",
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
                title={`${cityName} | Travel Murah Jogja`}
                description={`Temukan kegiatan dan paket wisata terbaik di ${cityName}. Jelajahi berbagai pilihan wisata, aktivitas, dan perjalanan menarik untuk liburan Anda.`}
                path={`/city/${city}`}
            />


            {/* ================================= */}
            {/* LISTING */}
            {/* ================================= */}

            <ListingPages
                title={cityName}
                description={`Temukan kegiatan dan paket wisata terbaik di ${cityName}.`}
                type="city"
                slug={city}
                rating={
                    Number(cityDetail?.rating ?? 0)
                }
                totalReviews={
                    Number(cityDetail?.totalReviews ?? 0)
                }
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
                    },
                ]}
            />

        </div>

    );
}