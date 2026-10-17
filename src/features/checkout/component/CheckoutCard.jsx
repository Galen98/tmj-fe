import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faStar, faAward, faClock, faUsers, faPen, faTrash, faPuzzlePiece,
} from "@fortawesome/free-solid-svg-icons";

const rupiah = (value) => `Rp ${Number(value || 0).toLocaleString("id-ID")}`;

export default function CheckoutCard({
    image, title, rating, review, option, date, travelDate, time,
    participants = {}, addOns = [], price = 0,
    paymentType, total, remainingPayment, dpPercentage,
    onEdit, onDelete,
}) {
    const participantText = [
        participants?.adult?.quantity > 0 ? `${participants.adult.quantity} Dewasa` : null,
        participants?.child?.quantity > 0 ? `${participants.child.quantity} Anak` : null,
        participants?.participant?.quantity > 0
            ? `${participants.participant.quantity} Peserta` : null,
    ].filter(Boolean).join(", ") || "Peserta belum dipilih";

    const dateText = date || [travelDate, time].filter(Boolean).join(" • ");
    const isDP = paymentType === "dp";
    const remainder = Number(remainingPayment ?? Math.max(0, Number(total || 0) - Number(price || 0)));

    return (
        <div className="checkout-card">
            <img src={image} alt={title || "Trip"} className="checkout-image" />
            <div className="checkout-content">
                <div className="checkout-left">
                    <h4>{title}</h4>
                    <div className="checkout-rating">
                        <span>{Number(rating ?? 0).toFixed(1)}</span>
                        <FontAwesomeIcon icon={faStar} />
                        <span>({review ?? 0} Ulasan)</span>
                    </div>
                    <div className="checkout-info">
                        <div><FontAwesomeIcon icon={faAward} /><span>{option}</span></div>
                        <div><FontAwesomeIcon icon={faClock} /><span>{dateText}</span></div>
                        <div><FontAwesomeIcon icon={faUsers} /><span>{participantText}</span></div>
                        {addOns.length > 0 && (
                            <div>
                                <FontAwesomeIcon icon={faPuzzlePiece} />
                                <span>{addOns.map((addOn) =>
                                    `${addOn.name ?? addOn.addon_name ?? "Add on"} ×${addOn.quantity ?? 1}`
                                ).join(", ")}</span>
                            </div>
                        )}
                    </div>
                    <div className="checkout-action">
                        <button type="button" className="checkout-edit" onClick={onEdit}>
                            <FontAwesomeIcon icon={faPen} /> Ubah
                        </button>
                        <button type="button" className="checkout-delete" onClick={onDelete}>
                            <FontAwesomeIcon icon={faTrash} /> Hapus
                        </button>
                    </div>
                </div>
                <div className="checkout-price">
                {isDP && (
                    <span className="checkout-price__label">
                        DP {dpPercentage || 30}% • Bayar sekarang
                    </span>
                )}

                <h3 className="checkout-price__amount">
                    {rupiah(price)}
                </h3>

                {isDP && (
                    <span className="checkout-price__remaining">
                        Sisa pelunasan {rupiah(remainder)}
                    </span>
                )}
            </div>
            </div>
        </div>
    );
}
