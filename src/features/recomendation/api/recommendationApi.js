const BASE_URL = import.meta.env.VITE_API_URL;


export async function getRecommendationProducts({
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

    params.set(
        "page",
        String(page)
    );

    params.set(
        "per_page",
        String(limit)
    );


    /*
     * =========================================
     * FILTER BY TAG
     * =========================================
     */

    if (filter) {

        params.set(
            "tag",
            filter
        );

    }


    /*
     * =========================================
     * SORTING
     * =========================================
     */

    if (sort) {

        params.set(
            "sort",
            sort
        );

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
            `Gagal mengambil recommendation travels. Status: ${response.status}`
        );

    }


    /*
     * =========================================
     * RESPONSE
     * =========================================
     */

    const result = await response.json();

    return result;
}