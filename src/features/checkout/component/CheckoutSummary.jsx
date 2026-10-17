import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket, faCheckCircle, faXmark } from "@fortawesome/free-solid-svg-icons";

const rupiah = (value) => `Rp ${Number(value || 0).toLocaleString("id-ID")}`;

export default function CheckoutSummary({
    subtotal = 0, discount = 0, total = 0,
    bookingTotal = 0, remainingPayment = 0,
    voucher, isVoucherLoading = false,
    onApplyVoucher, onRemoveVoucher, onCheckout,
}) {
    const [voucherCode, setVoucherCode] = useState("");
    const [voucherError, setVoucherError] = useState("");

    const handleApplyVoucher = async () => {
        const code = voucherCode.trim();
        if (!code) {
            setVoucherError("Masukkan kode voucher atau kupon.");
            return;
        }
        setVoucherError("");
        const result = await onApplyVoucher?.(code);
        if (!result?.success) {
            setVoucherError(result?.message || "Voucher atau kupon tidak valid.");
            return;
        }
        setVoucherCode("");
    };

    return (
        <div className="checkout-summary">
            <div className="checkout-summary-head">
                <h4>Ringkasan Pembayaran</h4>
            </div>

            <div className="checkout-summary__subtotal">
                <span>Subtotal</span>
                <strong>{rupiah(subtotal)}</strong>
            </div>
            <small className="checkout-summary__tax">Termasuk semua pajak dan biaya</small>
            {remainingPayment > 0 && (
                <div className="mt-3 d-flex justify-content-between gap-2 small text-muted">
                    <span>Total harga trip</span><span>{rupiah(bookingTotal)}</span>
                </div>
            )}
            {remainingPayment > 0 && (
                <div className="mt-2 d-flex justify-content-between gap-2 small text-muted">
                    <span>Sisa pelunasan nanti</span><span>{rupiah(remainingPayment)}</span>
                </div>
            )}
            <div className="checkout-summary__divider" />
            {!voucher ? (
                <div className="checkout-voucher">
                    <div className="checkout-voucher__title">
                        <FontAwesomeIcon icon={faTicket} />
                        <span>Punya voucher atau kupon?</span>
                    </div>
                    <div className="checkout-voucher__form mt-4">
                        <input
                            type="text"
                            value={voucherCode}
                            onChange={(e) => { setVoucherCode(e.target.value); setVoucherError(""); }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") { e.preventDefault(); handleApplyVoucher(); }
                            }}
                            placeholder="Masukkan kode voucher"
                            className={voucherError ? "is-invalid" : ""}
                            disabled={isVoucherLoading}
                        />
                        <button
                            type="button"
                            className="checkout-voucher__button"
                            onClick={handleApplyVoucher}
                            disabled={isVoucherLoading || !voucherCode.trim()}
                        >
                            {isVoucherLoading ? "Memeriksa..." : "Gunakan"}
                        </button>
                    </div>
                    {voucherError && <div className="checkout-voucher__error">{voucherError}</div>}
                </div>
            ) : (
                <div className="checkout-voucher-applied">
                    <div className="checkout-voucher-applied__icon">
                        <FontAwesomeIcon icon={faCheckCircle} />
                    </div>
                    <div className="checkout-voucher-applied__content">
                        <span>Voucher terpasang</span>
                        <strong>{voucher.voucherName}</strong>
                        <small>Kode: {voucher.voucherCode}</small>
                    </div>
                    <button
                        type="button"
                        className="checkout-voucher-applied__remove"
                        onClick={onRemoveVoucher}
                        aria-label="Hapus voucher"
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
            )}
            {voucher && (
                <>
                    <div className="checkout-summary__divider" />
                    <div className="checkout-summary__discount">
                        <span>Diskon</span><strong>- {rupiah(discount)}</strong>
                    </div>
                </>
            )}
            <div className="checkout-summary__total mt-4">
                <span>Total bayar sekarang</span>
                <strong>{rupiah(total)}</strong>
            </div>
            <button
                type="button"
                className="btn btn-primary w-100 rounded-5 fw-bold"
                onClick={onCheckout}
            >
                Pergi ke pembayaran
            </button>
        </div>
    );
}
