import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faUsers } from "@fortawesome/free-solid-svg-icons";


export default function ProductCard({ product }) {

  /*
   * =========================================
   * PRODUCT TYPE
   * =========================================
   */

  const isGroup =
    product.is_group === true ||
    product.is_group === 1 ||
    product.is_group === "1" ||
    product.tipe === "group";

  const jumlahPeserta = Number(
    product.jumlahPeserta ?? 0
  );

  /*
   * =========================================
   * PRICE UNIT
   * =========================================
   */

  const priceUnit = isGroup ? "Mobil" : "Orang";

  /*
   * =========================================
   * PRICE FORMAT
   * =========================================
   */

  const formatPrice = (value) => {
    return Number(value ?? 0).toLocaleString("id-ID");
  };

  /*
   * =========================================
   * RATING
   * =========================================
   */

  const rating = Number(product.rating ?? 0);
  const totalRating = Number(product.totalRating ?? 0);

  /*
   * =========================================
   * VIEW
   * =========================================
   */

  return (
    <div className="col-6 col-md-4 col-lg-2-4">
      <Link
        to={`/travels/${product.slug}`}
        className="text-decoration-none text-dark"
      >
        <div className="home-product-item">

          {/* ================================= */}
          {/* PRODUCT IMAGE */}
          {/* ================================= */}

          <div
            className="home-product-item__img"
            style={{
              backgroundImage: `url(${product.image1})`,
            }}
          />

          {/* ================================= */}
          {/* PRODUCT NAME */}
          {/* ================================= */}

          <h4 className="home-product-item__name">
            {product.name}
          </h4>

          {/* ================================= */}
          {/* PRODUCT PRICE */}
          {/* ================================= */}

          <div className="home-product-item__price">

            {product.is_discount &&
              Number(product.oldPrice) > 0 && (
                <span className="home-product-item__price-old">
                  Rp. {formatPrice(product.oldPrice)} / {priceUnit}
                </span>
              )}

            <span className="home-product-item__price-current">
              Rp. {formatPrice(product.price)}
              <span className="home-product-item__price-unit">
                {" "}/ {priceUnit}
              </span>
            </span>

            {isGroup && jumlahPeserta > 0 && (
              <div className="home-product-item__capacity">
                <FontAwesomeIcon icon={faUsers} />
                <span>
                  Maks. {jumlahPeserta} orang
                </span>
              </div>
            )}

          </div>

          {/* ================================= */}
          {/* PRODUCT RATING */}
          {/* ================================= */}

          <div className="home-product-item__action">

            <div className="home-product-item__rating">

              {[...Array(5)].map((_, i) => (

                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  className={
                    i < rating
                      ? "home-product-item__star--gold"
                      : ""
                  }
                />

              ))}

            </div>

            <span className="home-product-item__sold">
              {totalRating} Rating
            </span>

          </div>

          {/* ================================= */}
          {/* PRODUCT LOCATION */}
          {/* ================================= */}

          <div className="home-product-item__origin">

            <span className="home-product-item__brand">
              {product.location}
            </span>

            <span className="home-product-item__origin-name">
              {product.category}
            </span>

          </div>

        </div>
      </Link>
    </div>
  );
}