import { useNavigate } from "react-router-dom";

const rupiah = (value) =>
    new Intl.NumberFormat("id-ID").format(Number(value || 0));

export default function OptionCard({ product, option, isEditMode = false }) {
    const navigate = useNavigate();

    const prices = option.prices || [];

    const minimumPrice = prices.length
        ? Math.min(...prices.map((item) => Number(item.price)))
        : 0;

    const handleSelect = () => {
        navigate(
            `/travels/${product.slug}/option/${option.id}`,
            {
                state: isEditMode
                    ? { editCartId: isEditMode }
                    : null,
            }
        );
    };

    return (
        <article className="trip-variation-card">
            <div className="trip-variation-card__body">
                <h3>{option.option_name}</h3>

                {option.description && (
                    <p>{option.description}</p>
                )}

                <div className="trip-variation-card__bottom">
                    <div>
                        <small>Mulai dari</small>
                        <strong>Rp {rupiah(minimumPrice)}</strong>
                    </div>

                    <button
                        type="button"
                        onClick={handleSelect}
                        className="trip-variation-card__select"
                    >
                        Pilih
                    </button>
                </div>
            </div>
        </article>
    );
}