import { useState } from "react";

export default function ValidationNumber({
    show,
    onClose,
    onValidate,
    isLoading = false,
}) {
    const [phoneLastFive, setPhoneLastFive] = useState("");
    const [error, setError] = useState("");

    if (!show) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!/^\d{5}$/.test(phoneLastFive)) {
            setError("Masukkan 5 digit terakhir nomor telepon.");
            return;
        }

        setError("");
        onValidate(phoneLastFive);
    };

    const handleChange = (e) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 5);

        setPhoneLastFive(value);
        setError("");
    };

    return (
        <div className="validation-number-overlay">
            <div className="validation-number">
                <div className="validation-number__header">
                    <h3>Verifikasi Booking</h3>

                    <button
                        type="button"
                        className="validation-number__close"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        &times;
                    </button>
                </div>

                <div className="validation-number__body">
                    <p>
                        Untuk keamanan, masukkan <strong>5 digit terakhir</strong>{" "}
                        nomor telepon yang digunakan saat melakukan booking.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            inputMode="numeric"
                            maxLength={5}
                            value={phoneLastFive}
                            onChange={handleChange}
                            placeholder="Contoh: 67890"
                            autoFocus
                            disabled={isLoading}
                        />

                        {error && (
                            <div className="validation-number__error">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={isLoading || phoneLastFive.length !== 5}
                        >
                            {isLoading ? "Memverifikasi..." : "Verifikasi"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}