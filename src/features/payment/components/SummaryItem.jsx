import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendarDays,
    faUsers,
    faPuzzlePiece,
    faTicket,
} from "@fortawesome/free-solid-svg-icons";

export default function SummaryItem({
    carts = [],
    // subtotal = 0,
    discount = 0,
    total = 0,
    voucher = null,
}) {
    const calculateItemPrice = (item) => {
        if (item.total != null) {
            return Number(item.total) || 0;
        }

        const participantTotal = Object.values(
            item.participants || {}
        ).reduce((sum, participant) => {
            return sum +
                Number(participant.quantity || 0) *
                Number(participant.price || 0);
        }, 0);

        const addOnTotal = (item.addOns || []).reduce(
            (sum, addOn) => {
                return sum +
                    Number(addOn.quantity || 0) *
                    Number(addOn.price || 0);
            },
            0
        );

        return participantTotal + addOnTotal;
    };

    const getParticipantText = (participants = {}) => {
        const labels = {
            adult: "Dewasa",
            child: "Anak",
            participant: "Peserta",
        };

        return Object.entries(participants)
            .filter(([, value]) => Number(value?.quantity) > 0)
            .map(([key, value]) => {
                const label = labels[key] ||
                    key.replace(/([A-Z])/g, " $1");

                return `${value.quantity} ${label}`;
            })
            .join(", ");
    };

    return (
        <div className="payment-summary">

            <h2 className="payment-summary__title">
                Ringkasan Pesanan
            </h2>

            <div className="payment-summary__card">

                <div className="payment-summary__items">

                    {carts.map((item) => {
                        const itemTotal =
                            calculateItemPrice(item);

                        return (
                            <div
                                className="payment-summary__item"
                                key={`${item.id}-${item.optionId}`}
                            >

                                <div className="payment-summary__product">

                                    <img
                                        src={item.image}
                                        alt={item.title}
                                    />

                                    <div>
                                        <h3>
                                            {item.title}
                                        </h3>

                                        <p>
                                            {item.option}
                                        </p>
                                    </div>

                                </div>

                                <div className="payment-summary__info">

                                    <div>
                                        <FontAwesomeIcon
                                            icon={faCalendarDays}
                                        />

                                        <span>
                                            {item.travelDate} • {item.time}
                                        </span>
                                    </div>

                                    <div>
                                        <FontAwesomeIcon
                                            icon={faUsers}
                                        />

                                        <span>
                                            {getParticipantText(
                                                item.participants
                                            )}
                                        </span>
                                    </div>

                                    {item.addOns?.length > 0 && (
                                        <div>
                                            <FontAwesomeIcon
                                                icon={faPuzzlePiece}
                                            />

                                            <span>
                                                {item.addOns
                                                    .map(
                                                        (addOn) =>
                                                            `${addOn.name} x${addOn.quantity}`
                                                    )
                                                    .join(", ")}
                                            </span>
                                        </div>
                                    )}

                                </div>

                                <div className="payment-summary__item-price">

                                    <span>
                                        Total Paket
                                    </span>

                                    <strong>
                                        Rp{" "}
                                        {itemTotal.toLocaleString(
                                            "id-ID"
                                        )}
                                    </strong>

                                </div>

                            </div>
                        );
                    })}

                </div>

                <div className="payment-summary__pricing">

                    {/* <div className="payment-summary__pricing-row">
                        <span>
                            Subtotal
                        </span>

                        <strong>
                            Rp{" "}
                            {subtotal.toLocaleString(
                                "id-ID"
                            )}
                        </strong>
                    </div> */}

                   
                {voucher && discount > 0 && (
                    <div className="payment-summary__voucher-section">

                        {/* VOUCHER INFO */}
                        <div className="payment-summary__voucher">

                            <div className="payment-summary__voucher-icon">
                                <FontAwesomeIcon icon={faTicket} />
                            </div>

                            <div className="payment-summary__voucher-content">

                                <span className="payment-summary__voucher-label">
                                    Voucher Digunakan
                                </span>

                                <strong className="payment-summary__voucher-name">
                                    {voucher.voucherName}
                                </strong>

                                <span className="payment-summary__voucher-code">
                                    {voucher.voucherCode}
                                </span>

                            </div>

                            <span className="payment-summary__voucher-badge">
                                Aktif
                            </span>

                        </div>

                        {/* DISCOUNT */}
                        <div className="payment-summary__pricing-row payment-summary__discount">

                            <span>
                                Diskon Voucher
                            </span>

                            <strong>
                                - Rp {Number(discount).toLocaleString("id-ID")}
                            </strong>

                        </div>

                    </div>
                )}

                </div>

                <div className="payment-summary__total">

                    <span>
                        Total
                    </span>

                    <strong>
                        Rp{" "}
                        {total.toLocaleString(
                            "id-ID"
                        )}
                    </strong>

                </div>

            </div>

        </div>
    );
}