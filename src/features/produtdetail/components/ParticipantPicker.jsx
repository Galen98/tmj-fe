function ParticipantCounter({
    type,
    label,
    description,
    quantity,
    minimum = 0,
    onUpdate,
}) {
    return (
        <div className="participant-row">

            <div className="participant-row__info">
                <strong>
                    {label}
                </strong>

                {description && (
                    <small>
                        {description}
                    </small>
                )}
            </div>

            <div className="participant-counter">

                <button
                    type="button"
                    disabled={quantity <= minimum}
                    onClick={() =>
                        onUpdate(type, -1)
                    }
                >
                    −
                </button>

                <span>
                    {quantity}
                </span>

                <button
                    type="button"
                    onClick={() =>
                        onUpdate(type, 1)
                    }
                >
                    +
                </button>

            </div>

        </div>
    );
}

export default function ParticipantPicker({
    product,
    participants,
    onChange,
    onClose,
}) {

    const update = (type, change) => {
        const current =
            participants[type] || 0;

        const minimum =
            type === "adult" ||
            type === "participant"
                ? 1
                : 0;

        const next = Math.max(
            minimum,
            current + change
        );

        onChange({
            ...participants,
            [type]: next,
        });
    };

    return (
        <div className="participant-picker">

            {product.tipe === "group" ? (
                <ParticipantCounter
                    type="participant"
                    label="Peserta"
                    description="Jumlah peserta perjalanan"
                    quantity={
                        participants.participant || 1
                    }
                    minimum={1}
                    onUpdate={update}
                />
            ) : (
                <>
                    <ParticipantCounter
                        type="adult"
                        label="Dewasa"
                        description="Usia 18 tahun ke atas"
                        quantity={
                            participants.adult || 1
                        }
                        minimum={1}
                        onUpdate={update}
                    />

                    {product.is_children && (
                        <ParticipantCounter
                            type="child"
                            label="Anak-anak"
                            description="Usia 0–17 tahun"
                            quantity={
                                participants.child || 0
                            }
                            minimum={0}
                            onUpdate={update}
                        />
                    )}
                </>
            )}

            <button
                type="button"
                className="btn btn-primary participant-apply"
                onClick={onClose}
            >
                Terapkan
            </button>

        </div>
    );
}