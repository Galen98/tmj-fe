import Breadscrum from "../../../components/Breadscrum";

import CheckoutCard from "../component/CheckoutCard";

import CheckoutSummary from "../component/CheckoutSummary";

import CheckoutBenefit from "../component/CheckoutBenefit";

import Confirm from "../../../components/alert/Confirm";

import Failed from "../../../components/alert/Failed";

import { useNavigate } from "react-router-dom";
import { getVouchers } from "../api/checkoutApi";
import { useState } from "react";
import { getCart, removeCart, calculateItemPrice } from "../../produtdetail/store/productDetailStorage";

export default function CheckoutPages() {

    const [keyword, setKeyword] = useState("");

    const [voucher, setVoucher] = useState(null);

    const [isVoucherLoading, setIsVoucherLoading] =

        useState(false);

    const navigate = useNavigate();

    /* =====================================================

       CART

       Ambil langsung dari localStorage

    ===================================================== */

    const [carts, setCarts] = useState(() => getCart());

    const money = (value) => {
        const amount = Number(value);
        return Number.isFinite(amount) ? Math.max(0, amount) : 0;
    };

    const bookingTotal = carts.reduce(
        (sum, item) => sum + money(item.total ?? calculateItemPrice(item)), 0
    );
    const remainingPayment = carts.reduce((sum, item) => {
        if (item.paymentType !== "dp") return sum;
        return sum + money(item.remainingPayment ?? (money(item.total) - calculateItemPrice(item)));
    }, 0);

    const subtotal = carts.reduce(

        (total, item) =>

            total +

            calculateItemPrice(item),

        0

    );

    /* =====================================================

       DISCOUNT

    ===================================================== */

    const calculateDiscount = (voucher, subtotal) => {
        if (!voucher) {
            return 0;
        }

        let discount = 0;

        /*
        * =========================================
        * PERCENTAGE DISCOUNT
        * =========================================
        */

        if (voucher.discountType === "percentage") {
            discount =
                subtotal *
                (Number(voucher.discountValue) / 100);
        }

        /*
        * =========================================
        * FIXED DISCOUNT
        * =========================================
        */

        else if (voucher.discountType === "fixed") {
            discount = Number(voucher.discountValue);
        }

        /*
        * =========================================
        * MAXIMUM DISCOUNT
        * =========================================
        */

        if (voucher.maxDiscount != null) {
            discount = Math.min(
                discount,
                Number(voucher.maxDiscount)
            );
        }

        return Math.min(
            Math.max(0, discount),
            subtotal
        );
    };

    const discount =

        calculateDiscount(

            voucher,

            subtotal

        );

    const total = Math.max(

        subtotal - discount,

        0

    );

    /* =====================================================

       APPLY VOUCHER

    ===================================================== */

    const handleApplyVoucher = async (code) => {
        setIsVoucherLoading(true);

        try {
            /*
            * =========================================
            * GET VOUCHERS FROM API
            * =========================================
            */

            const vouchers = await getVouchers();

            /*
            * =========================================
            * FIND VOUCHER
            * =========================================
            */

            const selectedVoucher = vouchers.find(
                (item) =>
                    item.voucherCode?.toUpperCase() ===
                    code.trim().toUpperCase()
            );

            if (!selectedVoucher) {
                return {
                    success: false,
                    message: "Kode voucher tidak ditemukan.",
                };
            }

            /*
            * =========================================
            * VALIDATE EXPIRATION
            * =========================================
            */

            const expiredAt = new Date(
                selectedVoucher.voucherExpired
            ).getTime();

            if (
                !Number.isFinite(expiredAt) ||
                expiredAt <= Date.now()
            ) {
                return {
                    success: false,
                    message: "Voucher sudah kedaluwarsa.",
                };
            }

            /*
            * =========================================
            * VALIDATE QUOTA
            * =========================================
            */

            if (Number(selectedVoucher.remainingQuota) <= 0) {
                return {
                    success: false,
                    message: "Kuota voucher sudah habis.",
                };
            }

            /*
            * =========================================
            * VALIDATE MINIMUM TRANSACTION
            * =========================================
            */

            if (
                subtotal <
                Number(selectedVoucher.minTransaction ?? 0)
            ) {
                return {
                    success: false,
                    message:
                        `Minimal transaksi Rp ${Number(
                            selectedVoucher.minTransaction
                        ).toLocaleString("id-ID")}.`,
                };
            }

            /*
            * =========================================
            * VALIDATE DISCOUNT TYPE
            * =========================================
            */

            if (
                !["fixed", "percentage"].includes(
                    selectedVoucher.discountType
                )
            ) {
                return {
                    success: false,
                    message: "Tipe diskon voucher tidak didukung.",
                };
            }

            /*
            * =========================================
            * APPLY VOUCHER
            * =========================================
            */

            setVoucher(selectedVoucher);

            return {
                success: true,
            };

        } catch (error) {
            console.error("Apply voucher error:", error);

            return {
                success: false,
                message: "Gagal memeriksa voucher. Silakan coba lagi.",
            };

        } finally {
            setIsVoucherLoading(false);
        }
    };

    /* =====================================================

       REMOVE VOUCHER

    ===================================================== */

    const handleRemoveVoucher = () => {

        setVoucher(null);

    };

    /* =====================================================

       SEARCH

    ===================================================== */

    const handleSearch = () => {

        if (!keyword.trim()) {

            return;

        }

        navigate(

            `/search/filter?keyword=${encodeURIComponent(

                keyword

            )}`

        );

    };

    /* =====================================================

       EDIT CART

    ===================================================== */

    const handleEdit = (item) => {

        if (!item.slug) {

            console.error(

                "Slug cart tidak ditemukan:",

                item

            );

            return;

        }

        navigate(

            `/travels/${item.slug}`,

            {

                state: {

                    editCartId:

                        item.id,

                },

            }

        );

    };

    /* =====================================================

       CHECKOUT

    ===================================================== */

    const handleCheckout = async () => {

        if (

            carts.length === 0

        ) {

            return;

        }

        /* =================================================

           VALIDASI VOUCHER ULANG

           Nanti bagian ini hit backend.

        ================================================= */

        if (voucher) {
            setIsVoucherLoading(true);

            try {
                const vouchers = await getVouchers();

                const latestVoucher = vouchers.find(
                    (item) => item.id === voucher.id
                );

                const expiredAt = latestVoucher
                    ? new Date(latestVoucher.voucherExpired).getTime()
                    : NaN;

                const isValid =
                    latestVoucher &&
                    Number.isFinite(expiredAt) &&
                    expiredAt > Date.now() &&
                    Number(latestVoucher.remainingQuota) > 0 &&
                    subtotal >= Number(latestVoucher.minTransaction ?? 0) &&
                    ["fixed", "percentage"].includes(
                        latestVoucher.discountType
                    );

                if (!isValid) {
                    setVoucher(null);

                    await Failed({
                        title: "Voucher Tidak Dapat Digunakan",
                        text: "Voucher sudah tidak tersedia, kedaluwarsa, atau tidak memenuhi syarat transaksi.",
                        confirmButtonText: "OK",
                    });

                    return;
                }

                /*
                * =========================================
                * VALIDATE VOUCHER CHANGES
                * =========================================
                */

                const isChanged =
                    latestVoucher.discountType !== voucher.discountType ||
                    Number(latestVoucher.discountValue) !==
                        Number(voucher.discountValue) ||
                    latestVoucher.maxDiscount !== voucher.maxDiscount ||
                    Number(latestVoucher.minTransaction ?? 0) !==
                        Number(voucher.minTransaction ?? 0);

                if (isChanged) {
                    setVoucher(null);

                    await Failed({
                        title: "Voucher Berubah",
                        text: "Ketentuan voucher telah berubah. Silakan gunakan kembali voucher.",
                        confirmButtonText: "OK",
                    });

                    return;
                }

            } catch (error) {
                console.error(
                    "Checkout voucher validation:",
                    error
                );

                await Failed({
                    title: "Gagal Memeriksa Voucher",
                    text: "Terjadi kesalahan saat memeriksa voucher.",
                    confirmButtonText: "OK",
                });

                return;

            } finally {
                setIsVoucherLoading(false);
            }
        }

        /* =================================================

           HAPUS CHECKOUT SESSION LAMA

        ================================================= */

        const previousToken =

            localStorage.getItem(

                "active_checkout_token"

            );

        if (previousToken) {

            localStorage.removeItem(

                `checkout_${previousToken}`

            );

        }

        /* =================================================

           BUAT CHECKOUT SESSION BARU

        ================================================= */

        const token =

            crypto.randomUUID();

        const checkoutSession = {

            token,

            /*

             * Snapshot cart

             */

            carts,

            /*

             * Snapshot pricing

             */

            pricing: {

                subtotal,

                discount,

                total,
                payableNowBeforeDiscount: subtotal,
                payableNow: total,
                bookingTotal,
                remainingPayment,
            },

            /*

             * Snapshot voucher

             */

            voucher: voucher
            ? {
                id: voucher.id,
                voucherName: voucher.voucherName,
                voucherCode: voucher.voucherCode,
                discountType: voucher.discountType,
                discountValue: voucher.discountValue,
                maxDiscount: voucher.maxDiscount,
                minTransaction: voucher.minTransaction,
            }
            : null,

            /*

             * Session

             */

            createdAt:

                Date.now(),

            expiredAt:

                Date.now() +

                6 * 60 * 1000,

        };

        /* =================================================

           SIMPAN CHECKOUT SESSION

        ================================================= */

        localStorage.setItem(

            `checkout_${token}`,

            JSON.stringify(

                checkoutSession

            )

        );

        /*

         * Tandai checkout aktif

         */

        localStorage.setItem(

            "active_checkout_token",

            token

        );

        /* =================================================

           KE PAYMENT

        ================================================= */

        navigate(

            `/payment/${token}`

        );

    };

    /* =====================================================

       DELETE CART

    ===================================================== */

    const handleDelete = async (

        item

    ) => {

        const result =

            await Confirm({

                title:

                    "Hapus dari keranjang?",

                text:

                    `"${item.title}" akan dihapus dari keranjang.`,

                confirmButtonText:

                    "Ya, Hapus",

                cancelButtonText:

                    "Batal",

            });

        if (!result.isConfirmed) {

            return;

        }

        /*

         * Update React state

         * +

         * localStorage

         */

        const updatedCarts = removeCart(item.id);
        setCarts(updatedCarts);

    };

    /* =====================================================

       RENDER

    ===================================================== */

    return (

        <div className="app__container border-top-soft mt-mobile">

            <div className="container py-5">

                {/* =========================

                    BREADCRUMB

                ========================= */}

                <Breadscrum

                    title="Keranjang"

                    subtitle={`${carts.length} kegiatan`}

                />

                {/* =========================

                    EMPTY CART

                ========================= */}

                {carts.length === 0 ? (

                    <div className="checkout-empty">

                        <center>

                            <h2 className="checkout-empty__title">

                                Daftar Keranjang Masih Kosong

                            </h2>

                            <p className="checkout-empty__description">

                                Belum ada kegiatan wisata yang kamu

                                tambahkan ke keranjang. Yuk, temukan

                                kegiatan menarik untuk perjalananmu!

                            </p>

                        </center>

                        <div className="checkout-empty__search mt-5 mb-5">

                            <input

                                type="text"

                                className="checkout-empty__input"

                                placeholder="Cari kegiatan wisata di Jogja"

                                value={keyword}

                                onChange={(e) =>

                                    setKeyword(

                                        e.target.value

                                    )

                                }

                                onKeyDown={(e) => {

                                    if (

                                        e.key ===

                                        "Enter"

                                    ) {

                                        handleSearch();

                                    }

                                }}

                            />

                            <button

                                type="button"

                                className="btn btn-primary checkout-empty__button"

                                onClick={

                                    handleSearch

                                }

                            >

                                Pencarian

                            </button>

                        </div>

                    </div>

                ) : (

                    /* =========================

                       CART

                    ========================= */

                    <div className="checkout-layout">

                        {/* LEFT */}

                        <div className="checkout-left">

                            {carts.map(

                                (item) => (

                                    <CheckoutCard

                                        key={

                                            item.id

                                        }

                                        {...item}

                                        price={calculateItemPrice(item)}

                                        onEdit={() =>

                                            handleEdit(

                                                item

                                            )

                                        }

                                        onDelete={() =>

                                            handleDelete(

                                                item

                                            )

                                        }

                                    />

                                )

                            )}

                        </div>

                        {/* RIGHT */}

                        <div className="checkout-right">

                            <CheckoutSummary

                                subtotal={

                                    subtotal

                                }

                                discount={

                                    discount

                                }

                                total={total}
                                bookingTotal={bookingTotal}
                                remainingPayment={remainingPayment}

                                voucher={

                                    voucher

                                }

                                isVoucherLoading={

                                    isVoucherLoading

                                }

                                onApplyVoucher={

                                    handleApplyVoucher

                                }

                                onRemoveVoucher={

                                    handleRemoveVoucher

                                }

                                onCheckout={

                                    handleCheckout

                                }

                            />

                            <CheckoutBenefit />

                        </div>

                    </div>

                )}

            </div>

        </div>

    );

}