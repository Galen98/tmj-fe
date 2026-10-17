
const BASE_URL = import.meta.env.VITE_API_URL;

/*
 * =========================================
 * GET PROVINCES
 * =========================================
 */

export const getProvinces = async () => {

    const response = await fetch(
        `${BASE_URL}/regions/provinces`,
        {
            headers: {
                Accept: "application/json",
            },
        }
    );

    if (!response.ok) {
        throw new Error(
            `Gagal mengambil data provinsi. Status: ${response.status}`
        );
    }

    const result = await response.json();

    if (!result.success) {
        throw new Error(
            result.message ||
            "Gagal mengambil data provinsi."
        );
    }

    return result.data || [];
};

/*
 * =========================================
 * GET REGENCIES
 * =========================================
 */

export const getRegencies = async (provinceCode) => {

    if (!provinceCode) {
        return [];
    }

    const response = await fetch(
        `${BASE_URL}/regions/regencies/${encodeURIComponent(provinceCode)}`,
        {
            headers: {
                Accept: "application/json",
            },
        }
    );

    if (!response.ok) {
        throw new Error(
            `Gagal mengambil data kota/kabupaten. Status: ${response.status}`
        );
    }

    const result = await response.json();

    if (!result.success) {
        throw new Error(
            result.message ||
            "Gagal mengambil data kota/kabupaten."
        );
    }

    return result.data || [];
};
