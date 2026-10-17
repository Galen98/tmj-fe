import {
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import Failed from "../../../components/alert/Failed";

import FormIdentity from "../components/FormIdentity";

import SummaryItem from "../components/SummaryItem";

import PaymentTimer from "../components/PaymentTimer";

export default function PaymentPages() {

    const { token } =
        useParams();

    const navigate =
        useNavigate();


    const [
        checkout,
        setCheckout,
    ] = useState(null);


    const [
        isLoading,
        setIsLoading,
    ] = useState(true);


    /*
     * =========================================
     * VALIDATE CHECKOUT SESSION
     * =========================================
     */

    useEffect(() => {

        let active = true;


        /*
         * SESSION INVALID / EXPIRED
         */

        const showExpiredAlert =
            async (
                title =
                    "Sesi Pembayaran Berakhir",

                text =
                    "Token pembayaran sudah kadaluarsa. Silakan lakukan checkout kembali."
            ) => {

                await Failed({
                    title,
                    text,
                });


                if (active) {

                    navigate(
                        "/",
                        {
                            replace:
                                true,
                        }
                    );

                }

            };


        /*
         * VALIDATE TOKEN
         */

        const validateToken =
            async () => {

                /*
                 * Ambil checkout berdasarkan
                 * token dari URL.
                 */

                const session =
                    localStorage.getItem(
                        `checkout_${token}`
                    );


                /*
                 * Tidak ditemukan.
                 */

                if (!session) {

                    await showExpiredAlert(

                        "Checkout Tidak Valid",

                        "Token pembayaran tidak ditemukan atau sudah kadaluarsa."

                    );

                    return;

                }


                try {

                    const checkoutData =
                        JSON.parse(
                            session
                        );


                    /*
                     * =================================
                     * TOKEN HARUS SAMA
                     * =================================
                     */

                    if (
                        checkoutData.token !==
                        token
                    ) {

                        localStorage.removeItem(
                            `checkout_${token}`
                        );


                        await showExpiredAlert();

                        return;

                    }


                    /*
                     * =================================
                     * CEK EXPIRED
                     * =================================
                     */

                    if (
                        !checkoutData.expiredAt ||
                        Date.now() >
                            checkoutData.expiredAt
                    ) {

                        localStorage.removeItem(
                            `checkout_${token}`
                        );


                        await showExpiredAlert();

                        return;

                    }


                    /*
                     * =================================
                     * CEK CART
                     * =================================
                     */

                    if (
                        !Array.isArray(
                            checkoutData.carts
                        ) ||
                        checkoutData.carts
                            .length === 0
                    ) {

                        localStorage.removeItem(
                            `checkout_${token}`
                        );


                        await showExpiredAlert(
                            "Pesanan Tidak Valid",
                            "Data pesanan tidak ditemukan. Silakan lakukan pemesanan kembali."
                        );

                        return;
                    }


                    /*
                     * =================================
                     * CEK PRICING
                     * =================================
                     */

                    if (
                        !checkoutData.pricing
                    ) {

                        localStorage.removeItem(
                            `checkout_${token}`
                        );


                        await showExpiredAlert(

                            "Pesanan Tidak Valid",

                            "Informasi harga pesanan tidak ditemukan."

                        );

                        return;

                    }


                    /*
                     * =================================
                     * CHECKOUT VALID
                     * =================================
                     */

                    if (!active) {
                        return;
                    }


                    setCheckout(
                        checkoutData
                    );


                    setIsLoading(
                        false
                    );


                } catch (error) {

                    console.error(
                        "Gagal membaca checkout:",
                        error
                    );


                    localStorage.removeItem(
                        `checkout_${token}`
                    );


                    await showExpiredAlert();

                }

            };


        validateToken();


        return () => {

            active = false;

        };

    }, [
        token,
        navigate,
    ]);


    /*
     * =========================================
     * PAYMENT SUCCESS
     * =========================================
     *
     * MASIH DUMMY.
     *
     * Nanti bagian ini kita ubah setelah
     * integrasi backend + Midtrans.
     */

    // const handlePaymentSuccess =
    //     () => {

    //         const successToken =
    //             crypto.randomUUID();


    //         const now =
    //             Date.now();


    //         const successSession = {

    //             token:
    //                 successToken,

    //             bookingNumber:
    //                 "TMJ-20260924-0001",

    //             createdAt:
    //                 now,

    //             expiredAt:
    //                 now +
    //                 30 * 1000,

    //         };


    //         localStorage.setItem(
    //             `payment_success_${successToken}`,
    //             JSON.stringify(
    //                 successSession
    //             )
    //         );


    //         /*
    //          * Checkout session selesai.
    //          */

    //         localStorage.removeItem(
    //             `checkout_${token}`
    //         );


    //         navigate(
    //             `/payment/success/${successToken}`,
    //             {
    //                 replace:
    //                     true,
    //             }
    //         );

    //     };


    /*
     * =========================================
     * SUBMIT PAYMENT
     * =========================================
     */

    const handleSubmitPayment = async (form) => {
        console.log("Data Pemesan:", form);
        console.log("Metode Pembayaran:", form.paymentMethod);
        console.log("Data Checkout:", checkout);

        // Integrasi booking dan Midtrans berikutnya.
    };


    /*
     * =========================================
     * LOADING
     * =========================================
     */

    if (isLoading) {

        return (

            <div className="app__container border-top-soft mt-mobile">

                <div className="container py-5">

                    Memeriksa pembayaran...

                </div>

            </div>

        );

    }


    /*
     * =========================================
     * INVALID
     * =========================================
     */

    if (!checkout) {
        return null;
    }


    /*
     * =========================================
     * RENDER
     * =========================================
     */

    return (

        <div className="app__container border-top-soft mt-mobile">

            <div className="container py-5">

               <div className="payment-layout payment-layout--responsive">

                    {/* TIMER */}
                    <div className="payment-layout__timer">
                        <PaymentTimer expiredAt={checkout.expiredAt} />
                    </div>

                    {/* FORM */}
                    <div className="payment-layout__left">
                        <FormIdentity
                            expiredAt={checkout.expiredAt}
                            total={checkout.pricing.total}
                            onSubmit={handleSubmitPayment}
                        />
                    </div>

                    {/* SUMMARY */}
                    <div className="payment-layout__right">
                        <SummaryItem
                            carts={checkout.carts}
                            subtotal={checkout.pricing.subtotal}
                            discount={checkout.pricing.discount}
                            total={checkout.pricing.total}
                            voucher={checkout.voucher}
                        />
                    </div>

                </div>

            </div>

        </div>

    );
}