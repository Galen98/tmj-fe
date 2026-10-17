import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import LoadMore from "../../../components/LoadMore"; // sesuaikan path LoadMore punya kamu
// sesuaikan path LoadMore punya kamu


function ReviewCard({
    review,
    onOpenImages,
}) {
    const [expanded, setExpanded] =
        useState(false);

    const images = [
        review.image1,
        review.image2,
        review.image3,
        review.image4,
        review.image5,
    ].filter(Boolean);

    const isLong =
        review.description.length > 180;

    const description =
        expanded || !isLong
            ? review.description
            : `${review.description.slice(
                  0,
                  180
              )}...`;

    return (
        <div className="review-card">

            <div className="review-card__head">

                <strong>
                    {review.cust_name}

                    {review.asal_kota &&
                        ` - ${review.asal_kota}`}
                </strong>

                <div>
                    {[...Array(5)].map(
                        (_, index) => (
                            <FontAwesomeIcon
                                key={index}
                                icon={faStar}
                                className={
                                    index <
                                    review.rating
                                        ? "review-star-active"
                                        : ""
                                }
                            />
                        )
                    )}
                </div>

            </div>

            <small>
                {new Date(
                    review.created_at
                ).toLocaleDateString(
                    "id-ID",
                    {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    }
                )}
            </small>

            <p>
                {description}
            </p>

            {isLong && (
                <button
                    type="button"
                    className="review-read-more"
                    onClick={() =>
                        setExpanded(
                            (prev) => !prev
                        )
                    }
                >
                    {expanded
                        ? "Tampilkan lebih sedikit"
                        : "Baca selengkapnya"}
                </button>
            )}

            {images.length > 0 && (
                <div className="review-images">

                    {images
                        .slice(0, 2)
                        .map(
                            (
                                image,
                                index
                            ) => (
                                <button
                                    type="button"
                                    key={image}
                                    onClick={() =>
                                        onOpenImages(
                                            images,
                                            index
                                        )
                                    }
                                >
                                    <img
                                        src={image}
                                        alt=""
                                    />

                                    {index === 1 &&
                                        images.length >
                                            2 && (
                                            <span>
                                                +
                                                {images.length -
                                                    2}
                                            </span>
                                        )}
                                </button>
                            )
                        )}

                </div>
            )}

        </div>
    );
}


export default function ReviewSection({
    reviews,
    onOpenImages,
}) {
    const INITIAL_COUNT = 10;
    const LOAD_COUNT = 5;

    const [visibleCount, setVisibleCount] =
        useState(INITIAL_COUNT);

    if (!reviews.length) {
        return null;
    }

    const visibleReviews =
        reviews.slice(0, visibleCount);

    const hasMore =
        visibleCount < reviews.length;

    const handleLoadMore = async () => {
        setVisibleCount((prev) =>
            Math.min(
                prev + LOAD_COUNT,
                reviews.length
            )
        );
    };

    return (
        <section className="product-reviews">

            <h2>
                Ulasan Pelanggan
            </h2>

            {visibleReviews.map(
                (review) => (
                    <ReviewCard
                        key={review.id}
                        review={review}
                        onOpenImages={
                            onOpenImages
                        }
                    />
                )
            )}

            <LoadMore
                onLoadMore={handleLoadMore}
                hasMore={hasMore}
                loadingText="Memuat ulasan..."
                buttonText="Tampilkan lebih banyak"
            />

        </section>
    );
}