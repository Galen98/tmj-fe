import {
    useEffect,
    useState,
} from "react";

import City from "./City";

import {
    getCities,
} from "../api/homeApi";


const DestinationSection = () => {

    /*
     * =========================================
     * STATE
     * =========================================
     */

    const [cities, setCities] =
        useState([]);

    const [isLoading, setIsLoading] =
        useState(true);


    /*
     * =========================================
     * GET CITIES
     * =========================================
     */

    useEffect(() => {

        const fetchCities = async () => {

            try {

                setIsLoading(true);

                const data =
                    await getCities();

                setCities(data);

            } catch (error) {

                console.error(
                    "Gagal mengambil cities:",
                    error
                );

                setCities([]);

            } finally {

                setIsLoading(false);

            }

        };


        fetchCities();

    }, []);


    /*
     * =========================================
     * VIEW
     * =========================================
     */

    return (

        <div className="poi-section bg-white p-4 rounded mb-5">


            {/* HEADER */}

            <div className="section-header mb-5">

                <h3 className="section-title">
                    Temukan Destinasi Favoritmu
                </h3>

                <div className="section-underline"></div>

            </div>


            {/* LOADING */}

            {isLoading ? (

                <div className="text-center py-5 text-muted">

                    Memuat destinasi...

                </div>

            ) : cities.length > 0 ? (

                /*
                 * =================================
                 * CITY LIST
                 * =================================
                 */

                <div className="row">

                    {cities.map((city) => (

                        <div
                            className="col-12 col-md-6 col-lg-4"
                            key={city.id}
                        >

                            <City
                                name={city.name}
                                image={city.image}
                                slug={city.slug}
                            />

                        </div>

                    ))}

                </div>

            ) : (

                /*
                 * =================================
                 * EMPTY
                 * =================================
                 */

                <div className="text-center py-5 text-muted">

                    Belum ada destinasi tersedia.

                </div>

            )}

        </div>

    );

};


export default DestinationSection;