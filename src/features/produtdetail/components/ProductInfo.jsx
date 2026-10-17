import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faStar,
    // faUsers,
    faHeart,
} from "@fortawesome/free-solid-svg-icons";

import {
    MapPin,
    ClockFading,
    UserGroup,
} from "lucide-react";


export default function ProductInfo({
    product,
    isFavorite,
    onFavorite,
}) {

    /*
     * =========================================
     * FORMAT PRICE
     * =========================================
     */

    const formatPrice = (price) => {

        if (!price) {
            return "0";
        }

        return new Intl.NumberFormat(
            "id-ID"
        ).format(price);

    };


    /*
     * =========================================
     * PRODUCT TYPE
     * =========================================
     */

    const isGroup =
        product.tipe === "group";

    const priceLabel =
        isGroup
            ? "/ Per Mobil"
            : "/ Per Orang";


    return (

        <div className="product-detail-info">


            {/* ================================= */}
            {/* PRICE */}
            {/* ================================= */}

            <div className="product-detail-price">

                {product.is_discount &&
                    product.price_discount >
                        product.price_now && (

                    <div className="product-detail-price__old">

                        Rp.{" "}
                        {formatPrice(
                            product.price_discount
                        )}

                    </div>

                )}


                <div className="product-detail-price__current">

                    <span className="product-detail-price__currency">
                        Rp.
                    </span>

                    <strong>
                        {formatPrice(
                            product.price_now
                        )}
                    </strong>

                    <span className="product-detail-price__type">
                        {priceLabel}
                    </span>

                </div>


                {/* GROUP CAPACITY */}

                {isGroup &&
                    product.jumlahPeserta && (

                    <div className="product-detail-price__capacity">

                        <UserGroup
                            size={20}
                            strokeWidth={2}
                        />

                        <span>
                            Hingga{" "}
                            {product.jumlahPeserta}{" "}
                            orang
                        </span>

                    </div>

                )}

            </div>


            {/* ================================= */}
            {/* PRODUCT HEADER */}
            {/* ================================= */}

            <div className="product-detail-info__head">

                <div className="product-detail-info__title">

                    <h1>
                        {product.travel_name}
                    </h1>

                    {product.short_description && (

                         <p className="d-none d-md-block">
                            {product.short_description}
                        </p>

                    )}

                </div>


                <button
                    type="button"
                    className={`product-favorite ${
                        isFavorite
                            ? "active"
                            : ""
                    }`}
                    onClick={onFavorite}
                    aria-label="Favorit"
                >

                    <FontAwesomeIcon
                        icon={faHeart}
                    />

                </button>

            </div>
            

            {/* ================================= */}
            {/* META */}
            {/* ================================= */}

            <div className="product-detail-info__meta">


                {/* RATING */}

                <div className="product-detail-info__rating">

                    <FontAwesomeIcon
                        icon={faStar}
                    />

                    <strong>
                        Rating {Number(product.rating ?? 0).toFixed(1)}
                    </strong>

                    <span
                        className="product-review-link"
                        onClick={() => {
                            document
                                .getElementById("product-reviews")
                                ?.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start",
                                });
                        }}
                    >
                        ({product.total_rating} ulasan)
                    </span>

                </div>


                {/* DURATION */}

                <div className="product-detail-info__duration">

                    <ClockFading
                        size={17}
                        strokeWidth={2}
                    />
                    <strong>  Durasi </strong>
                    <span>
                        {product.durasi}{" "}
                        {product.satuan_durasi}
                    </span>

                </div>

            </div>


            {/* ================================= */}
            {/* PICKUP */}
            {/* ================================= */}

            {product.is_pickup && (

                <div className="product-pickup-info">

                    <div className="product-pickup-info__icon">

                        <MapPin
                            size={20}
                            strokeWidth={2}
                        />

                    </div>


                    <div className="product-pickup-info__content">

                        <strong>
                            Lokasi Penjemputan
                        </strong>

                        {product.pickup_venue && (

                            <span>
                                {product.pickup_venue}
                            </span>

                        )}

                    </div>

                </div>

            )}

        </div>

    );

}