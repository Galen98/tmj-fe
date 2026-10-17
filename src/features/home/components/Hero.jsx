import {
    useEffect,
    useState,
} from "react";

import {
    getBackgrounds,
} from "../api/homeApi";


const Hero = () => {

    /*
     * =========================================
     * STATE
     * =========================================
     */

    const [
        backgrounds,
        setBackgrounds,
    ] = useState([]);

    const [
        isLoadingBackgrounds,
        setIsLoadingBackgrounds,
    ] = useState(true);


    /*
     * =========================================
     * GET BACKGROUNDS
     * =========================================
     */

    useEffect(() => {

        const fetchBackgrounds =
            async () => {

                try {

                    setIsLoadingBackgrounds(
                        true
                    );


                    const data =
                        await getBackgrounds();


                    setBackgrounds(
                        data
                    );

                } catch (error) {

                    console.error(
                        "Gagal mengambil backgrounds:",
                        error
                    );


                    setBackgrounds([]);

                } finally {

                    setIsLoadingBackgrounds(
                        false
                    );

                }

            };


        fetchBackgrounds();

    }, []);


    /*
     * =========================================
     * VIEW
     * =========================================
     */

    return (

        <div className="container py-5 bg-white mt-mobile home-banner-section">

            <div className="row g-3">


                {/* ================================= */}
                {/* MAIN BANNER */}
                {/* ================================= */}

                <div className="col-lg-8">

                    <div className="banner-main">

                        {isLoadingBackgrounds ? (

                            <div className="banner-loading">
                                Memuat...
                            </div>

                        ) : backgrounds[0] ? (

                            <img
                                src={
                                    backgrounds[0].image
                                }
                                alt={
                                    backgrounds[0].name
                                }
                            />

                        ) : (

                            <div className="banner-empty">
                                Background belum tersedia
                            </div>

                        )}

                    </div>

                </div>


                {/* ================================= */}
                {/* SIDE BANNERS */}
                {/* ================================= */}

                <div className="col-lg-4">

                    <div className="banner-right">


                        {/* BANNER 2 */}

                        <div className="banner-side">

                            {isLoadingBackgrounds ? (

                                <div className="banner-loading">
                                    Memuat...
                                </div>

                            ) : backgrounds[1] ? (

                                <img
                                    src={
                                        backgrounds[1].image
                                    }
                                    alt={
                                        backgrounds[1].name
                                    }
                                />

                            ) : (

                                <div className="banner-empty">
                                    Background belum tersedia
                                </div>

                            )}

                        </div>


                        {/* BANNER 3 */}

                        <div className="banner-side">

                            {isLoadingBackgrounds ? (

                                <div className="banner-loading">
                                    Memuat...
                                </div>

                            ) : backgrounds[2] ? (

                                <img
                                    src={
                                        backgrounds[2].image
                                    }
                                    alt={
                                        backgrounds[2].name
                                    }
                                />

                            ) : (

                                <div className="banner-empty">
                                    Background belum tersedia
                                </div>

                            )}

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};


export default Hero;