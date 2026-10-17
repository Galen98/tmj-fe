import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import SEO from "../../../components/SEO";
import Breadscrum from "../../../components/Breadscrum";
import ValidationNumber from "../components/ValidationNumber";

export default function StatusBookingPages() {

    const [searchParams] = useSearchParams();

    const [bookingNumber, setBookingNumber] = useState(
        searchParams.get("booking") || ""
    );

    const [booking, setBooking] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [showValidation, setShowValidation] = useState(false);

    const handleCheckBooking = async (e) => {
        e.preventDefault();

        if (!bookingNumber.trim()) {
            setError("Silakan masukkan nomor booking.");
            setBooking(null);
            return;
        }

        setIsLoading(true);
        setError("");
        setBooking(null);

        await new Promise((resolve) => setTimeout(resolve, 800));

        const bookingExists =
            bookingNumber.trim().toUpperCase() === "TMJ-20260921-0001";

        if (!bookingExists) {
            setError("Nomor booking tidak tersedia.");
            setIsLoading(false);
            return;
        }

        // Nomor booking ditemukan
        setIsLoading(false);
        setShowValidation(true);
    };

    const handleValidatePhone = async (lastFive) => {
        setIsLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 800));

        if (lastFive === "67890") {
            setBooking({
                bookingNumber: "TMJ-20260921-0001",
                status: "Dikonfirmasi",
                bookedAt: "18 September 2026, 10:24 WIB",

                customer: {
                    name: "Galen Riandito",
                    email: "galen@email.com",
                    phone: "081234567890",
                },

                items: [
                    {
                        id: 1,
                        product: {
                            name: "Borobudur Sunrise Tour",
                            category: "Tur Berpemandu",
                            image: "https://picsum.photos/600/400?1",
                        },
                        trip: {
                            date: "19 September 2026",
                            time: "04:00 WIB",
                            participant: 2,
                            meetingPoint: "Hotel di Yogyakarta",
                        },
                        price: 500000,
                    },

                    {
                        id: 2,
                        product: {
                            name: "Prambanan Temple Tour",
                            category: "Tur Berpemandu",
                            image: "https://picsum.photos/600/400?2",
                        },
                        trip: {
                            date: "20 September 2026",
                            time: "08:00 WIB",
                            participant: 2,
                            meetingPoint: "Hotel di Yogyakarta",
                        },
                        price: 200000,
                    },
                ],

                payment: {
                    method: "QRIS",
                    status: "Lunas",
                    total: 700000,
                },
            });

            setShowValidation(false);
        } else {
            setError("5 digit terakhir nomor telepon tidak sesuai.");
        }

        setIsLoading(false);
    };


    return (
        <>
            <SEO
                title="Cek Status Booking | Travel Murah Jogja"
                description="Cek detail dan status booking perjalanan Anda dengan memasukkan nomor booking."
                path="/status-booking"
            />


            <div className="app__container border-top-soft mt-mobile">

                <div className="container py-5">

                    <Breadscrum
                        title="Cek Status Booking"
                        subtitle="Lihat detail perjalanan Anda"
                    />


                    <div className="booking-checker">

                        <div className="booking-checker__form">

                            <h1>
                                Cek Status Booking
                            </h1>

                            <p>
                                Masukkan nomor booking untuk melihat
                                detail pemesanan Anda.
                            </p>


                            <form
                                onSubmit={handleCheckBooking}
                            >
                                <input
                                    type="text"
                                    value={bookingNumber}
                                    onChange={(e) =>
                                        setBookingNumber(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Contoh: TMJ-20260921-0001"
                                    disabled={isLoading}
                                />


                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={isLoading}
                                >
                                    {isLoading
                                        ? "Memeriksa..."
                                        : "Cek Booking"}
                                </button>
                            </form>


                            {error && (
                                <div className="booking-checker__error">
                                    {error}
                                </div>
                            )}

                        </div>

                        <ValidationNumber
                            show={showValidation}
                            onClose={() => setShowValidation(false)}
                            onValidate={handleValidatePhone}
                            isLoading={isLoading}
                        />
                        {booking && (
                            <div className="booking-detail">

                                <div className="booking-detail__header">

                                    <div>
                                        <span>
                                            Nomor Booking
                                        </span>

                                        <strong>
                                            {booking.bookingNumber}
                                        </strong>
                                    </div>


                                    <div className="booking-detail__status">
                                        ✓ {booking.status}
                                    </div>

                                </div>


                                {booking.items.map((item) => (
                                    <div
                                        className="booking-detail__item"
                                        key={item.id}
                                    >

                                        {/* <div className="booking-detail__item-header">
                                            <span>
                                                Paket {index + 1}
                                            </span>
                                        </div> */}


                                        <div className="booking-detail__product">

                                            <img
                                                src={item.product.image}
                                                alt={item.product.name}
                                            />

                                            <div>
                                                <span>
                                                    {item.product.category}
                                                </span>

                                                <h2>
                                                    {item.product.name}
                                                </h2>
                                            </div>

                                        </div>


                                        <div className="booking-detail__section">

                                            <h3>
                                                Informasi Perjalanan
                                            </h3>

                                            <div className="booking-detail__grid">

                                                <div>
                                                    <span>
                                                        Peserta
                                                    </span>

                                                    <strong>
                                                        {item.trip.participant} Orang
                                                    </strong>
                                                </div>


                                                <div>
                                                    <span>
                                                        Tanggal Perjalanan
                                                    </span>

                                                    <strong>
                                                        {item.trip.date}
                                                    </strong>
                                                </div>


                                                <div>
                                                    <span>
                                                        Waktu Perjalanan
                                                    </span>

                                                    <strong>
                                                        {item.trip.time}
                                                    </strong>
                                                </div>


                                                <div>
                                                    <span>
                                                        Meeting Point
                                                    </span>

                                                    <strong>
                                                        {item.trip.meetingPoint}
                                                    </strong>
                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                ))}


                                <div className="booking-detail__section">

                                    <h3>
                                        Data Pemesan
                                    </h3>


                                    <div className="booking-detail__grid">

                                        <div>
                                            <span>
                                                Nama
                                            </span>

                                            <strong>
                                                {booking.customer.name}
                                            </strong>
                                        </div>


                                        <div>
                                            <span>
                                                Email
                                            </span>

                                            <strong>
                                                {booking.customer.email}
                                            </strong>
                                        </div>


                                        <div>
                                            <span>
                                                WhatsApp
                                            </span>

                                            <strong>
                                                {booking.customer.phone}
                                            </strong>
                                        </div>

                                    </div>

                                </div>


                                <div className="booking-detail__section">

                                    <h3>
                                        Pembayaran
                                    </h3>


                                    <div className="booking-detail__grid">

                                        <div>
                                            <span>
                                                Metode Pembayaran
                                            </span>

                                            <strong>
                                                {booking.payment.method}
                                            </strong>
                                        </div>


                                        <div>
                                            <span>
                                                Status Pembayaran
                                            </span>

                                            <strong>
                                                {booking.payment.status}
                                            </strong>
                                        </div>

                                    </div>


                                    <div className="booking-detail__total">

                                        <span>
                                            Total Pembayaran
                                        </span>

                                        <strong>
                                            Rp{" "}
                                            {booking.payment.total.toLocaleString(
                                                "id-ID"
                                            )}
                                        </strong>

                                    </div>

                                </div>

                            </div>

                        )}

                    </div>

                </div>

            </div>
        </>
    );
}
