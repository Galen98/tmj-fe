import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function HorizonCard({
    image,
    title,
    duration,
    rating,
    review,
    price,
    tipe,
    jumlahPeserta,
    to,
}) {
    return (
        <Link
            to={to}
            className="horizon-card text-decoration-none"
        >
            <img
                src={image}
                alt={title}
                className="horizon-image"
            />

            <div className="horizon-content">
                <div className="horizon-left">
                    {/* <small>{category}</small> */}

                    <h4>{title}</h4>

                    <p>
                        {duration}
                        {/* {pickup && ` • ${pickup}`} */}
                    </p>
                </div>

                <div className="horizon-right">
                    <div className="horizon-rating">
                        <span>{Number(rating ?? 0).toFixed(1)}</span>

                        <FontAwesomeIcon icon={faStar} />

                        <span className="review">
                            ({review})
                        </span>
                    </div>

                    <small>Dari</small>

                    <h3>
                        IDR {price.toLocaleString("id-ID")}
                    </h3>

                    {tipe === "group" ? (
                        <>
                            <small className="horizon-price-unit">
                                per mobil
                            </small>

                            {jumlahPeserta && (
                                <small className="horizon-capacity">
                                    up to {jumlahPeserta} orang
                                </small>
                            )}
                        </>
                    ) : (
                        <small className="horizon-price-unit">
                            per orang
                        </small>
                    )}
                </div>
            </div>
        </Link>
    );
}