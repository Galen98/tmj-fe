/*
 * =========================================
 * CART STORAGE
 * =========================================
 */

const CART_KEY = "carts";


/*
 * =========================================
 * CALCULATE CART ITEM PRICE
 * =========================================
 *
 * Mengambil nominal yang harus dibayar sekarang.
 *
 * DP   => payableNow
 * FULL => total
 *
 * Mendukung cart lama yang belum punya payableNow.
 */

export const calculateItemPrice = (item) => {
    if (!item) return 0;

    const total = Number(item.total ?? 0);

    const value = item.payableNow ?? (
        item.paymentType === "dp"
            ? (
                item.dpAmount ??
                Math.round(
                    total * Number(item.dpPercentage ?? 30) / 100
                )
            )
            : item.total
    );

    const amount = Number(value ?? 0);

    return Number.isFinite(amount)
        ? Math.max(0, amount)
        : 0;
};

/*
 * =========================================
 * GET CART
 * =========================================
 */

export const getCart = () => {
    try {

        return JSON.parse(
            localStorage.getItem(
                CART_KEY
            ) || "[]"
        );

    } catch (error) {

        console.error(
            "Gagal membaca cart:",
            error
        );

        return [];
    }
};


/*
 * =========================================
 * SAVE CART
 * =========================================
 */

export const saveCart = (carts) => {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(carts)
    );

};


/*
 * =========================================
 * GET CART BY ID
 * =========================================
 *
 * Digunakan ketika user masuk
 * ke ProductDetail melalui Edit.
 */

export const getCartById = (
    cartId
) => {

    const carts =
        getCart();

    return (
        carts.find(
            (item) =>
                item.id === cartId
        ) || null
    );
};


/*
 * =========================================
 * BUILD CART ITEM
 * =========================================
 */

export const buildCartItem = ({
    product,
    option,
    selectedDate,
    selectedTime,
    participants,
    participantPrices,
    addOns = [],
    total = 0,
    useDP = false,
}) => {

    const isGroup =
        product.is_group === true ||
        product.tipe === "group";

    const grandTotal = Number(total) || 0;

    const dpPercentage = useDP ? 30 : 0;

    const dpAmount = useDP
        ? Math.round(grandTotal * 0.3)
        : 0;

    const payableNow = useDP
        ? dpAmount
        : grandTotal;

    const remainingPayment =
        grandTotal - payableNow;

    return {
        /*
        |--------------------------------------------------------------------------
        | CART ID
        |--------------------------------------------------------------------------
        */

        id: crypto.randomUUID(),

        /*
        |--------------------------------------------------------------------------
        | TRAVEL
        |--------------------------------------------------------------------------
        */

        travelId: product.id,
        slug: product.slug,
        optionId: option.id,

        /*
        |--------------------------------------------------------------------------
        | DISPLAY
        |--------------------------------------------------------------------------
        */

        image: product.image1,
        title: product.travel_name,

        rating: Number(product.rating ?? 0),
        review: Number(product.total_rating ?? 0),

        option: option.option_name,

        tipe: isGroup ? "group" : "person",

        /*
        |--------------------------------------------------------------------------
        | BOOKING
        |--------------------------------------------------------------------------
        */

        travelDate: selectedDate,
        time: selectedTime,
        date: `${selectedDate} • ${selectedTime}`,

        /*
        |--------------------------------------------------------------------------
        | PARTICIPANTS
        |--------------------------------------------------------------------------
        */

        participants: isGroup
            ? {
                participant: {
                    quantity: Number(
                        participants?.participant ?? 0
                    ),
                    price: Number(
                        participantPrices?.participantPrice ?? 0
                    ),
                },
            }
            : {
                adult: {
                    quantity: Number(
                        participants?.adult ?? 0
                    ),
                    price: Number(
                        participantPrices?.adultPrice ?? 0
                    ),
                },

                child: {
                    quantity: Number(
                        participants?.child ?? 0
                    ),
                    price: Number(
                        participantPrices?.childPrice ?? 0
                    ),
                },
            },

        /*
        |--------------------------------------------------------------------------
        | ADDONS
        |--------------------------------------------------------------------------
        */

        addOns: addOns.map((addon) => ({
            ...addon,
            price: Number(addon.price ?? 0),
            quantity: Number(addon.quantity ?? 0),
        })),

        /*
        |--------------------------------------------------------------------------
        | PAYMENT
        |--------------------------------------------------------------------------
        |
        | total = total harga perjalanan (100%)
        | payableNow = nominal yang dibayar sekarang
        |
        */

        total: grandTotal,

        paymentType: useDP ? "dp" : "full",

        dpPercentage,
        dpAmount,

        payableNow,
        remainingPayment,
    };
};


