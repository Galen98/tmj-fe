const API_BASE_URL =
    import.meta.env.VITE_API_URL;

export const getTags = async () => {
    const response = await fetch(
        `${API_BASE_URL}/tags`,
        {
            headers: {
                Accept: "application/json",
            },
        }
    );

    if (!response.ok) {
        throw new Error(
            `Gagal mengambil tags. Status: ${response.status}`
        );
    }

    const result = await response.json();

    if (!result.success) {
        throw new Error(
            "API gagal mengambil data tags."
        );
    }

    return result.data || [];
};