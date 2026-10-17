export const findTierPrice = (prices, type, quantity) => {
    return (prices || []).find((item) => {
        const min = Number(item.min ?? 0);
        const max = item.max == null
            ? Infinity
            : Number(item.max);

        return (
            item.status !== false &&
            item.type === type &&
            quantity >= min &&
            quantity <= max
        );
    }) || null;
};

export const calculateParticipantPrice = ({
    prices,
    participants,
    tipe,
}) => {
    // GROUP: harga tetap berdasarkan tier peserta
    if (tipe === "group") {
        const quantity = Number(participants.participant) || 0;

        // Pada response backend kamu, type tetap "person",
        // walaupun is_group bernilai true.
        const tier = findTierPrice(
            prices,
            "person",
            quantity
        );

        const groupPrice = Number(tier?.price) || 0;

        return {
            participantPrice: groupPrice,
            participantTotal: groupPrice,
            participantTier: tier,
            total: groupPrice,
        };
    }

    // PERSON: harga dikalikan jumlah peserta
    const adultQuantity = Number(participants.adult) || 0;
    const childQuantity = Number(participants.child) || 0;

    const adultTier = findTierPrice(
        prices,
        "person",
        adultQuantity
    );

    const childTier = childQuantity > 0
        ? findTierPrice(prices, "child", childQuantity)
        : null;

    const adultPrice = Number(adultTier?.price) || 0;
    const childPrice = Number(childTier?.price) || 0;

    const adultTotal = adultQuantity * adultPrice;
    const childTotal = childQuantity * childPrice;

    return {
        adultPrice,
        childPrice,
        adultTotal,
        childTotal,
        adultTier,
        childTier,
        total: adultTotal + childTotal,
    };
};

export const calculateAddOnTotal = (selectedAddOns = []) => {
    return selectedAddOns.reduce(
        (total, addon) =>
            total +
            Number(addon.quantity || 0) * Number(addon.price || 0),
        0
    );
};