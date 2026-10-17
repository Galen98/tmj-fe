const API_URL = import.meta.env.VITE_API_URL;

export const subscribeEmail = async (email) => {
    const response = await fetch(
        `${API_URL}/email-customers`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },

            body: JSON.stringify({
                email,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Gagal melakukan pendaftaran email."
        );
    }

    return data;
};