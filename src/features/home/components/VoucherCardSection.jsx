import {
    useEffect,
    useState,
} from "react";

import VoucherCard from "./VoucherCard";

import {
    faPercent,
} from "@fortawesome/free-solid-svg-icons/faPercent";

import {
    getVouchers,
} from "../api/homeApi";


export default function VoucherSection({
    onCopySuccess,
}) {

    /*
     * =========================================
     * STATE
     * =========================================
     */

    const [vouchers, setVouchers] =
        useState([]);

    const [isLoading, setIsLoading] =
        useState(true);


    /*
     * =========================================
     * GET VOUCHERS
     * =========================================
     */

    useEffect(() => {

        const fetchVouchers = async () => {

            try {

                setIsLoading(true);

                const data =
                    await getVouchers();

                setVouchers(
                    data
                );

            } catch (error) {

                console.error(
                    "Gagal mengambil vouchers:",
                    error
                );

                setVouchers([]);

            } finally {

                setIsLoading(false);

            }

        };


        fetchVouchers();

    }, []);


    /*
     * =========================================
     * FORMAT RUPIAH
     * =========================================
     */

    const formatRupiah = (
        value
    ) => {

        return new Intl.NumberFormat(
            "id-ID",
            {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0,
            }
        ).format(
            Number(value || 0)
        );

    };


    /*
     * =========================================
     * BUILD DESCRIPTION
     * =========================================
     */

    const getDescription = (
        voucher
    ) => {

        const descriptions = [];


        if (
            Number(
                voucher.minTransaction
            ) > 0
        ) {

            descriptions.push(
                `Minimal transaksi ${formatRupiah(
                    voucher.minTransaction
                )}`
            );

        }


        if (
            voucher.discountType ===
                "percentage" &&
            Number(
                voucher.maxDiscount
            ) > 0
        ) {

            descriptions.push(
                `Maksimal diskon ${formatRupiah(
                    voucher.maxDiscount
                )}`
            );

        }


        if (
            descriptions.length === 0
        ) {

            return "Gunakan voucher untuk mendapatkan promo.";

        }


        return descriptions.join(
            " • "
        );

    };


    /*
     * =========================================
     * BUILD TITLE
     * =========================================
     */

    const getTitle = (
        voucher
    ) => {

        if (
            voucher.discountType ===
            "percentage"
        ) {

            return `${voucher.voucherName} - Diskon ${Number(
                voucher.discountValue
            )}%`;

        }


        return `${voucher.voucherName} - Diskon ${formatRupiah(
            voucher.discountValue
        )}`;

    };


    /*
     * =========================================
     * LOADING
     * =========================================
     */

    if (isLoading) {

        return (
            <div className="voucher-section bg-white p-4 rounded mb-5">

                <div className="section-header mb-5">

                    <h3 className="section-title">
                        Kupon Spesial Untuk Anda
                    </h3>

                    <div className="section-underline"></div>

                </div>


                <div className="voucher-empty">

                    <p>
                        Memuat kupon...
                    </p>

                </div>

            </div>
        );

    }


    /*
     * =========================================
     * VIEW
     * =========================================
     */

 return (

    <div className="voucher-section bg-white p-4 rounded mb-5">


        {/* HEADER */}

        <div className="section-header mb-5">

            <h3 className="section-title">
                Kupon Spesial Untuk Anda
            </h3>

            <div className="section-underline"></div>

        </div>


        {/* VOUCHERS */}

        {vouchers.length > 0 ? (

            <div className="voucher-slider">

                {vouchers.map(
                    (voucher) => (

                        <div
                            className="voucher-slider__item"
                            key={voucher.id}
                        >

                            <VoucherCard

                                title={
                                    getTitle(
                                        voucher
                                    )
                                }

                                description={
                                    getDescription(
                                        voucher
                                    )
                                }

                                code={
                                    voucher.voucherCode
                                }

                                icon={
                                    faPercent
                                }

                                onCopySuccess={
                                    onCopySuccess
                                }

                            />

                        </div>

                    )
                )}

            </div>

        ) : (

            <div className="voucher-empty">

                <div className="voucher-empty__icon">
                    <span>%</span>
                </div>

                <h4>
                    Belum Ada Kupon Tersedia
                </h4>

                <p>
                    Saat ini belum ada kupon atau promo
                    yang tersedia. Nantikan penawaran
                    menarik berikutnya!
                </p>

            </div>

        )}

    </div>

);
}