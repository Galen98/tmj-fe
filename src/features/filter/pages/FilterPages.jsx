import {
    useEffect,
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
    getSearchProducts,
} from "../api/filterApi";


const LIMIT = 12;


export default function FilterPages() {

    const [searchParams] =
        useSearchParams();


    const keyword =
        searchParams.get("keyword") || "";

    const filter =
        searchParams.get("filter") || "";


    const [products, setProducts] =
        useState([]);

    const [page, setPage] =
        useState(1);

    const [hasMore, setHasMore] =
        useState(false);

    const [isLoading, setIsLoading] =
        useState(true);


    /*
     * =========================================
     * MAPPING
     * =========================================
     */

    const mapProducts =
        (items = []) => {

            return items.map(
                (item) => ({

                    ...item,

                    name:
                        item.travel_name,

                    location:
                        item.city?.name ?? "",

                    category:
                        item.poi?.name ?? "",

                    duration:
                        `${item.durasi} ${item.satuan_durasi}`,

                    price:
                        item.price_now,

                    oldPrice:
                        item.price_discount,

                    rating: Number(item.rating ?? 0),

                    totalRating: Number(item.total_rating ?? 0),

                })
            );

        };


    /*
     * =========================================
     * INITIAL SEARCH
     * =========================================
     */

    useEffect(() => {

        let isActive = true;


        const fetchProducts =
            async () => {

                if (!keyword.trim()) {

                    setProducts([]);
                    setHasMore(false);
                    setIsLoading(false);

                    return;
                }


                try {

                    setIsLoading(true);


                    const response =
                        await getSearchProducts({
                            keyword,
                            page: 1,
                            limit: LIMIT,
                            filter,
                        });


                    if (!isActive) {
                        return;
                    }


                    setProducts(
                        mapProducts(
                            response.data || []
                        )
                    );


                    setPage(
                        response.meta
                            ?.current_page ?? 1
                    );


                    setHasMore(
                        (response.meta?.current_page ?? 1) <
                        (response.meta?.last_page ?? 1)
                    );


                } catch (error) {

                    if (!isActive) {
                        return;
                    }


                    console.error(
                        "Gagal mengambil hasil pencarian:",
                        error
                    );


                    setProducts([]);

                    setPage(1);

                    setHasMore(false);


                } finally {

                    if (isActive) {

                        setIsLoading(false);

                    }

                }

            };


        fetchProducts();


        return () => {

            isActive = false;

        };

    }, [
        keyword,
        filter,
    ]);


    /*
     * =========================================
     * LOAD MORE
     * =========================================
     */

    const handleLoadMore =
        async () => {

            if (!hasMore) {
                return;
            }


            const nextPage =
                page + 1;


            const response =
                await getSearchProducts({
                    keyword,
                    page: nextPage,
                    limit: LIMIT,
                    filter,
                });


            const newProducts =
                mapProducts(
                    response.data || []
                );


            setProducts(
                (currentProducts) => [
                    ...currentProducts,
                    ...newProducts,
                ]
            );


            setPage(
                response.meta
                    ?.current_page ?? nextPage
            );


            setHasMore(
                (response.meta?.current_page ?? nextPage) <
                (response.meta?.last_page ?? nextPage)
            );

        };


    return (

        <div>

            <SEO
                title={`Pencarian "${keyword}" | Travel Murah Jogja`}
                description={
                    keyword
                        ? `Temukan kegiatan dan paket wisata untuk "${keyword}" di Travel Murah Jogja. Jelajahi berbagai pilihan wisata dan aktivitas untuk perjalanan Anda.`
                        : "Cari dan temukan berbagai kegiatan serta paket wisata di Travel Murah Jogja."
                }
                path={`/search/filter?keyword=${encodeURIComponent(
                    keyword
                )}`}
            />


            <ListingPages
                title={`Hasil pencarian "${keyword}"`}
                description={
                    keyword
                        ? `Temukan kegiatan wisata yang sesuai dengan pencarian "${keyword}".`
                        : "Temukan kegiatan wisata yang Anda cari."
                }
                type="search"
                slug={keyword}
                products={products}
                hasMore={hasMore}
                onLoadMore={handleLoadMore}
                isLoading={isLoading}
                serverSideFilter={true}
                breadcrumbItems={[
                    {
                        label: "Beranda",
                        to: "/",
                    },
                    {
                        label:
                            `Pencarian "${keyword}"`,
                    },
                ]}
            />

        </div>
    );
}