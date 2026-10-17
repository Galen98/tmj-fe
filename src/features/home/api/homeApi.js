const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getTags = async () => {

    const response =
        await fetch(
            `${API_BASE_URL}/tags`,
            {
                headers: {
                    Accept:
                        "application/json",
                },
            }
        );


    if (!response.ok) {

        throw new Error(
            `Gagal mengambil tags. Status: ${response.status}`
        );

    }


    const result =
        await response.json();


    if (!result.success) {

        throw new Error(
            "API gagal mengambil data tags."
        );

    }


    return result.data || [];
};


export const getBackgrounds = async () => {

    const response = await fetch(
        `${API_BASE_URL}/backgrounds`,
        {
            headers: {
                Accept: "application/json",
            },
        }
    );

    if (!response.ok) {
        throw new Error(
            `Gagal mengambil backgrounds. Status: ${response.status}`
        );
    }

    const result =
        await response.json();

    if (!result.success) {
        throw new Error(
            "API gagal mengambil data backgrounds."
        );
    }

    return result.data || [];
};

export const getVouchers = async () => {

    const response = await fetch(
        `${API_BASE_URL}/vouchers`,
        {
            headers: {
                Accept: "application/json",
            },
        }
    );

    if (!response.ok) {
        throw new Error(
            `Gagal mengambil vouchers. Status: ${response.status}`
        );
    }

    const result =
        await response.json();

    if (!result.success) {
        throw new Error(
            "API gagal mengambil data vouchers."
        );
    }

    return result.data || [];
};

export const getCities = async () => {

    const response = await fetch(
        `${API_BASE_URL}/cities`,
        {
            headers: {
                Accept: "application/json",
            },
        }
    );

    if (!response.ok) {
        throw new Error(
            `Gagal mengambil cities. Status: ${response.status}`
        );
    }

    const result =
        await response.json();

    if (!result.success) {
        throw new Error(
            "API gagal mengambil data cities."
        );
    }

    return result.data || [];
};

export const getPointOfInterests = async () => {

    const response = await fetch(
        `${API_BASE_URL}/point-of-interests`,
        {
            headers: {
                Accept: "application/json",
            },
        }
    );

    if (!response.ok) {
        throw new Error(
            `Gagal mengambil point of interests. Status: ${response.status}`
        );
    }

    const result =
        await response.json();

    if (!result.success) {
        throw new Error(
            "API gagal mengambil data point of interests."
        );
    }

    return result.data || [];
};

export const getProducts = async () => {
    const response = await fetch(
        `${API_BASE_URL}/travels?page=1`
    );

    if (!response.ok) {
        throw new Error(
            "Gagal mengambil travel"
        );
    }

    const result = await response.json();

    return result.data;
};