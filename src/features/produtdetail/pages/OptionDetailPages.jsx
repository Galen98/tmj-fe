import { useEffect, useMemo, useState } from "react";

import {

    Link,

    useLocation,

    useNavigate,

    useParams,

} from "react-router-dom";

import BookingDatePicker from "../components/BookingDatePicker";

import { getDateAvailabilities } from "../api/dateAvailabilityApi";

import { getParameterGlobal } from "../../../api/parameterGlobalApi";

import { getProductDetail, checkAvailability } from "../api/productDetailApi";

import {

    calculateParticipantPrice,

    calculateAddOnTotal,

} from "../utils/productPricing";

import { validateBookingTime } from "../utils/productDetailValidation";

import {

    addToCart,

    updateCart,

    getCartById,

    buildCartItem,

} from "../store/productDetailStorage";

import Failed from "../../../components/alert/Failed";

import Success from "../../../components/alert/Success";

const formatPrice = (value) =>

    `Rp ${new Intl.NumberFormat("id-ID").format(

        Number(value || 0)

    )}`;

// const today = () => {

//     const date = new Date();

//     const year = date.getFullYear();

//     const month = String(date.getMonth() + 1).padStart(2, "0");

//     const day = String(date.getDate()).padStart(2, "0");

//     return `${year}-${month}-${day}`;

// };

function Counter({ label, description, value, min = 0, max = Infinity, onChange }) {

    return (

        <div className="option-booking-counter">

            <div>

                <strong>{label}</strong>

                {description && <small>{description}</small>}

            </div>

            <div className="option-booking-counter__buttons">

                <button

                    type="button"

                    disabled={value <= min}

                    onClick={() => onChange(value - 1)}

                >

                    −

                </button>

                <span>{value}</span>

                <button

                    type="button"

                    disabled={value >= max}

                    onClick={() => onChange(value + 1)}

                >

                    +

                </button>

            </div>

        </div>

    );

}

const createCheckoutSession = ({

    cartItem,

    total,

    payableNow,

    remaining,

}) => {

    const token = crypto.randomUUID();

    const now = Date.now();

    return {

        token,

        checkoutType: "direct",

        carts: [cartItem],

        voucher: null,

        pricing: {

            subtotal: total,

            discount: 0,

            total: payableNow,

            grandTotal: total,

            payableNow,

            remainingPayment: remaining,

        },

        createdAt: now,

        expiredAt: now + 30 * 60 * 1000,

    };

};

