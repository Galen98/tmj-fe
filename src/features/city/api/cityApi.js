const BASE_URL = import.meta.env.VITE_API_URL;


export async function getCityProducts({
    city,
    page = 1,
    limit = 12,
    filter = "",
    sort = "",
} = {}) {

    /*
     * =========================================
     * QUERY PARAMETERS
     * =========================================
     */

    const params = new URLSearchParams();

    params.set("page", String(page));

    params.set("per_page", String(limit));


    /*
     * =========================================
     * CITY FILTER
     * =========================================
     */

    if (city) {
        params.set("city", city);
    }


    /*
     * =========================================
     * TAG FILTER
     * =========================================
     */

    if (filter) {
        params.set("tag", filter);
    }


    /*
     * =========================================
     * SORTING
     * =========================================
     */

    if (sort) {
        params.set("sort", sort);
    }


    /*
     * =========================================
     * FETCH API
     * =========================================
     */

    const response = await fetch(
        `${BASE_URL}/travels?${params.toString()}`,
        {
            headers: {
                Accept: "application/json",
            },
        }
    );

    if (!response.ok) {
        throw new Error(
            `Gagal mengambil travel berdasarkan city. Status: ${response.status}`
        );
    }

    return await response.json();
}

export async function getCityDetail(slug) {
    if (!slug) {
        throw new Error("Slug city tidak valid.");
    }

    const response = await fetch(
        `${BASE_URL}/cities/${encodeURIComponent(slug)}`,
        {
            headers: {
                Accept: "application/json",
            },
        }
    );

    if (!response.ok) {
        throw new Error(
            `Gagal mengambil detail city. Status: ${response.status}`
        );
    }

    const result = await response.json();

    if (!result.success || !result.data) {
        throw new Error("Response detail city tidak valid.");
    }

    return result.data;
}