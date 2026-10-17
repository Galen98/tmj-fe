const API_BASE_URL =
    import.meta.env.VITE_API_URL;


export const createUserToken =
    async () => {

        const response =
            await fetch(
                `${API_BASE_URL}/user-token`,
                {
                    method: "POST",

                    headers: {
                        Accept:
                            "application/json",

                        "Content-Type":
                            "application/json",
                    },
                }
            );


        if (!response.ok) {

            throw new Error(
                `Gagal membuat user token. Status: ${response.status}`
            );

        }


        const result =
            await response.json();


        if (
            !result.success ||
            !result.data?.userToken
        ) {

            throw new Error(
                "User token tidak tersedia."
            );

        }


        return result.data.userToken;
    };