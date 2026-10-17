
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

/*
 * =========================================
 * PAYMENT LOGOS
 * =========================================
 *
 * Sesuaikan relative path jika lokasi
 * PaymentMethod.jsx berbeda.
 */

import visaLogo from "../../../assets/images/visa.webp";
import mastercardLogo from "../../../assets/images/mastercard.webp";
import bcaLogo from "../../../assets/images/bca.webp";
import mandiriLogo from "../../../assets/images/mandiri.webp";
import bniLogo from "../../../assets/images/bni.webp";
import briLogo from "../../../assets/images/bri.webp";
import gopayLogo from "../../../assets/images/gopay.webp";
import ovoLogo from "../../../assets/images/ovo.webp";
import indomaretLogo from "../../../assets/images/indomaret.webp";
import alfamartLogo from "../../../assets/images/alfamart.webp";
import qrisLogo from "../../../assets/images/qris.png";
/*
 * =========================================
 * PAYMENT METHODS
 * =========================================
 */

const methods = [
    {
        id: "qris",
        name: "QRIS (Quick Response Code Indonesian Standard)",
        logos: [
            qrisLogo
        ],
    },
    {
        id: "credit_card",
        name: "Kartu Kredit / Debit",
        logos: [
            visaLogo,
            mastercardLogo,
        ],
    },
    {
        id: "bca_va",
        name: "BCA Virtual Account",
        logos: [bcaLogo],
    },
    {
        id: "mandiri_va",
        name: "Mandiri Virtual Account",
        logos: [mandiriLogo],
    },
    {
        id: "bni_va",
        name: "BNI Virtual Account",
        logos: [bniLogo],
    },
    {
        id: "bri_va",
        name: "BRI Virtual Account",
        logos: [briLogo],
    },
    {
        id: "gopay",
        name: "GoPay",
        logos: [gopayLogo],
    },
    {
        id: "ovo",
        name: "OVO",
        logos: [ovoLogo],
    },
    {
        id: "indomaret",
        name: "Indomaret",
        logos: [indomaretLogo],
    },
    {
        id: "alfamart",
        name: "Alfamart",
        logos: [alfamartLogo],
    },
];

/*
 * =========================================
 * PAYMENT METHOD COMPONENT
 * =========================================
 */

export default function PaymentMethod({
    value,
    onChange,
    error,
    disabled = false,
}) {

    const [showAll, setShowAll] = useState(false);

    const visibleMethods = showAll
        ? methods
        : methods.slice(0, 3);

    return (
        <div className="tmj-payment-method">

            <h3 className="tmj-payment-method__heading">
                Pilih Metode Pembayaran
            </h3>

            <div className="tmj-payment-method__card">

                <p className="tmj-payment-method__label">
                    Metode Pembayaran
                </p>

                <div className="tmj-payment-method__options">

                    {visibleMethods.map((method) => (

                        <label
                            key={method.id}
                            className={`tmj-payment-method__option ${
                                value === method.id
                                    ? "is-selected"
                                    : ""
                            }`}
                        >

                            {/* PAYMENT LOGO */}

                            <span className="tmj-payment-method__logos">

                                {method.logos.map((logo, index) => (

                                    <img
                                        key={index}
                                        src={logo}
                                        alt={`${method.name} ${index + 1}`}
                                        className="tmj-payment-method__logo"
                                    />

                                ))}

                            </span>

                            {/* PAYMENT NAME */}

                            <span className="tmj-payment-method__name">
                                {method.name}
                            </span>

                            {/* RADIO BUTTON */}

                            <input
                                type="radio"
                                name="paymentMethod"
                                value={method.id}
                                checked={value === method.id}
                                onChange={() =>
                                    onChange(method.id)
                                }
                                disabled={disabled}
                            />

                        </label>

                    ))}

                </div>

                {/* SHOW MORE */}

                {methods.length > 3 && (

                    <button
                        type="button"
                        className="tmj-payment-method__more"
                        onClick={() =>
                            setShowAll((prev) => !prev)
                        }
                        disabled={disabled}
                    >

                        {showAll
                            ? "Lebih Sedikit"
                            : "Lihat Semua"}

                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className={
                                showAll ? "is-expanded" : ""
                            }
                        />

                    </button>

                )}

            </div>

            {error && (
                <small className="tmj-payment-method__error">
                    {error}
                </small>
            )}

        </div>
    );
}
