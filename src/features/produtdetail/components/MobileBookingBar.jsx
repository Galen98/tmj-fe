import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faComments,
    faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

export default function MobileBookingBar({
    onChat,
    onCart,
    onBuy,
}) {
    return (
        <div className="mobile-booking-bar">

            {/* CART */}
            <button
                type="button"
                className="mobile-booking-bar__chat"
                onClick={onCart}
                aria-label="Keranjang"
            >
                <FontAwesomeIcon
                    icon={faCartShopping}
                    className="mobile-booking-bar__icon"
                />
            </button>

            {/* CHAT */}
            <button
                type="button"
                className="mobile-booking-bar__cart"
                onClick={onChat}
            >
                <FontAwesomeIcon
                    icon={faComments}
                    className="mobile-booking-bar__icon"
                />

                <span>Tanya Trip Ini</span>
            </button>

            {/* BUY NOW */}
            <button
                type="button"
                className="mobile-booking-bar__buy"
                onClick={onBuy}
            >
                Pesan Langsung
            </button>

        </div>
    );
}