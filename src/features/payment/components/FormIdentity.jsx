
import { useEffect, useState } from "react";

import CitySelect from "./CitySelect";
import PaymentMethod from "./PaymentMethod";

/*
 * =========================================
 * FORMAT RUPIAH
 * =========================================
 */

const rupiah = (value) =>
    `Rp ${Number(value || 0).toLocaleString("id-ID")}`;

/*
 * =========================================
 * FORM IDENTITY
 * =========================================
 */

export default function FormIdentity({
    expiredAt,
    total = 0,
    onSubmit,
}) {

    /*
     * =========================================
     * TIMER STATE
     * =========================================
     */

    const [timeLeft, setTimeLeft] = useState(() =>
        Math.max(
            0,
            Math.floor(
                ((expiredAt || 0) - Date.now()) / 1000
            )
        )
    );

    /*
     * =========================================
     * FORM STATE
     * =========================================
     */

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        specialRequest: "",
        asalProvinsi: "",
        asalKota: "",
        paymentMethod: "",
    });

    const [errors, setErrors] = useState({});

    /*
     * =========================================
     * CHECK EXPIRED TIME
     * =========================================
     *
     * Timer visual ditampilkan oleh
     * PaymentTimer di PaymentPages.
     *
     * Di sini hanya untuk memastikan
     * form tidak bisa dikirim jika expired.
     */

    useEffect(() => {

        if (!expiredAt) return;

        const updateTimer = () => {
            const remaining = Math.max(
                0,
                Math.floor(
                    (expiredAt - Date.now()) / 1000
                )
            );

            setTimeLeft(remaining);
        };

        const interval = setInterval(
            updateTimer,
            1000
        );

        return () => {
            clearInterval(interval);
        };

    }, [expiredAt]);

    /*
     * =========================================
     * HANDLE INPUT CHANGE
     * =========================================
     */

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));

    };

    /*
     * =========================================
     * HANDLE PAYMENT METHOD
     * =========================================
     */

    const handlePaymentMethodChange = (method) => {

        setForm((prev) => ({
            ...prev,
            paymentMethod: method,
        }));

        setErrors((prev) => ({
            ...prev,
            paymentMethod: "",
        }));

    };

    /*
     * =========================================
     * FORM VALIDATION
     * =========================================
     */

    const validate = () => {

        const newErrors = {};

        // Full Name
        if (!form.fullName.trim()) {
            newErrors.fullName =
                "Nama lengkap wajib diisi.";
        }

        // Province
        if (!form.asalProvinsi.trim()) {
            newErrors.asalProvinsi =
                "Provinsi wajib dipilih.";
        }

        // City
        if (!form.asalKota.trim()) {
            newErrors.asalKota =
                "Asal kota wajib dipilih.";
        }

        // Email
        if (!form.email.trim()) {
            newErrors.email =
                "Email wajib diisi.";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                form.email
            )
        ) {
            newErrors.email =
                "Format email tidak valid.";
        }

        // WhatsApp
        if (!form.phone.trim()) {
            newErrors.phone =
                "Nomor WhatsApp wajib diisi.";
        } else if (
            !/^[0-9]{9,15}$/.test(
                form.phone
            )
        ) {
            newErrors.phone =
                "Nomor WhatsApp tidak valid.";
        }

        // Payment Method
        if (!form.paymentMethod) {
            newErrors.paymentMethod =
                "Pilih metode pembayaran terlebih dahulu.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };

    /*
     * =========================================
     * HANDLE SUBMIT
     * =========================================
     */

    const handleSubmit = async (e) => {

        e.preventDefault();

        // Expired
        if (
            Date.now() >= expiredAt ||
            timeLeft <= 0 ||
            isSubmitting
        ) {
            return;
        }

        // Validation
        if (!validate()) {
            return;
        }

        setIsSubmitting(true);

        try {
            await onSubmit?.(form);
        } catch (error) {
            console.error(
                "Submit payment error:",
                error
            );
        } finally {
            setIsSubmitting(false);
        }

    };

    /*
     * =========================================
     * RENDER
     * =========================================
     */

    return (
        <div className="payment-identity">

            {/* =================================
                HEADER
            ================================= */}

            <div className="payment-identity__header">

                <h1>
                    Kontak
                </h1>

                <p>
                    Lengkapi informasi pemesan
                    untuk melanjutkan pembayaran.
                </p>

            </div>

            {/* =================================
                FORM
            ================================= */}

            <form onSubmit={handleSubmit}>

                {/* =================================
                    FULL NAME
                ================================= */}

                <div className="payment-identity__field">

                    <label htmlFor="fullName">
                        Nama Lengkap <span>*</span>
                    </label>

                    <input
                        id="fullName"
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder="Masukkan nama lengkap"
                        disabled={
                            timeLeft <= 0 ||
                            isSubmitting
                        }
                    />

                    {errors.fullName && (
                        <small className="tmj-payment-field-error">
                            {errors.fullName}
                        </small>
                    )}

                </div>

                {/* =================================
                    WHATSAPP
                ================================= */}

                <div className="payment-identity__field">

                    <label htmlFor="phone">
                        Nomor WhatsApp <span>*</span>
                    </label>

                    <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Nomor yang bisa dihubungi"
                        disabled={
                            timeLeft <= 0 ||
                            isSubmitting
                        }
                    />

                    {errors.phone && (
                        <small className="tmj-payment-field-error">
                            {errors.phone}
                        </small>
                    )}

                </div>

                {/* =================================
                    EMAIL
                ================================= */}

                <div className="payment-identity__field">

                    <label htmlFor="email">
                        Email <span>*</span>
                    </label>

                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email untuk konfirmasi booking"
                        disabled={
                            timeLeft <= 0 ||
                            isSubmitting
                        }
                    />

                    {errors.email && (
                        <small className="tmj-payment-field-error">
                            {errors.email}
                        </small>
                    )}

                </div>

                {/* =================================
                    PROVINCE & CITY
                ================================= */}

                <div className="payment-identity__field">

                    <CitySelect
                        value={form.asalKota}
                        onChange={handleChange}
                        disabled={timeLeft <= 0 || isSubmitting}
                        provinceError={errors.asalProvinsi}
                        error={errors.asalKota}
                    />

                </div>

                {/* =================================
                    SPECIAL REQUEST
                ================================= */}

                <div className="payment-identity__field">

                    <label htmlFor="specialRequest">
                        Pesan untuk Kami
                        <span className="optional">
                            {" "}(Opsional)
                        </span>
                    </label>

                    <textarea
                        id="specialRequest"
                        name="specialRequest"
                        value={form.specialRequest}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Pesan atau permintaan khusus jika ada"
                        disabled={
                            timeLeft <= 0 ||
                            isSubmitting
                        }
                    />

                </div>

                {/* =================================
                    PAYMENT METHOD
                ================================= */}

                <PaymentMethod
                    value={
                        form.paymentMethod
                    }
                    onChange={
                        handlePaymentMethodChange
                    }
                    error={
                        errors.paymentMethod
                    }
                    disabled={
                        timeLeft <= 0 ||
                        isSubmitting
                    }
                />

                {/* =================================
                    PAYMENT ACTION
                ================================= */}

                <div className="tmj-payment-action">

                    <div className="tmj-payment-action__total">

                        <span>
                            Total Pembayaran
                        </span>

                        <strong>
                            {rupiah(total)}
                        </strong>

                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary rounded-4 fw-bold"
                        disabled={
                            timeLeft <= 0 ||
                            isSubmitting
                        }
                    >
                        {timeLeft <= 0
                            ? "Waktu Habis"
                            : isSubmitting
                                ? "Memproses..."
                                : "Bayar"}
                    </button>

                </div>

            </form>

        </div>
    );
}