/*
 * =========================================
 * ADD TO CART
 * =========================================
 */

export const addToCart = (cartItem) => {

    const carts =
        JSON.parse(
            localStorage.getItem("carts")
        ) || [];

    const updatedCarts = [
        ...carts,
        cartItem,
    ];

    localStorage.setItem(
        "carts",
        JSON.stringify(updatedCarts)
    );

    window.dispatchEvent(
        new Event("cartUpdated")
    );

    return updatedCarts;
};


/*
 * =========================================
 * UPDATE CART
 * =========================================
 *
 * Digunakan ketika user:
 *
 * Checkout
 *     ↓
 * Edit
 *     ↓
 * Product Detail
 *     ↓
 * Perbarui Keranjang
 *
 * Cart lama akan DIGANTI,
 * bukan ditambahkan lagi.
 */

export const updateCart = (
    cartId,
    newCartItem
) => {

    const carts =
        getCart();

    const exists =
        carts.some(
            (item) =>
                item.id === cartId
        );

    if (!exists) {
        throw new Error(
            "Cart yang akan diperbarui tidak ditemukan."
        );
    }

    const updatedCarts =
        carts.map(
            (item) => {

                if (
                    item.id !== cartId
                ) {
                    return item;
                }

                return {
                    ...newCartItem,

                    // pertahankan ID cart lama
                    id: cartId,
                };
            }
        );

    saveCart(
        updatedCarts
    );

    // Kasih tahu Navbar bahwa cart berubah
    window.dispatchEvent(
        new Event("cartUpdated")
    );

    return updatedCarts;
};


/*
 * =========================================
 * REMOVE CART
 * =========================================
 *
 * Bisa dipakai Checkout nanti.
 */

export const removeCart = (
    cartId
) => {

    const carts =
        getCart();

    const updatedCarts =
        carts.filter(
            (item) =>
                item.id !== cartId
        );

    saveCart(
        updatedCarts
    );

    // Kasih tahu Navbar bahwa cart berubah
    window.dispatchEvent(
        new Event("cartUpdated")
    );

    return updatedCarts;
};


/*
 * =========================================
 * FAVORITES
 * =========================================
 */

export const getFavorites = () => {

    try {

        return JSON.parse(
            localStorage.getItem(
                "favorites"
            ) || "[]"
        );

    } catch {

        return [];

    }

};


/*
 * =========================================
 * TOGGLE FAVORITE
 * =========================================
 */

export const toggleFavorite = (
    product
) => {

    const favorites =
        getFavorites();


    const exists =
        favorites.some(
            (item) =>
                item.id ===
                product.id
        );


    let updated;


    if (exists) {

        updated =
            favorites.filter(
                (item) =>
                    item.id !==
                    product.id
            );

    } else {

        updated = [

            ...favorites,

            {
                id: product.id,

                image: product.image1,

                category: product.poi?.name || "",

                title: product.travel_name,

                duration: `${product.durasi} ${product.satuan_durasi}`,

                pickup: product.pickup_venue || "",

                rating: Number(product.rating ?? 0),

                review: `${product.total_rating ?? 0} ulasan`,

                price: Number(product.price_now ?? 0),

                tipe: product.is_group ? "group" : "person",

                jumlahPeserta: product.is_group
                    ? product.jumlahPeserta
                    : null,
            },

        ];

    }


    localStorage.setItem(
        "favorites",
        JSON.stringify(updated)
    );


    return !exists;
};