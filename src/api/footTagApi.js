const API_BASE_URL =
    import.meta.env.VITE_API_URL;


export const getFootTags = async () => {

    const response = await fetch(
        `${API_BASE_URL}/foot-tags`,
        {
            headers: {
                Accept: "application/json",
            },
        }
    );


    if (!response.ok) {

        throw new Error(
            `Gagal mengambil foot tags. Status: ${response.status}`
        );

    }


    const result =
        await response.json();


    if (!result.success) {

        throw new Error(
            "API gagal mengambil foot tags."
        );

    }


    return result.data || [];
};