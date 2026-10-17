export const getParameterGlobal = async (name) => {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/parameter-global/${encodeURIComponent(name)}`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        }
    );

    if (!response.ok) {
        throw new Error(
            `Gagal mengambil parameter ${name}: ${response.status}`
        );
    }

    const result = await response.json();

    return result.data.value;
};