import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  getTags,
} from "../features/home/api/homeApi";



export default function Footer() {

  /*
   * =========================================
   * STATE
   * =========================================
   */

  const [tags, setTags] =
    useState([]);

  const [isLoadingTags, setIsLoadingTags] =
    useState(true);


  /*
   * =========================================
   * GET TAGS
   * =========================================
   */

  useEffect(() => {

    const fetchTags = async () => {

      try {

        setIsLoadingTags(true);

        const data =
          await getTags();

        setTags(data);

      } catch (error) {

        console.error(
          "Gagal mengambil tags footer:",
          error
        );

        setTags([]);

      } finally {

        setIsLoadingTags(false);

      }

    };


    fetchTags();

  }, []);


  /*
   * =========================================
   * BUILD TAG URL
   * =========================================
   */

  const getTagUrl = (tag) => {

    /*
     * Korporasi punya halaman sendiri.
     */

    if (tag.slug === "korporasi") {
      return "/korporasi";
    }


    /*
     * Tag lainnya masuk recommendations.
     */

    return `/recommendations?filter=${encodeURIComponent(
      tag.slug
    )}`;

  };


  return (

    <footer className="pt-5">
      <div className="container">

        <div className="row">


          {/* ================================= */}
          {/* CUSTOMER SERVICE */}
          {/* ================================= */}

          <div className="col-6 col-md-4 col-lg-3 mb-4">

            <h6 className="fw-bold">
              Customer Service
            </h6>

            <ul className="list-unstyled">

              <li>

                <Link
                  to="/help-center"
                  className="text-muted text-decoration-none"
                >
                  Pusat Bantuan
                </Link>

              </li>


              <li>

                <Link
                  to="/status-booking"
                  className="text-muted text-decoration-none"
                >
                  Cek Status Booking
                </Link>

              </li>

            </ul>

          </div>


          {/* ================================= */}
          {/* ABOUT */}
          {/* ================================= */}

          <div className="col-6 col-md-4 col-lg-3 mb-4">

            <h6 className="fw-bold">
              About
            </h6>

            <ul className="list-unstyled">

              <li>

                <Link
                  to="/about-us"
                  className="text-muted text-decoration-none"
                >
                  Tentang Kami
                </Link>

              </li>


              <li>

                <Link
                  to="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted text-decoration-none"
                >
                  Kebijakan & Privasi
                </Link>

              </li>


              <li>

                <Link
                  to="/terms-condition"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted text-decoration-none"
                >
                  Syarat & Ketentuan
                </Link>

              </li>

            </ul>

          </div>


          {/* ================================= */}
          {/* CATEGORIES / TAGS */}
          {/* ================================= */}

          <div className="col-6 col-md-4 col-lg-3 mb-4">

            <h6 className="fw-bold">
              Categories
            </h6>


            <ul className="list-unstyled">

              {isLoadingTags ? (

                <li>
                  <span className="text-muted">
                    Memuat...
                  </span>
                </li>

              ) : tags.length > 0 ? (

                tags.map((tag) => (

                  <li key={tag.id}>

                    <a
                      href={getTagUrl(tag)}
                      className="text-muted text-decoration-none"
                    >
                      {tag.name}
                    </a>

                  </li>

                ))

              ) : (

                <li>

                  <span className="text-muted">
                    Belum ada kategori
                  </span>

                </li>

              )}

            </ul>

          </div>


          {/* ================================= */}
          {/* PAYMENT PARTNER */}
          {/* ================================= */}

          <div className="col-12 col-md-6 col-lg-3 mb-4">

            <h6 className="fw-bold mb-3">
              Partner Pembayaran
            </h6>


            <div className="row g-2">

              <div className="col-3">

                <div className="payment-box">

                  <img
                    src="/src/assets/images/visa.webp"
                    alt="visa"
                  />

                </div>

              </div>


              <div className="col-3">

                <div className="payment-box">

                  <img
                    src="/src/assets/images/mastercard.webp"
                    alt="mastercard"
                  />

                </div>

              </div>


              <div className="col-3">

                <div className="payment-box">

                  <img
                    src="/src/assets/images/bca.webp"
                    alt="bca"
                  />

                </div>

              </div>


              <div className="col-3">

                <div className="payment-box">

                  <img
                    src="/src/assets/images/mandiri.webp"
                    alt="mandiri"
                  />

                </div>

              </div>


              <div className="col-3">

                <div className="payment-box">

                  <img
                    src="/src/assets/images/bri.webp"
                    alt="bri"
                  />

                </div>

              </div>


              <div className="col-3">

                <div className="payment-box">

                  <img
                    src="/src/assets/images/bni.webp"
                    alt="bni"
                  />

                </div>

              </div>


              <div className="col-3">

                <div className="payment-box">

                  <img
                    src="/src/assets/images/gopay.webp"
                    alt="gopay"
                  />

                </div>

              </div>


              <div className="col-3">

                <div className="payment-box">

                  <img
                    src="/src/assets/images/ovo.webp"
                    alt="ovo"
                  />

                </div>

              </div>


              <div className="col-3">

                <div className="payment-box">

                  <img
                    src="/src/assets/images/indomaret.webp"
                    alt="indomaret"
                  />

                </div>

              </div>


              <div className="col-3">

                <div className="payment-box">

                  <img
                    src="/src/assets/images/alfamart.webp"
                    alt="alfamart"
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* ================================= */}
      {/* BOTTOM */}
      {/* ================================= */}

      <div className="border-top py-3 mt-3">

        <div className="container text-center">

          <small className="text-muted">

            © {new Date().getFullYear()} Travel Murah Jogja.
            All rights reserved.

          </small>

        </div>

      </div>

    </footer>

  );
}