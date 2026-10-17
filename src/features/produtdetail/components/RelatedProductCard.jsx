import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function RelatedProductCard({
    product,
}) {
    const priceUnit =
        product.tipe === "group"
            ? product.jumlahPeserta
                ? `Mobil · Hingga ${product.jumlahPeserta} orang`
                : "Mobil"
            : "Orang";

    return (
        <div className="related-product-card">

            <Link
                to={`/travels/${product.slug}`}
                className="related-product-card__link"
            >

                {/* IMAGE */}
                <div className="related-product-card__image">

                    <img
                        src={product.image}
                        alt={product.name}
                    />

                </div>

                <div className="related-product-card__body">

                    {/* TITLE */}
                    <h3 className="related-product-card__name">
                        {product.name}
                    </h3>

                    {product.duration && (
                        <div className="related-product-card__info">
                            <span>
                                {product.duration}
                            </span>
                        </div>
                    )}

                    <div className="related-product-card__price">
                        {product.is_discount &&
                            product.oldPrice > 0 && (
                                <div className="related-product-card__old-price">
                                    Dari{" "}
                                    <del>
                                        IDR{" "}
                                        {product.oldPrice.toLocaleString(
                                            "id-ID"
                                        )}
                                    </del>
                                </div>
                            )}

                        <div className="related-product-card__current-price">

                            <strong>
                                Rp.{" "}
                                {product.price.toLocaleString(
                                    "id-ID"
                                )}
                            </strong>

                            <small>
                                / {priceUnit}
                            </small>

                        </div>

                    </div>


                    {/* RATING */}
                    <div className="related-product-card__rating">

                        <FontAwesomeIcon
                            icon={faStar}
                        />

                        <strong>
                            {product.rating}
                        </strong>

                        <span>
                            ({product.totalRating})
                        </span>

                    </div>

                </div>

            </Link>

        </div>
    );
}