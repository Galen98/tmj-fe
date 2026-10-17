const BASE_URL =
    import.meta.env.VITE_API_URL;


export async function getSearchProducts({
    keyword,
    page = 1,
    limit = 12,
    filter = "",
} = {}) {

    const params =
        new URLSearchParams();

    params.set(
        "page",
        String(page)
    );

    params.set(
        "per_page",
        String(limit)
    );


    if (keyword) {

        params.set(
            "search",
            keyword
        );

    }


    if (filter) {

        params.set(
            "tag",
            filter
        );

    }


    const response =
        await fetch(
            `${BASE_URL}/travels?${params.toString()}`
        );


    if (!response.ok) {

        throw new Error(
            "Gagal mengambil hasil pencarian"
        );

    }


    return await response.json();
}