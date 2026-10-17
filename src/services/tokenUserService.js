import {
    createUserToken,
} from "../api/userTokenApi";


const USER_TOKEN_KEY =
    "userToken";


/*
 * =========================================
 * SHARED INITIALIZATION PROMISE
 * =========================================
 *
 * Menyimpan proses pembuatan token
 * yang sedang berjalan.
 */

let initializationPromise = null;


/*
 * =========================================
 * GET USER TOKEN
 * =========================================
 */

export const getUserToken = () => {

    return localStorage.getItem(
        USER_TOKEN_KEY
    );

};


/*
 * =========================================
 * INITIALIZE USER TOKEN
 * =========================================
 */

export const initializeUserToken =
    async () => {

        /*
         * Cek localStorage terlebih dahulu.
         */

        const existingToken =
            getUserToken();


        if (existingToken) {

            return existingToken;

        }


        /*
         * Kalau proses create token sedang
         * berjalan, gunakan Promise yang sama.
         *
         * Tidak request backend lagi.
         */

        if (initializationPromise) {

            return initializationPromise;

        }


        /*
         * Belum ada token dan belum ada
         * proses initialization.
         *
         * Baru request backend.
         */

        initializationPromise =
            createUserToken()
                .then((newToken) => {

                    localStorage.setItem(
                        USER_TOKEN_KEY,
                        newToken
                    );


                    return newToken;

                })
                .finally(() => {

                    /*
                     * Setelah selesai,
                     * reset Promise.
                     *
                     * Token selanjutnya akan
                     * dibaca dari localStorage.
                     */

                    initializationPromise =
                        null;

                });


        return initializationPromise;
    };