const API_URL = import.meta.env.VITE_API_URL;

export const getSearchSuggestions = async (keyword) => {
    const response = await fetch(
        `${API_URL}/search/suggestions?keyword=${encodeURIComponent(
            keyword
        )}`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message ||
            "Gagal mengambil hasil pencarian."
        );
    }

    return result.data || [];
};