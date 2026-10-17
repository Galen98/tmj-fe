const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getDateAvailabilities = async (optionId) => {
    if (!optionId) {
        throw new Error("Travel Option ID tidak valid.");
    }

    const response = await fetch(
        `${API_BASE_URL}/travel-options/${encodeURIComponent(optionId)}/date-availabilities`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        }
    );

    if (!response.ok) {
        throw new Error("Gagal mengambil data ketersediaan tanggal.");
    }

    const result = await response.json();

    if (!result.success || !Array.isArray(result.data)) {
        throw new Error("Response Date Availability tidak valid.");
    }

    return result.data;
};