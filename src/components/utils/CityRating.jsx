import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faStar,
    faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";

export default function CityRating({
    rating = 0,
    totalReviews = 0,
}) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
        <div className="city-rating">
            <div className="city-rating__label">
                Peringkat rata-rata
            </div>

            <div className="city-rating__score">
                <span className="city-rating__number">
                    {rating.toFixed(1)}
                </span>

                <span className="city-rating__max">
                    /5
                </span>
            </div>

            <div className="city-rating__bottom">
                <div className="city-rating__stars">
                    {[...Array(fullStars)].map((_, index) => (
                        <FontAwesomeIcon
                            key={`full-${index}`}
                            icon={faStar}
                        />
                    ))}

                    {hasHalfStar && (
                        <FontAwesomeIcon
                            icon={faStarHalfStroke}
                        />
                    )}
                </div>

                <span className="city-rating__reviews">
                    berdasarkan{" "}
                    {totalReviews.toLocaleString("id-ID")} ulasan
                </span>
            </div>
        </div>
    );
}