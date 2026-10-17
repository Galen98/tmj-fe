// import productDetail from "../data/productDetail.json";
// import travelOptions from "../data/travelOptions.json";
// import travelOptionPrices from "../data/travelOptionPrices.json";
// import travelOptionTimes from "../data/travelOptionTimes.json";
import travelDateAvailability from "../data/travelDateAvailability.json";
// import travelAddons from "../data/travelAddons.json";
// import reviews from "../data/reviews.json";


const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

export const getProductDetail = async (slug) => {
    const response = await fetch(
        `${API_BASE_URL}/travels/${encodeURIComponent(slug)}`
    );

    if (!response.ok) {
        throw new Error("Produk tidak ditemukan");
    }

    const result = await response.json();
    const product = result.data;

    return {
        ...product,
        tipe: product.is_group ? "group" : "person",
        options: (product.options || []).map((option) => ({
            ...option,
            prices: (option.prices || []).map((price) => ({
                ...price,
                status: true,
                price: Number(price.price),
            })),
            times: option.times || [],
            addOns: (option.addons || []).map((addon) => ({
                ...addon,
                price: Number(addon.price),
            })),
        })),
    };
};

export const getProductOptions = async (travelId, product = null) => {
    if (product?.id === travelId) {
        return product.options || [];
    }

    throw new Error("Gunakan options dari response detail Travel.");
};

export const getProductReviews = async (travelId, product = null) => {
    if (product?.id === travelId) {
        return product.reviews || [];
    }

    return [];
};


/*
|--------------------------------------------------------------------------
| CHECK AVAILABILITY OPTION
|--------------------------------------------------------------------------
|
| Dipanggil saat:
|
| - Tambah ke Keranjang
| - Pesan Sekarang
|
| BUKAN saat tombol "Lihat Ketersediaan".
|
*/
export const checkAvailability = async ({
    optionId,
    date,
    quantity,
}) => {

    // ==========================================
    // NANTI GANTI DENGAN API BACKEND
    // ==========================================
    //
    // return axios.post(
    //     "/api/availability/check",
    //     {
    //         travel_option_id: optionId,
    //         date,
    //         quantity,
    //     }
    // );


    const availability =
        travelDateAvailability.find(
            (item) =>
                item.travel_option_id === optionId &&
                item.date === date
        );


    /*
     * Sesuai rule sementara:
     *
     * Kalau kombinasi option + tanggal
     * tidak terdapat di tabel availability,
     * dianggap AVAILABLE.
     */
    if (!availability) {
        return {
            available: true,
            availability: null,
        };
    }


    /*
     * Option ditutup untuk tanggal tersebut.
     */
    if (!availability.status) {
        return {
            available: false,
            message:
                "Paket ini tidak tersedia pada tanggal yang dipilih.",
            availability,
        };
    }


    /*
     * Cek remaining quota.
     */
    if (
        availability.remaining_quota !== null &&
        availability.remaining_quota < quantity
    ) {
        return {
            available: false,
            message:
                `Kuota tidak mencukupi. Tersisa ${availability.remaining_quota} peserta.`,
            availability,
        };
    }


    return {
        available: true,
        availability,
    };
};