export default function OptionDetailPages() {
    const [dateAvailabilities, setDateAvailabilities] = useState([]);
    const [loadingDateAvailability, setLoadingDateAvailability] = useState(true);
    const [dateAvailabilityError, setDateAvailabilityError] = useState(null);

    const { slug, optionId } = useParams();

    const navigate = useNavigate();

    const location = useLocation();

    const editCartId = location.state?.editCartId || null;

    const [minimumBookingHours, setMinimumBookingHours] = useState(null);

    const [loadingParameter, setLoadingParameter] = useState(true);

    const editingCart = useMemo(

        () => editCartId ? getCartById(editCartId) : null,

        [editCartId]

    );

    const [product, setProduct] = useState(null);

    const [loading, setLoading] = useState(true);

    const [submitting, setSubmitting] = useState(false);

    const [selectedDate, setSelectedDate] = useState(

        editingCart?.travelDate || ""

    );

    const [selectedTime, setSelectedTime] = useState(

        editingCart?.time || ""

    );

    const [participants, setParticipants] = useState({

        adult: editingCart?.participants?.adult?.quantity ?? 1,

        child: editingCart?.participants?.child?.quantity ?? 0,

        participant: editingCart?.participants?.participant?.quantity ?? 1,

    });

    const [selectedAddOns, setSelectedAddOns] = useState(

        editingCart?.addOns || []

    );

    const [useDP, setUseDP] = useState(

        editingCart?.paymentType === "dp"

    );

    useEffect(() => {

        let active = true;

        const load = async () => {

            try {

                setLoading(true);

                const data = await getProductDetail(slug);

                if (active) setProduct(data);

            } catch (error) {

                console.error(error);

                if (active) navigate("/", { replace: true });

            } finally {

                if (active) setLoading(false);

            }

        };

        load();

        return () => {

            active = false;

        };

    }, [slug, navigate]);

    useEffect(() => {
        let active = true;

        const loadMinimumBookingHours = async () => {
            try {
                setLoadingParameter(true);
                const value = await getParameterGlobal("MIN_BOOKING_JAM");
                const hours = Number(value);

                if (value == null || String(value).trim() === "" ||
                    !Number.isFinite(hours) || hours < 0) {
                    throw new Error("Nilai MIN_BOOKING_JAM tidak valid");
                }

                if (active) setMinimumBookingHours(hours);
            } catch (error) {
                console.error("Gagal mengambil MIN_BOOKING_JAM:", error);
                if (active) setMinimumBookingHours(null);
            } finally {
                if (active) setLoadingParameter(false);
            }
        };

        loadMinimumBookingHours();
        return () => { active = false; };
    }, []);

    useEffect(() => {
        let active = true;

        const loadDateAvailability = async () => {
            try {
                if (!optionId) {
                    throw new Error("Option tidak valid.");
                }

                const data = await getDateAvailabilities(optionId);

                if (active) {
                    setDateAvailabilities(data);
                    setDateAvailabilityError(null);
                }
            } catch (error) {
                console.error("Gagal mengambil Date Availability:", error);

                if (active) {
                    setDateAvailabilities([]);
                    setDateAvailabilityError(error.message);
                }
            } finally {
                if (active) {
                    setLoadingDateAvailability(false);
                }
            }
        };

        loadDateAvailability();

        return () => {
            active = false;
        };
    }, [optionId]);

    const option = product?.options?.find(

        (item) => String(item.id) === String(optionId)

    );

    const isGroup =

        product?.is_group === true ||

        product?.is_group === 1 ||

        product?.is_group === "1";

    const maxParticipants = (() => {

    const prices = (option?.prices || []).filter(

        (price) => price.type === "person"

    );

    if (prices.length === 0) return Infinity;

    if (prices.some((price) => price.max == null)) {

        return Infinity;

    }

    return Math.max(

        ...prices.map((price) => Number(price.max))

    );

})();

    const priceData = useMemo(() => {

        if (!option || !product) return null;

        return calculateParticipantPrice({

            prices: option.prices || [],

            participants,

            tipe: isGroup ? "group" : "person",

        });

    }, [option, product, participants, isGroup]);

    const addonTotal = useMemo(

        () => calculateAddOnTotal(selectedAddOns),

        [selectedAddOns]

    );

    const total = (priceData?.total || 0) + addonTotal;

    const dpAmount = Math.round(total * 0.3);

    const payableNow = useDP ? dpAmount : total;

    const remaining = total - payableNow;

    const totalParticipants = isGroup

        ? Number(participants.participant)

        : Number(participants.adult) + Number(participants.child);

    const changeAddon = (addon, quantity) => {

        const min = Number(addon.min || 0);

        const max = addon.max == null

            ? Infinity

            : Number(addon.max);

        const next = Math.max(0, Math.min(max, quantity));

        if (next === 0) {

            setSelectedAddOns((prev) =>

                prev.filter((item) => item.id !== addon.id)

            );

            return;

        }

        if (next < min) return;

        setSelectedAddOns((prev) => {

            const item = {

                id: addon.id,

                name: addon.addon_name,

                price: Number(addon.price),

                quantity: next,

            };

            const exists = prev.some((entry) => entry.id === addon.id);

            return exists

                ? prev.map((entry) => entry.id === addon.id ? item : entry)

                : [...prev, item];

        });

    };

    const getAddonQuantity = (id) =>

        selectedAddOns.find((item) => item.id === id)?.quantity || 0;

    const submitBooking = async (action) => {

        if (submitting) return;

        if (!selectedDate || !selectedTime) {

            await Failed({

                title: "Tanggal atau Jam Belum Dipilih",

                text: "Silakan pilih tanggal dan jam perjalanan.",

            });

            return;

        }

        if (!totalParticipants || totalParticipants < 1) {

            await Failed({

                title: "Peserta Belum Dipilih",

                text: "Silakan pilih jumlah peserta.",

            });

            return;

        }

        if (!priceData || total <= 0) {

            await Failed({

                title: "Harga Tidak Tersedia",

                text: "Jumlah peserta tidak sesuai dengan pilihan harga paket.",

            });

            return;

        }

        if (loadingParameter || minimumBookingHours === null) {
            await Failed({
                title: "Pengaturan Booking Belum Tersedia",
                text: "Batas minimal waktu booking belum berhasil dimuat. Silakan coba lagi.",
            });
            return;
        }

        if (loadingDateAvailability || dateAvailabilityError) {
            await Failed({
                title: "Ketersediaan Tanggal Belum Tersedia",
                text: "Data ketersediaan tanggal belum berhasil dimuat. Silakan coba lagi.",
            });

            return;
        }

        const validation = validateBookingTime({
            selectedDate,
            selectedTime,
            minimumHours: minimumBookingHours,
            dateAvailabilities,
        });

        if (!validation.valid) {

            await Failed({

                title: "Waktu Pemesanan Tidak Tersedia",

                text: validation.message,

            });

            return;

        }

        try {

            setSubmitting(true);

            const availability = await checkAvailability({

                optionId: option.id,

                date: selectedDate,

                quantity: totalParticipants,

            });

            if (!availability.available) {

                await Failed({

                    title: "Paket Tidak Tersedia",

                    text: availability.message || "Silakan pilih tanggal lain.",

                });

                return;

            }

            const cartItem = buildCartItem({

                product,

                option,

                selectedDate,

                selectedTime,

                participants,

                participantPrices: priceData,

                addOns: selectedAddOns,

                total,

                useDP,

            });

            if (action === "cart") {

                if (editingCart) {

                    updateCart(editingCart.id, cartItem);

                    await Success({

                        title: "Berhasil",

                        text: "Keranjang berhasil diperbarui.",

                    });

                    navigate("/cart");

                } else {

                    addToCart(cartItem);

                    await Success({

                        title: "Berhasil",

                        text: "Paket berhasil ditambahkan ke keranjang.",

                    });

                }

                return;

            }

            /*

            |--------------------------------------------------------------------------

            | DIRECT CHECKOUT

            |--------------------------------------------------------------------------

            */

            const checkoutSession = createCheckoutSession({

                cartItem,

                total,

                payableNow,

                remaining,

            });

            localStorage.setItem(

                `checkout_${checkoutSession.token}`,

                JSON.stringify(checkoutSession)

            );

            navigate(`/payment/${checkoutSession.token}`);

        } catch (error) {

            console.error(error);

            await Failed({

                title: "Gagal Memproses Pesanan",

                text: "Terjadi kesalahan. Silakan coba kembali.",

            });

        } finally {

            setSubmitting(false);

        }

    };

    if (loading) {

        return (

            <div

                className="container d-flex flex-column align-items-center justify-content-center py-5"

                style={{ minHeight: "65vh" }}

            >

                <div

                    className="spinner-border text-primary mb-3"

                    role="status"

                    style={{ width: "2.5rem", height: "2.5rem" }}

                >

                    <span className="visually-hidden">Loading...</span>

                </div>

                <h6 className="fw-semibold text-dark mb-1">

                    Memuat Pilihan Trip

                </h6>

                <p className="text-muted small text-center mb-0">

                    Tunggu sebentar, kami sedang menyiapkan pilihan trip untukmu...

                </p>

            </div>

        );

    }

    if (!product || !option) {

        return (

            <div className="container py-5">

                Pilihan trip tidak ditemukan.

                <Link to={`/travels/${slug}`}> Kembali ke detail wisata</Link>

            </div>

        );

    }

    return (

        <div className="option-detail-page">

            <div className="container py-4">

                <Link

                    to={`/travels/${slug}`}

                    className="option-detail-back"

                >

                    ← Kembali ke Detail Wisata

                </Link>

                <div className="option-detail-layout">

                    <main className="option-detail-main">

                        <div className="option-detail-heading">

                            <h1 className="option-detail-title">

                                Detail Pesanan

                            </h1>

                            <h2 className="option-detail-travel-name">

                                {product.travel_name}

                            </h2>

                            <div className="option-detail-variant">

                                <span className="option-detail-variant-label">

                                    Variasi yang dipilih

                                </span>

                                <h3 className="option-detail-variant-name">

                                    {option.option_name}

                                </h3>

                                {option.description && (

                                    <p className="option-detail-variant-description">

                                        {option.description}

                                    </p>

                                )}

                            </div>

                        </div>

                        <section className="option-booking-section">

                            <h3>Pilih Tanggal Trip</h3>

                            <BookingDatePicker
                                value={selectedDate}
                                onChange={setSelectedDate}
                                dateAvailabilities={dateAvailabilities}
                                disabled={loadingDateAvailability || !!dateAvailabilityError}
                            />

                            <h3 className="mt-4">Pilih Jam Trip</h3>

                            <div className="option-booking-times">

                                {(option.times || []).map((time) => (

                                    <button

                                        key={time.id}

                                        type="button"

                                        className={

                                            selectedTime === time.time

                                                ? "active"

                                                : ""

                                        }

                                        onClick={() => setSelectedTime(time.time)}

                                    >

                                        {time.time}

                                    </button>

                                ))}

                            </div>

                        </section>

                        <section className="option-booking-section">

                            <h3>Peserta</h3>

                            {isGroup ? (

                                <Counter

                                    label="Peserta"

                                    description="Jumlah peserta perjalanan"

                                    value={participants.participant}

                                    min={1}

                                    max={maxParticipants}

                                    onChange={(value) =>

                                        setParticipants((prev) => ({

                                            ...prev,

                                            participant: value,

                                        }))

                                    }

                                />

                            ) : (

                                <>

                                    <Counter

                                        label="Dewasa"

                                        description="Jumlah peserta dewasa"

                                        value={participants.adult}

                                        min={1}

                                        onChange={(value) =>

                                            setParticipants((prev) => ({

                                                ...prev,

                                                adult: value,

                                            }))

                                        }

                                    />

                                    {product.is_children && (

                                        <Counter

                                            label="Anak-anak"

                                            value={participants.child}

                                            min={0}

                                            onChange={(value) =>

                                                setParticipants((prev) => ({

                                                    ...prev,

                                                    child: value,

                                                }))

                                            }

                                        />

                                    )}

                                </>

                            )}

                        </section>

                        {(option.addOns || []).length > 0 && (

                            <section className="option-booking-section">

                                <h3>Tambahkan Add On</h3>

                                {option.addOns.map((addon) => (

                                    <Counter

                                        key={addon.id}

                                        label={addon.addon_name}

                                        description={formatPrice(addon.price)}

                                        value={getAddonQuantity(addon.id)}

                                        min={0}

                                        max={addon.max ?? Infinity}

                                        onChange={(value) =>

                                            changeAddon(addon, value)

                                        }

                                    />

                                ))}

                            </section>

                        )}

                    </main>

                    <aside className="option-payment-summary">

                        <h3>Rincian Pembayaran</h3>

                        <div className="option-payment-line">

                            <span>Harga peserta</span>

                            <strong>

                                {formatPrice(priceData?.total)}

                            </strong>

                        </div>

                        <div className="option-payment-line">

                            <span>Add On</span>

                            <strong>{formatPrice(addonTotal)}</strong>

                        </div>

                        <div className="option-payment-line option-payment-line--total">

                            <span>Total Tagihan</span>

                            <strong>{formatPrice(total)}</strong>

                        </div>

                        <label className="option-dp-checkbox">

                            <input

                                type="checkbox"

                                checked={useDP}

                                onChange={(e) => setUseDP(e.target.checked)}

                            />

                            <span>

                                <strong>Bayar DP 30%</strong>

                                <small>

                                    Bayar 30% sekarang, pelunasan sesuai ketentuan perjalanan.

                                </small>

                            </span>

                        </label>

                        <div className="option-payment-line">

                            <span>

                                {useDP ? "DP 30%" : "Bayar Penuh"}

                            </span>

                            <strong>{formatPrice(payableNow)}</strong>

                        </div>

                        {useDP && (

                            <div className="option-payment-line">

                                <span>Sisa Pelunasan</span>

                                <strong>{formatPrice(remaining)}</strong>

                            </div>

                        )}

                        <div className="option-payment-actions">

                            <button

                                type="button"

                                disabled={submitting}

                                className="btn btn-outline-primary"

                                onClick={() => submitBooking("cart")}

                            >

                                {editingCart

                                    ? "Perbarui Keranjang"

                                    : "Masukkan ke Cart"}

                            </button>

                            <button

                                type="button"

                                disabled={submitting}

                                className="btn btn-primary"

                                onClick={() => submitBooking("buy")}

                            >

                                {submitting ? "Memproses..." : "Buat Pesanan"}

                            </button>

                        </div>

                    </aside>

                </div>

            </div>

        </div>

    );

}