import { useState } from "react";

import {
    FontAwesomeIcon,
} from "@fortawesome/react-fontawesome";

import {
    faEnvelope,
} from "@fortawesome/free-regular-svg-icons";

import {
    subscribeEmail,
} from "../services/emailCustomerService";


export default function EmailSubscribe({
    image,
    title = "Penawaran Liburan Spesial untuk Anda",
    description = "Dapatkan voucher liburan, promo perjalanan, dan penawaran eksklusif langsung melalui email Anda.",
    buttonText = "Daftar",
}) {

    /*
     * =========================================
     * STATE
     * =========================================
     */

    const [email, setEmail] =
        useState("");

    const [isLoading, setIsLoading] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const [isSuccess, setIsSuccess] =
        useState(false);


    /*
     * =========================================
     * HANDLE SUBMIT
     * =========================================
     */

    const handleSubmit = async (e) => {

        e.preventDefault();


        /*
         * Hindari double submit.
         */

        if (isLoading) {
            return;
        }


        /*
         * Reset message.
         */

        setMessage("");
        setIsSuccess(false);


        try {

            setIsLoading(true);


            /*
             * Call API.
             */

            const response =
                await subscribeEmail(
                    email.trim()
                );


            /*
             * Success.
             */

            setIsSuccess(true);

            setMessage(
                response.message ||
                "Terima kasih telah berlangganan Travel Murah Jogja."
            );


            /*
             * Kosongkan input.
             */

            setEmail("");

        } catch (error) {

            setIsSuccess(false);

            setMessage(
                error.message ||
                "Terjadi kesalahan. Silakan coba kembali."
            );

        } finally {

            setIsLoading(false);

        }

    };


    /*
     * =========================================
     * VIEW
     * =========================================
     */

    return (

        <section className="email-subscribe">

            <div className="email-subscribe__content">


                {/* IMAGE */}

                <div
                    className="email-subscribe__image"
                    style={{
                        backgroundImage:
                            `url(${image})`,
                    }}
                />


                {/* CONTENT */}

                <div className="email-subscribe__body">

                    <h2 className="email-subscribe__title">
                        {title}
                    </h2>


                    <p className="email-subscribe__description">
                        {description}
                    </p>


                    {/* FORM */}

                    <form
                        className="email-subscribe__form"
                        onSubmit={handleSubmit}
                    >

                        <div className="email-subscribe__input-wrapper">

                            <label
                                htmlFor="subscribe-email"
                                className="email-subscribe__label"
                            >
                                Alamat email:
                            </label>


                            <input
                                id="subscribe-email"
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(
                                        e.target.value
                                    )
                                }
                                required
                                disabled={isLoading}
                                aria-label="Alamat email"
                            />


                            <FontAwesomeIcon
                                icon={faEnvelope}
                                className="email-subscribe__icon"
                            />

                        </div>


                        <button
                            type="submit"
                            className="email-subscribe__button"
                            disabled={isLoading}
                        >

                            {isLoading
                                ? "Mendaftar..."
                                : buttonText
                            }

                        </button>

                    </form>


                    {/* RESPONSE MESSAGE */}

                    {message && (

                        <div
                            className={
                                isSuccess
                                    ? "email-subscribe__message email-subscribe__message--success"
                                    : "email-subscribe__message email-subscribe__message--error"
                            }
                        >
                            {message}
                        </div>

                    )}

                </div>

            </div>


            {/* DISCLAIMER */}

            <p className="email-subscribe__disclaimer">

                Dengan mendaftar, Anda setuju untuk menerima
                email promosi mengenai aktivitas dan tips orang
                dalam. Anda dapat berhenti berlangganan atau
                menarik persetujuan Anda kapan saja dengan
                dampak di masa mendatang. Untuk informasi lebih
                lanjut, baca kami{" "}

                <a
                    href="/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Pernyataan privasi
                </a>

                .

            </p>

        </section>

    );
}