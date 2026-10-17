const BASE_URL = import.meta.env.VITE_API_URL;


export async function getCorporateProducts({
    page = 1,
    limit = 12,
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

    params.set("is_corporate", "1");

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
            `Gagal mengambil corporate travels. Status: ${response.status}`
        );
    }

    return await response.json();
}