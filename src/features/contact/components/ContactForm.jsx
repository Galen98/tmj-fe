import {
    useState,
} from "react";


const ContactForm = ({
    onSubmit,
    loading,
    validationErrors = {},
}) => {

    /*
     * =========================================
     * STATE
     * =========================================
     */

    const [form, setForm] =
        useState({
            name: "",
            email: "",
            message: "",
        });


    /*
     * =========================================
     * CHANGE
     * =========================================
     */

    const handleChange =
        (e) => {

            const {
                name,
                value,
            } = e.target;


            setForm(
                (currentForm) => ({
                    ...currentForm,

                    [name]:
                        value,
                })
            );

        };


    /*
     * =========================================
     * SUBMIT
     * =========================================
     */

    const handleSubmit =
        async (e) => {

            e.preventDefault();


            try {

                await onSubmit(
                    form
                );


                /*
                 * Reset setelah berhasil.
                 */

                setForm({
                    name: "",
                    email: "",
                    message: "",
                });

            } catch (error) {

                /*
                 * Error sudah ditangani store.
                 */

                console.error(
                    "Contact submit error:",
                    error
                );

            }

        };


    return (

        <div className="card shadow rounded-3">

            <div className="card-body">

                <h2 className="card-title mb-3">
                    Hubungi Kami
                </h2>


                <p className="text-secondary">

                    Silakan isi formulir di bawah
                    ini dan kami akan segera
                    merespons Anda.

                </p>


                <form
                    onSubmit={
                        handleSubmit
                    }
                >


                    {/* ================================= */}
                    {/* NAME */}
                    {/* ================================= */}

                    <div className="mb-3">

                        <input
                            type="text"
                            name="name"
                            value={
                                form.name
                            }
                            className={`form-control ${
                                validationErrors.name
                                    ? "is-invalid"
                                    : ""
                            }`}
                            placeholder="Nama"
                            onChange={
                                handleChange
                            }
                            disabled={
                                loading
                            }
                            required
                        />


                        {validationErrors.name && (

                            <div className="invalid-feedback">

                                {
                                    validationErrors
                                        .name[0]
                                }

                            </div>

                        )}

                    </div>


                    {/* ================================= */}
                    {/* EMAIL */}
                    {/* ================================= */}

                    <div className="mb-3">

                        <input
                            type="email"
                            name="email"
                            value={
                                form.email
                            }
                            className={`form-control ${
                                validationErrors.email
                                    ? "is-invalid"
                                    : ""
                            }`}
                            placeholder="Email"
                            onChange={
                                handleChange
                            }
                            disabled={
                                loading
                            }
                            required
                        />


                        {validationErrors.email && (

                            <div className="invalid-feedback">

                                {
                                    validationErrors
                                        .email[0]
                                }

                            </div>

                        )}

                    </div>


                    {/* ================================= */}
                    {/* MESSAGE */}
                    {/* ================================= */}

                    <div className="mb-3">

                        <textarea
                            name="message"
                            value={
                                form.message
                            }
                            className={`form-control ${
                                validationErrors.message
                                    ? "is-invalid"
                                    : ""
                            }`}
                            rows="4"
                            placeholder="Pesan Anda"
                            onChange={
                                handleChange
                            }
                            disabled={
                                loading
                            }
                            required
                        />


                        {validationErrors.message && (

                            <div className="invalid-feedback">

                                {
                                    validationErrors
                                        .message[0]
                                }

                            </div>

                        )}

                    </div>


                    {/* ================================= */}
                    {/* SUBMIT */}
                    {/* ================================= */}

                    <button
                        type="submit"
                        className="btn btn-primary w-100 rounded-5 fw-bold"
                        disabled={
                            loading
                        }
                    >

                        {loading
                            ? "Mengirim..."
                            : "Kirim Pesan"
                        }

                    </button>

                </form>

            </div>

        </div>

    );
};


export default ContactForm;