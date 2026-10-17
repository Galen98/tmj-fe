const BASE_URL = import.meta.env.VITE_API_URL;


export async function getPointOfInterestProducts({
    poi,
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
     * POINT OF INTEREST
     * =========================================
     */

    if (poi) {
        params.set("poi", poi);
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
            `Gagal mengambil travel berdasarkan point of interest. Status: ${response.status}`
        );
    }

    return await response.json();
}