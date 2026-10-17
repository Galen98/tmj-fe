import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

export default function PaymentTimer({ expiredAt }) {
    const [timeLeft, setTimeLeft] = useState(() =>
        Math.max(0, Math.floor((expiredAt - Date.now()) / 1000))
    );

    useEffect(() => {
        const updateTimer = () => {
            setTimeLeft(
                Math.max(
                    0,
                    Math.floor((expiredAt - Date.now()) / 1000)
                )
            );
        };

        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, [expiredAt]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="payment-timer">
            <FontAwesomeIcon icon={faClock} />

            {timeLeft > 0 ? (
                <span>
                    Selesaikan pesanan dalam{" "}
                    <strong>
                        {String(minutes).padStart(2, "0")}:
                        {String(seconds).padStart(2, "0")}
                    </strong>
                </span>
            ) : (
                <span>Waktu pemesanan telah berakhir.</span>
            )}
        </div>
    );
}