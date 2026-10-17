import OptionCard from "./OptionCard";

export default function TripVariations({
    product,
    editingCart = null,
}) {
    const options = product.options || [];

    if (!options.length) {
        return null;
    }

    return (
        <section
            id="trip-variations"
            className="trip-variations"
        >
            <h2>Pilihan Variasi Trip</h2>

            <div className="trip-variations__list">
                {options.map((option) => (
                    <OptionCard
                        key={option.id}
                        product={product}
                        option={option}
                        isEditMode={
                            editingCart?.optionId === option.id
                                ? editingCart.id
                                : false
                        }
                    />
                ))}
            </div>
        </section>
    );
}