import {
    useState,
} from "react";

import {
    FontAwesomeIcon,
} from "@fortawesome/react-fontawesome";

import {
    faEnvelope,
    faPhone,
} from "@fortawesome/free-solid-svg-icons";

import {
    Modal,
} from "react-bootstrap";


import SEO
    from "../../../components/SEO";

import ContactForm
    from "../components/ContactForm";

import {
    useContact,
} from "../hooks/useContact";


const ContactPage = () => {

    /*
     * =========================================
     * CONTACT
     * =========================================
     */

    const {
        submitContact,
        loading,
        error,
        validationErrors,
    } = useContact();


    /*
     * =========================================
     * STATE
     * =========================================
     */

    const [
        showPhoneModal,
        setShowPhoneModal,
    ] = useState(false);


    const [
        toast,
        setToast,
    ] = useState({
        show: false,
        message: "",
    });


    /*
     * =========================================
     * SHOW TOAST
     * =========================================
     */

    const showToast =
        (message) => {

            setToast({
                show: true,
                message,
            });


            setTimeout(() => {

                setToast({
                    show: false,
                    message: "",
                });

            }, 2500);

        };


    /*
     * =========================================
     * SUBMIT CONTACT
     * =========================================
     */

    const handleSubmitContact =
        async (form) => {

            try {

                const response =
                    await submitContact(
                        form
                    );


                showToast(
                    response.message ||
                    "Pesan berhasil dikirim!"
                );


                return response;

            } catch (error) {

                /*
                 * Validation error akan muncul
                 * langsung di masing-masing input.
                 */

                if (
                    error.status !== 422
                ) {

                    showToast(
                        error.message ||
                        "Gagal mengirim pesan."
                    );

                }


                throw error;

            }

        };


    /*
     * =========================================
     * COPY EMAIL
     * =========================================
     */

    const handleCopy =
        async () => {

            try {

                await navigator.clipboard
                    .writeText(
                        "cs@travelmurahjogja.com"
                    );


                showToast(
                    "Email berhasil disalin!"
                );

            } catch (error) {

                console.error(
                    "Copy email gagal:",
                    error
                );

            }

        };


    return (

        <>

            <SEO
                title="Travel Murah Jogja | Contact Us"
                description="Paket wisata Jogja murah dan terbaik."
                path="/contact-us"
            />


            <div className="app__container">

                <div className="grid wide mt-mobile">

                    <div className="row sm-gutter app_content">

                        <div className="row justify-content-center">

                            <div className="col-12 col-md-6">


                                {/* ================================= */}
                                {/* CONTACT FORM */}
                                {/* ================================= */}

                                <ContactForm
                                    onSubmit={
                                        handleSubmitContact
                                    }
                                    loading={
                                        loading
                                    }
                                    validationErrors={
                                        validationErrors
                                    }
                                />


                                {/* GENERAL ERROR */}

                                {error &&
                                    Object.keys(
                                        validationErrors
                                    ).length === 0 && (

                                        <div
                                            className="alert alert-danger mt-3"
                                        >
                                            {error}
                                        </div>

                                    )}


                                <div className="mt-5">


                                    {/* ================================= */}
                                    {/* EMAIL */}
                                    {/* ================================= */}

                                    <div
                                        className="
                                            contact-item
                                            d-flex
                                            align-items-center
                                            justify-content-between
                                        "
                                    >

                                        <div
                                            className="
                                                d-flex
                                                align-items-center
                                                gap-3
                                            "
                                        >

                                            <FontAwesomeIcon
                                                icon={
                                                    faEnvelope
                                                }
                                                className="contact-icon"
                                            />


                                            <div>

                                                <div className="fw-semibold">
                                                    Email kami
                                                </div>

                                                <div className="text-secondary">
                                                    cs@travelmurahjogja.com
                                                </div>

                                            </div>

                                        </div>


                                        <button
                                            type="button"
                                            className="btn contact-btn"
                                            onClick={
                                                handleCopy
                                            }
                                        >
                                            Salin email
                                        </button>

                                    </div>


                                    {/* ================================= */}
                                    {/* PHONE */}
                                    {/* ================================= */}

                                    <div
                                        className="
                                            contact-item
                                            d-flex
                                            align-items-center
                                            justify-content-between
                                            mt-3
                                        "
                                    >

                                        <div
                                            className="
                                                d-flex
                                                align-items-center
                                                gap-3
                                            "
                                        >

                                            <FontAwesomeIcon
                                                icon={
                                                    faPhone
                                                }
                                                className="contact-icon"
                                            />


                                            <div>

                                                <div className="fw-semibold">
                                                    Telepon kami
                                                </div>

                                                <div className="text-secondary">

                                                    Lebih nyaman lewat
                                                    telepon? Kami siap
                                                    dihubungi.

                                                </div>

                                            </div>

                                        </div>


                                        <button
                                            type="button"
                                            className="btn contact-btn"
                                            onClick={() =>
                                                setShowPhoneModal(
                                                    true
                                                )
                                            }
                                        >
                                            Lihat nomor telepon
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ================================= */}
                {/* TOAST */}
                {/* ================================= */}

                <div
                    className={`toast position-fixed bottom-0 end-0 m-3 toast-copy ${
                        toast.show
                            ? "show"
                            : ""
                    }`}
                    style={{
                        display:
                            toast.show
                                ? "block"
                                : "none",

                        zIndex:
                            9999,
                    }}
                >

                    <div className="toast-body">
                        {toast.message}
                    </div>

                </div>

            </div>


            {/* ================================= */}
            {/* PHONE MODAL */}
            {/* ================================= */}

            <Modal
                show={
                    showPhoneModal
                }
                onHide={() =>
                    setShowPhoneModal(
                        false
                    )
                }
                centered
            >

                <Modal.Header
                    closeButton
                >

                    <Modal.Title>
                        Nomor Telepon
                    </Modal.Title>

                </Modal.Header>


                <Modal.Body>

                    <p className="text-muted">

                        Gunakan nomor di bawah
                        ini untuk menghubungi kami.

                    </p>


                    <div className="border-top pt-3">

                        <div className="fw-semibold">

                            🇮🇩 Indonesia

                        </div>


                        <div className="mt-3">

                            <div className="small text-muted">
                                Indonesia Call Center
                            </div>


                            <a
                                href="tel:+628123456789"
                                className="fs-4 text-decoration-none"
                            >
                                +62 812-3456-789
                            </a>

                        </div>

                    </div>

                </Modal.Body>

            </Modal>

        </>

    );

};


export default ContactPage;