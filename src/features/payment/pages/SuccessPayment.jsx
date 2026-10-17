import { useEffect, useState } from "react";
import {
    useNavigate,
    useParams,
} from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleCheck,
    faClock,
    faTicket,
} from "@fortawesome/free-solid-svg-icons";

import SEO from "../../../components/SEO";

export default function SuccessPayment() {
    const { token } = useParams();
    const navigate = useNavigate();

    /*
     * Ambil payment session sekali ketika component dibuat.
     * Jadi tidak perlu setPaymentData() di useEffect.
     */
    const [paymentData] = useState(() => {
        try {
            const session = localStorage.getItem(
                `payment_success_${token}`
            );

            if (!session) {
                return null;
            }

            const data = JSON.parse(session);

            if (data.token !== token) {
                return null;
            }

            if (Date.now() >= data.expiredAt) {
                return null;
            }

            return data;
        } catch {
            return null;
        }
    });

    /*
     * Untuk display countdown.
     * Tidak perlu Date.now() di initializer karena sebelumnya
     * ESLint kamu juga mempermasalahkan impure function saat render.
     */
    const [timeLeft, setTimeLeft] = useState(30);

    /*
     * Handle token invalid + countdown.
     */
    useEffect(() => {
        if (!paymentData) {
            localStorage.removeItem(
                `payment_success_${token}`
            );

            navigate("/", {
                replace: true,
            });

            return;
        }

        const interval = setInterval(() => {
            const remaining = Math.max(
                0,
                Math.ceil(
                    (
                        paymentData.expiredAt -
                        Date.now()
                    ) / 1000
                )
            );

            setTimeLeft(remaining);

            if (remaining <= 0) {
                clearInterval(interval);

                localStorage.removeItem(
                    `payment_success_${token}`
                );

                navigate("/", {
                    replace: true,
                });
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };

    }, [paymentData, token, navigate]);

    const handleBackHome = () => {
        localStorage.removeItem(
            `payment_success_${token}`
        );

        navigate("/", {
            replace: true,
        });
    };

    /*
     * Token invalid.
     * Effect di atas akan redirect ke "/".
     */
    if (!paymentData) {
        return null;
    }

    return (
        <>
            <SEO
                title="Pembayaran Berhasil | Travel Murah Jogja"
                description="Pembayaran booking perjalanan Anda berhasil."
                path={`/payment/success/${token}`}
            />

            <div className="app__container border-top-soft mt-mobile">

                <div className="container py-5">

                    <div className="payment-success">

                        <div className="payment-success__icon">
                            <FontAwesomeIcon
                                icon={faCircleCheck}
                            />
                        </div>

                        <h1>
                            Pembayaran Berhasil!
                        </h1>

                        <p className="payment-success__description">
                            Pembayaran Anda telah berhasil
                            diterima. Booking perjalanan Anda
                            telah dikonfirmasi.
                        </p>

                        {paymentData.bookingNumber && (
                            <div className="payment-success__booking">

                                <div className="payment-success__booking-icon">
                                    <FontAwesomeIcon
                                        icon={faTicket}
                                    />
                                </div>

                                <div>
                                    <span>
                                        Nomor Booking
                                    </span>

                                    <strong>
                                        {paymentData.bookingNumber}
                                    </strong>
                                </div>

                            </div>
                        )}

                        <div className="payment-success__notice">
                            Cek email anda atau simpan nomor booking Anda untuk
                            melihat detail dan status perjalanan
                            melalui halaman Cek Status Booking.
                        </div>

                        <div className="payment-success__timer">

                            <FontAwesomeIcon
                                icon={faClock}
                            />

                            <span>
                                Kembali ke beranda dalam{" "}
                                <strong>
                                    {timeLeft} detik
                                </strong>
                            </span>

                        </div>

                        <button
                            type="button"
                            className="btn btn-primary rounded-5"
                            onClick={handleBackHome}
                        >
                            Kembali ke Beranda
                        </button>

                    </div>

                </div>

            </div>
        </>
    );
}