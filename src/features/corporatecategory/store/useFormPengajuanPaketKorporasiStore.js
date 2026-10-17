import {
    create,
} from "zustand";

import {
    submitCorporateRequest,
} from "../api/corporateRequestApi";


const useFormPengajuanPaketKorporasiStore =
    create((set) => ({

        isLoading: false,

        error: null,


        submitForm: async (form) => {

            set({
                isLoading: true,
                error: null,
            });


            try {

                /*
                 * Mapping frontend field
                 * ke payload Laravel API.
                 */

                const payload = {

                    company_name:
                        form.companyName,

                    whatsapp:
                        form.whatsapp,

                    email:
                        form.email,

                    duration_days:
                        Number(
                            form.jumlahHari
                        ),

                    participant_count:
                        Number(
                            form.participantCount
                        ),

                    include_hotel:
                        form.addHotel === "yes",

                    departure_location:
                        form.lokasiStart,

                };


                const response =
                    await submitCorporateRequest(
                        payload
                    );


                return response;


            } catch (error) {

                set({
                    error:
                        error.response
                            ?.data
                            ?.message ||
                        error.message ||
                        "Terjadi kesalahan saat mengirim pengajuan.",
                });


                throw error;


            } finally {

                set({
                    isLoading: false,
                });

            }

        },

    }));


export default
    useFormPengajuanPaketKorporasiStore;