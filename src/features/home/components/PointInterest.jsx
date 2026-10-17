import {
    useEffect,
    useState,
} from "react";

import {
    Link,
} from "react-router-dom";

import {
    getPointOfInterests,
} from "../api/homeApi";


export default function PointOfInterest() {

    const [pois, setPois] =
        useState([]);

    const [isLoading, setIsLoading] =
        useState(true);


    /*
     * =========================================
     * GET POINT OF INTERESTS
     * =========================================
     */

    useEffect(() => {

        const fetchPointOfInterests =
            async () => {

                try {

                    setIsLoading(true);

                    const data =
                        await getPointOfInterests();

                    setPois(data);

                } catch (error) {

                    console.error(
                        "Gagal mengambil point of interests:",
                        error
                    );

                    setPois([]);

                } finally {

                    setIsLoading(false);

                }

            };


        fetchPointOfInterests();

    }, []);


    return (

        <div className="poi-section bg-white p-4 rounded mb-5">

            {/* HEADER */}

            <div className="section-header mb-5">

                <h3 className="section-title">
                    Point Of Interest
                </h3>

                <div className="section-underline"></div>

            </div>


            {/* CONTENT */}

            {isLoading ? (

                <div className="text-center py-5 text-muted">
                    Memuat point of interest...
                </div>

            ) : pois.length > 0 ? (

                <div className="poi-slider">

                    {pois.map((item) => (

                        <div
                            className="poi-slider__item"
                            key={item.id}
                        >

                            <Link
                                to={`/point-of-interest/${item.citySlug}/${item.slug}`}
                                className="text-decoration-none text-dark"
                            >

                                <div className="poi-card">

                                    <div className="poi-image-wrapper">

                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="poi-image"
                                            loading="lazy"
                                        />

                                    </div>


                                    <div className="poi-content">

                                        <h5>
                                            {item.name}
                                        </h5>

                                        <p>
                                            {item.cityName}
                                        </p>

                                    </div>

                                </div>

                            </Link>

                        </div>

                    ))}

                </div>

            ) : (

                <div className="text-center py-5 text-muted">
                    Belum ada point of interest tersedia.
                </div>

            )}

        </div>

    );
}