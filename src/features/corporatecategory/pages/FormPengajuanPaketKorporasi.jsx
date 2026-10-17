import { useState } from "react";

import useFormPengajuanPaketKorporasiStore
    from "../store/useFormPengajuanPaketKorporasiStore";

import Confirm
    from "../../../components/alert/Confirm";

import Success
    from "../../../components/alert/Success";

import Failed
    from "../../../components/alert/Failed";


export default function FormPengajuanPaketKorporasi() {

    /*
     * =========================================
     * STATE
     * =========================================
     */

    const [form, setForm] = useState({
        companyName: "",
        whatsapp: "",
        email: "",
        jumlahHari: "",
        participantCount: "",
        addHotel: "",
        lokasiStart: "",
    });


    const [errors, setErrors] =
        useState({});


    const {
        submitForm,
        isLoading,
    } = useFormPengajuanPaketKorporasiStore();


    /*
     * =========================================
     * HANDLE CHANGE
     * =========================================
     */

    const handleChange = (e) => {

        const {
            name,
            value,
        } = e.target;


        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));


        /*
         * Hapus error field ketika
         * user mulai mengubah input.
         */

        if (errors[name]) {

            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));

        }

    };


    /*
     * =========================================
     * VALIDATION
     * =========================================
     */

    const validate = () => {

        const newErrors = {};


        /*
         * COMPANY NAME
         */

        if (!form.companyName.trim()) {

            newErrors.companyName =
                "Nama perusahaan wajib diisi.";

        }


        /*
         * WHATSAPP
         */

        if (!form.whatsapp.trim()) {

            newErrors.whatsapp =
                "Nomor WhatsApp wajib diisi.";

        } else {

            const whatsappRegex =
                /^[0-9+\-\s]+$/;


            if (
                !whatsappRegex.test(
                    form.whatsapp
                )
            ) {

                newErrors.whatsapp =
                    "Format nomor WhatsApp tidak valid.";

            }

        }


        /*
         * EMAIL
         */

        if (!form.email.trim()) {

            newErrors.email =
                "Email wajib diisi.";

        } else {

            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailRegex.test(
                    form.email
                )
            ) {

                newErrors.email =
                    "Format email tidak valid.";

            }

        }


        /*
         * JUMLAH HARI
         */

        if (!form.jumlahHari) {

            newErrors.jumlahHari =
                "Jumlah hari wajib diisi.";

        } else if (
            Number(form.jumlahHari) < 1
        ) {

            newErrors.jumlahHari =
                "Jumlah hari minimal 1 hari.";

        }


        /*
         * JUMLAH PESERTA
         */

        if (!form.participantCount) {

            newErrors.participantCount =
                "Jumlah peserta wajib diisi.";

        } else if (
            Number(form.participantCount) < 1
        ) {

            newErrors.participantCount =
                "Jumlah peserta minimal 1 orang.";

        }


        /*
         * HOTEL
         */

        if (!form.addHotel) {

            newErrors.addHotel =
                "Silakan pilih kebutuhan hotel.";

        }


        /*
         * LOKASI START
         */

        if (!form.lokasiStart.trim()) {

            newErrors.lokasiStart =
                "Lokasi keberangkatan wajib diisi.";

        }


        setErrors(newErrors);


        return (
            Object.keys(newErrors).length === 0
        );

    };


    /*
     * =========================================
     * SUBMIT
     * =========================================
     */

    const handleSubmit = async (e) => {

        e.preventDefault();


        /*
         * Validasi frontend
         */

        if (!validate()) {
            return;
        }


        /*
         * Konfirmasi sebelum submit
         */

        const result = await Confirm({

            title:
                "Kirim pengajuan?",

            text:
                "Pastikan data pengajuan paket korporasi sudah benar.",

            confirmButtonText:
                "Ya, Kirim",

            cancelButtonText:
                "Periksa Lagi",

        });


        if (!result.isConfirmed) {
            return;
        }


        /*
         * Submit API
         */

        try {

            await submitForm(form);


            /*
             * Success alert
             */

            await Success({

                title:
                    "Pengajuan Berhasil",

                text:
                    "Permintaan Anda telah kami terima. Admin kami akan segera menghubungi Anda melalui email atau WhatsApp.",

                confirmButtonText:
                    "OK",

            });


            /*
             * Reset form
             */

            setForm({
                companyName: "",
                whatsapp: "",
                email: "",
                jumlahHari: "",
                participantCount: "",
                addHotel: "",
                lokasiStart: "",
            });


            setErrors({});


        } catch (error) {

            /*
             * API / Server Error
             */

            await Failed({

                title:
                    "Pengajuan Gagal",

                text:
                    error.response
                        ?.data
                        ?.message ||
                    "Terjadi kesalahan saat mengirim pengajuan.",

                confirmButtonText:
                    "OK",

            });

        }

    };


    /*
     * =========================================
     * VIEW
     * =========================================
     */

    return (

        <div className="corporate-form">

            {/* HEADER */}

            <div className="corporate-form__header">

                <h1>
                    Ajukan Paket Korporasi
                </h1>

                <p>
                    Sampaikan kebutuhan perjalanan perusahaan Anda.
                    Tim kami akan membantu menyiapkan paket yang sesuai.
                </p>

            </div>


            {/* FORM */}

            <form onSubmit={handleSubmit}>

                <div className="corporate-form__section">

                    <h2>
                        Informasi Pengajuan
                    </h2>


                    <div className="corporate-form__grid">


                        {/* ========================= */}
                        {/* NAMA PERUSAHAAN */}
                        {/* ========================= */}

                        <div className="corporate-form__field">

                            <label>
                                Nama Perusahaan
                                <span>*</span>
                            </label>

                            <input
                                type="text"
                                name="companyName"
                                value={form.companyName}
                                onChange={handleChange}
                                placeholder="Contoh: PT Travel Indonesia"
                            />

                            {errors.companyName && (

                                <small>
                                    {errors.companyName}
                                </small>

                            )}

                        </div>


                        {/* ========================= */}
                        {/* WHATSAPP */}
                        {/* ========================= */}

                        <div className="corporate-form__field">

                            <label>
                                WhatsApp
                                <span>*</span>
                            </label>

                            <input
                                type="tel"
                                name="whatsapp"
                                value={form.whatsapp}
                                onChange={handleChange}
                                placeholder="Contoh: 081234567890"
                            />

                            {errors.whatsapp && (

                                <small>
                                    {errors.whatsapp}
                                </small>

                            )}

                        </div>


                        {/* ========================= */}
                        {/* EMAIL */}
                        {/* ========================= */}

                        <div className="corporate-form__field">

                            <label>
                                Email
                                <span>*</span>
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Contoh: nama@perusahaan.com"
                            />

                            {errors.email && (

                                <small>
                                    {errors.email}
                                </small>

                            )}

                        </div>


                        {/* ========================= */}
                        {/* JUMLAH HARI */}
                        {/* ========================= */}

                        <div className="corporate-form__field">

                            <label>
                                Berapa Hari Acaranya?
                                <span>*</span>
                            </label>

                            <input
                                type="number"
                                name="jumlahHari"
                                min="1"
                                value={form.jumlahHari}
                                onChange={handleChange}
                                placeholder="Contoh: 3"
                            />

                            {errors.jumlahHari && (

                                <small>
                                    {errors.jumlahHari}
                                </small>

                            )}

                        </div>


                        {/* ========================= */}
                        {/* JUMLAH PESERTA */}
                        {/* ========================= */}

                        <div className="corporate-form__field">

                            <label>
                                Berapa Orang Pesertanya?
                                <span>*</span>
                            </label>

                            <input
                                type="number"
                                name="participantCount"
                                min="1"
                                value={form.participantCount}
                                onChange={handleChange}
                                placeholder="Contoh: 30"
                            />

                            {errors.participantCount && (

                                <small>
                                    {errors.participantCount}
                                </small>

                            )}

                        </div>


                        {/* ========================= */}
                        {/* HOTEL */}
                        {/* ========================= */}

                        <div className="corporate-form__field">

                            <label>
                                Mau Include Hotel?
                                <span>*</span>
                            </label>

                            <select
                                name="addHotel"
                                value={form.addHotel}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Pilih
                                </option>

                                <option value="yes">
                                    Ya
                                </option>

                                <option value="no">
                                    Tidak
                                </option>

                            </select>

                            {errors.addHotel && (

                                <small>
                                    {errors.addHotel}
                                </small>

                            )}

                        </div>


                        {/* ========================= */}
                        {/* LOKASI START */}
                        {/* ========================= */}

                        <div className="corporate-form__field">

                            <label>
                                Mau Start dari Jogja atau dari Tempat Asal Anda?
                                <span>*</span>
                            </label>

                            <input
                                type="text"
                                name="lokasiStart"
                                value={form.lokasiStart}
                                onChange={handleChange}
                                placeholder="Contoh: Jogja / Jakarta / Semarang"
                            />

                            {errors.lokasiStart && (

                                <small>
                                    {errors.lokasiStart}
                                </small>

                            )}

                        </div>

                    </div>

                </div>


                {/* ========================= */}
                {/* FOOTER */}
                {/* ========================= */}

                <div className="corporate-form__footer">

                    <p>
                        <span>*</span> Wajib diisi
                    </p>


                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isLoading}
                    >

                        {isLoading
                            ? "Mengirim..."
                            : "Minta Penawaran"}

                    </button>

                </div>

            </form>

        </div>

    );

}