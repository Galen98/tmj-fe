import { useEffect } from "react";

export default function ImageModal({
    images = [],
    index = 0,
    onChange,
    onClose,
}) {
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape") {
                onClose();
            }

            if (images.length <= 1) {
                return;
            }

            if (e.key === "ArrowRight") {
                onChange(
                    (index + 1) % images.length
                );
            }

            if (e.key === "ArrowLeft") {
                onChange(
                    (
                        index -
                        1 +
                        images.length
                    ) % images.length
                );
            }
        };

        window.addEventListener(
            "keydown",
            handleKey
        );

        // Supaya body tidak scroll
        // ketika modal terbuka
        const oldOverflow =
            document.body.style.overflow;

        document.body.style.overflow =
            "hidden";

        return () => {
            window.removeEventListener(
                "keydown",
                handleKey
            );

            document.body.style.overflow =
                oldOverflow;
        };
    }, [
        images.length,
        index,
        onChange,
        onClose,
    ]);

    if (!images.length) {
        return null;
    }

    const previous = () => {
        onChange(
            (
                index -
                1 +
                images.length
            ) % images.length
        );
    };

    const next = () => {
        onChange(
            (index + 1) % images.length
        );
    };

    return (
        <div
            className="image-modal"
            onClick={onClose}
        >
            <div
                className="image-modal__content"
                onClick={(e) =>
                    e.stopPropagation()
                }
            >
                <button
                    type="button"
                    className="image-modal__close"
                    onClick={onClose}
                    aria-label="Tutup gambar"
                >
                    ×
                </button>

                {images.length > 1 && (
                    <button
                        type="button"
                        className="image-modal__previous bg-transparent"
                        onClick={previous}
                        aria-label="Gambar sebelumnya"
                    >
                        ‹
                    </button>
                )}

                <img
                    className="image-modal__image"
                    src={images[index]}
                    alt={`Gambar ${index + 1}`}
                />

                {images.length > 1 && (
                    <button
                        type="button"
                        className="image-modal__next bg-transparent"
                        onClick={next}
                        aria-label="Gambar berikutnya"
                    >
                        ›
                    </button>
                )}
            </div>
        </div>
    );
}