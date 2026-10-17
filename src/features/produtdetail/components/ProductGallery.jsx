import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export default function ProductGallery({
    product,
    onOpen,
}) {
    const images = [
        product.image1,
        product.image2,
        product.image3,
        product.image4,
        product.image5,
    ].filter(Boolean);

    if (!images.length) {
        return null;
    }

    return (
        <>
            {/* DESKTOP */}
            <div className="product-gallery product-gallery--desktop">

                <button
                    type="button"
                    className="product-gallery__main"
                    onClick={() => onOpen(images, 0)}
                >
                    <img
                        src={images[0]}
                        alt={product.travel_name}
                    />
                </button>

                <div className="product-gallery__side">
                    {images
                        .slice(1, 5)
                        .map((image, index) => (
                            <button
                                type="button"
                                key={image}
                                onClick={() =>
                                    onOpen(
                                        images,
                                        index + 1
                                    )
                                }
                            >
                                <img
                                    src={image}
                                    alt={`${product.travel_name} ${index + 2}`}
                                />
                            </button>
                        ))}
                </div>

            </div>


            {/* MOBILE */}
            <div className="product-gallery-mobile mb-4 ">

                <Swiper
                    modules={[Navigation]}
                    navigation={images.length > 1}
                    slidesPerView={1}
                    spaceBetween={0}
                    centeredSlides={false}
                    className="product-gallery-mobile__swiper"
                >

                    {images.map((image, index) => (
                        <SwiperSlide
                            key={`${image}-${index}`}
                        >
                            <button
                                type="button"
                                className="product-gallery-mobile__image"
                                onClick={() =>
                                    onOpen(
                                        images,
                                        index
                                    )
                                }
                            >
                                <img
                                    src={image}
                                    alt={`${product.travel_name} ${index + 1}`}
                                />
                            </button>
                        </SwiperSlide>
                    ))}

                </Swiper>

            </div>
        </>
    );
}