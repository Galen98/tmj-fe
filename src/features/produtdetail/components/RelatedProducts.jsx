import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import RelatedProductCard from "./RelatedProductCard";
import relatedProducts from "../data/relatedProducts.json";

export default function RelatedProducts({
    currentProductId,
}) {
    const products = relatedProducts
        .filter(
            (item) =>
                item.id !== currentProductId
        )
        .slice(0, 8);

    if (!products.length) {
        return null;
    }

    const desktopProducts =
        products.slice(0, 4);

    return (
        <section className="related-products">

            <h2 className="related-products__title">
                Anda mungkin juga menyukai..
            </h2>


            {/* =====================
                DESKTOP
            ====================== */}

            <div className="related-products__desktop">

                {desktopProducts.map(
                    (product) => (
                        <RelatedProductCard
                            key={product.id}
                            product={product}
                        />
                    )
                )}

            </div>


            {/* =====================
                MOBILE
            ====================== */}

            <div className="related-products__mobile">

                <Swiper
                    slidesPerView={1.15}
                    spaceBetween={16}
                    className="related-products__swiper"
                >
                    {products.map(
                        (product) => (
                            <SwiperSlide
                                key={product.id}
                            >
                                <RelatedProductCard
                                    product={product}
                                />
                            </SwiperSlide>
                        )
                    )}
                </Swiper>

            </div>

        </section>
    );
}