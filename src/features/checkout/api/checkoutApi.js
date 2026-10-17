const BASE_URL = import.meta.env.VITE_API_URL;

/*
 * =========================================
 * GET VOUCHERS
 * =========================================
 */

export async function getVouchers() {
    const response = await fetch(
        `${BASE_URL}/vouchers`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        }
    );

    if (!response.ok) {
        throw new Error(
            `Gagal mengambil voucher. Status: ${response.status}`
        );
    }

    const result = await response.json();

    if (!result.success || !Array.isArray(result.data)) {
        throw new Error("Response voucher tidak valid.");
    }

    return result.data;
}