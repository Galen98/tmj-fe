const BASE_URL =
    import.meta.env.VITE_API_URL;


/*
 * =========================================
 * SUBMIT CONTACT
 * =========================================
 */

export async function submitContactApi(data) {

    const response =
        await fetch(
            `${BASE_URL}/contact-us`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json",

                    Accept:
                        "application/json",
                },

                body:
                    JSON.stringify({
                        name:
                            data.name,

                        email:
                            data.email,

                        message:
                            data.message,
                    }),
            }
        );


    const result =
        await response.json();


    if (!response.ok) {

        throw {
            status:
                response.status,

            message:
                result.message ||
                "Gagal mengirim pesan.",

            errors:
                result.errors || {},
        };

    }


    return result;
}