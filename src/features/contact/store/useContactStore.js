import { create } from "zustand";

import {
    submitContactApi,
} from "../api/contactApi";


const useContactStore =
    create((set) => ({

        /*
         * =========================================
         * STATE
         * =========================================
         */

        loading:
            false,

        error:
            null,

        validationErrors:
            {},

        success:
            false,


        /*
         * =========================================
         * SUBMIT CONTACT
         * =========================================
         */

        submitContact:
            async (form) => {

                set({
                    loading: true,
                    error: null,
                    validationErrors: {},
                    success: false,
                });


                try {

                    const response =
                        await submitContactApi(
                            form
                        );


                    set({
                        success: true,
                    });


                    return response;

                } catch (error) {

                    set({

                        error:
                            error.message ||
                            "Gagal mengirim pesan.",

                        validationErrors:
                            error.errors || {},

                    });


                    throw error;

                } finally {

                    set({
                        loading: false,
                    });

                }

            },


        /*
         * =========================================
         * RESET
         * =========================================
         */

        resetContactState:
            () => {

                set({
                    error: null,
                    validationErrors: {},
                    success: false,
                });

            },

    }));


export default useContactStore;