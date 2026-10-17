const API_BASE_URL =
    import.meta.env.VITE_API_URL;


export const trackPageView =
    async ({
        path,
        userToken,
        travelId = null,
    }) => {

        const response =
            await fetch(
                `${API_BASE_URL}/analytics/page-view`,
                {
                    method: "POST",

                    headers: {
                        Accept:
                            "application/json",

                        "Content-Type":
                            "application/json",

                        "X-User-Token":
                            userToken,
                    },

                    body:
                        JSON.stringify({
                            path,
                            travel_id:
                                travelId,
                        }),
                }
            );


        if (!response.ok) {

            throw new Error(
                `Gagal track analytics. Status: ${response.status}`
            );

        }


        return response.json();
    };