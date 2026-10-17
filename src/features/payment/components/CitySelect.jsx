
import {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    getProvinces,
    getRegencies,
} from "../api/wilayahApi";

export default function CitySelect({
    value = "",
    onChange,
    disabled = false,
    error,
    provinceError
}) {

    /*
     * =========================================
     * STATE
     * =========================================
     */

    const [provinces, setProvinces] = useState([]);

    const [regencies, setRegencies] = useState([]);

    const [selectedProvince, setSelectedProvince] =
        useState("");

    const [isLoadingProvince, setIsLoadingProvince] =
        useState(true);

    const [isLoadingCity, setIsLoadingCity] =
        useState(false);

    const [provinceApiError, setProvinceApiError] =
        useState("");

    const [cityApiError, setCityApiError] =
        useState("");

    const requestIdRef = useRef(0);

    /*
     * =========================================
     * LOAD PROVINCES
     * =========================================
     */

    useEffect(() => {

        let isActive = true;

        const loadProvinces = async () => {

            try {

                const data = await getProvinces();

                if (!isActive) return;

                setProvinces(data);

                setProvinceApiError("");

            } catch (error) {

                if (!isActive) return;

                console.error(
                    "Gagal mengambil provinsi:",
                    error
                );

                setProvinceApiError(
                    error.message ||
                    "Gagal memuat data provinsi."
                );

            } finally {

                if (isActive) {
                    setIsLoadingProvince(false);
                }

            }

        };

        loadProvinces();

        return () => {
            isActive = false;
        };

    }, []);

    /*
     * =========================================
     * CHANGE PROVINCE
     * =========================================
     */

    const handleProvinceChange = async (e) => {

        const provinceCode = e.target.value;

        const requestId = ++requestIdRef.current;

        const province = provinces.find(
            (item) =>
                String(item.code) === String(provinceCode)
        );

        setSelectedProvince(provinceCode);

        setRegencies([]);

        setCityApiError("");

        setIsLoadingCity(Boolean(provinceCode));

        /*
         * Simpan nama provinsi ke FormIdentity
         */

        onChange?.({
            target: {
                name: "asalProvinsi",
                value: province?.name || "",
            },
        });

        /*
         * Reset asal kota ketika provinsi berubah
         */

        onChange?.({
            target: {
                name: "asalKota",
                value: "",
            },
        });

        if (!provinceCode) {
            return;
        }

        try {

            const data = await getRegencies(
                provinceCode
            );

            /*
             * Abaikan hasil request lama
             */

            if (requestId !== requestIdRef.current) {
                return;
            }

            setRegencies(data);

        } catch (error) {

            if (requestId !== requestIdRef.current) {
                return;
            }

            console.error(
                "Gagal mengambil kota/kabupaten:",
                error
            );

            setCityApiError(
                error.message ||
                "Gagal memuat data kota/kabupaten."
            );

        } finally {

            if (requestId === requestIdRef.current) {
                setIsLoadingCity(false);
            }

        }

    };

    /*
     * =========================================
     * CHANGE CITY
     * =========================================
     */

    const handleCityChange = (e) => {

        onChange?.({
            target: {
                name: "asalKota",
                value: e.target.value,
            },
        });

    };

    /*
     * =========================================
     * RENDER
     * =========================================
     */

    return (
        <>

            {/* PROVINCE */}

            <div className="payment-identity__field">

                <label htmlFor="asalProvinsi">
                    Provinsi <span>*</span>
                </label>

                <select
                    id="asalProvinsi"
                    name="asalProvinsi"
                    value={selectedProvince}
                    onChange={handleProvinceChange}
                    disabled={
                        disabled ||
                        isLoadingProvince
                    }
                >

                    <option value="">
                        {isLoadingProvince
                            ? "Memuat provinsi..."
                            : "Pilih provinsi"}
                    </option>

                    {provinces.map((province) => (
                        <option
                            key={province.code}
                            value={province.code}
                        >
                            {province.name}
                        </option>
                    ))}

                </select>

                {provinceError && (
                    <small className="tmj-payment-field-error">
                        {provinceError}
                    </small>
                )}

                {provinceApiError && (
                    <small className="tmj-payment-field-error">
                        {provinceApiError}
                    </small>
                )}

            </div>

            {/* CITY / REGENCY */}

            <div className="payment-identity__field">

                <label htmlFor="asalKota">
                    Asal Kota <span>*</span>
                </label>

                <select
                    id="asalKota"
                    name="asalKota"
                    value={value}
                    onChange={handleCityChange}
                    disabled={
                        disabled ||
                        !selectedProvince ||
                        isLoadingCity
                    }
                >

                    <option value="">
                        {isLoadingCity
                            ? "Memuat kota/kabupaten..."
                            : !selectedProvince
                                ? "Pilih provinsi terlebih dahulu"
                                : "Pilih kota/kabupaten"}
                    </option>

                    {regencies.map((city) => (
                        <option
                            key={city.code}
                            value={city.name}
                        >
                            {city.name}
                        </option>
                    ))}

                </select>

                {error && (
                    <small className="tmj-payment-field-error">
                        {error}
                    </small>
                )}

                {cityApiError && (
                    <small className="tmj-payment-field-error">
                        {cityApiError}
                    </small>
                )}

            </div>

        </>
    );
}