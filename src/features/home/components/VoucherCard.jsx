import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function VoucherCard({
    title,
    description,
    code,
    icon,
    onCopySuccess,
}) {
    const copyCode = async () => {
        try {
            await navigator.clipboard.writeText(code);
            onCopySuccess?.();
        } catch (error) {
            console.error("Gagal menyalin voucher:", error);
        }
    };

    return (
        <div className="voucher-card shadow-sm">
            <div className="voucher-header">
                <div className="voucher-icon">
                    <FontAwesomeIcon icon={icon} />
                </div>

                <div className="voucher-header__content">
                    <h5>{title}</h5>
                    <small>{description}</small>
                </div>
            </div>

            <div className="voucher-footer">
                <div className="voucher-code">
                    <FontAwesomeIcon icon={faCopy} />
                    <span>{code}</span>
                </div>

                <button
                    type="button"
                    className="btn-copy"
                    onClick={copyCode}
                >
                    Copy
                </button>
            </div>
        </div>
    );
}