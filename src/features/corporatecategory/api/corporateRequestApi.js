const API_URL =
    import.meta.env.VITE_API_URL;


export const submitCorporateRequest =
    async (data) => {

        const response = await fetch(
            `${API_URL}/corporate-requests`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json",

                    "Accept":
                        "application/json",
                },

                body: JSON.stringify(data),
            }
        );


        const result =
            await response.json();


        if (!response.ok) {

            const error =
                new Error(
                    result.message ||
                    "Gagal mengirim pengajuan."
                );

            error.response = {
                status:
                    response.status,

                data:
                    result,
            };

            throw error;
        }


        return result;
    };