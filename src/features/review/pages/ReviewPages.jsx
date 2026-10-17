import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

import Failed from "../../../components/alert/Failed";
import HorizontalCardSkleton from "../../../components/utils/HorizontalCardSkleton";
import LoadingAfterStore from "../../../components/utils/LoadingAfterStore";
import SEO from "../../../components/SEO";

import useReviewStore from "../store/reviewStore";

export default function ReviewPages() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [reviewData, setReviewData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isStoreLoading, setIsStoreLoading] = useState(false);

    const {
        rating,
        comment,
        photos,
        setRating,
        setComment,
        setPhotos,
        resetReview,
    } = useReviewStore();

    useEffect(() => {
        const verifyToken = async () => {
            setIsLoading(true);

            // Reset data review ketika membuka halaman review baru
            resetReview();

            // Simulasi request / loading API
            setTimeout(async () => {
                const dummyToken = "abc123xyz";

                // Token tidak valid
                if (token !== dummyToken) {
                    await Failed({
                        title: "Link Review Tidak Valid",
                        text: "Link review tidak ditemukan atau sudah tidak berlaku.",
                    });

                    navigate("/");
                    return;
                }

                // Dummy data
                setReviewData({
                    tourName: "Bali Adventure Tour",
                    tourImage: "https://picsum.photos/600/400",
                    pointOfInterest: "Kintamani, Ubud, Tanah Lot",
                    city: "Bali",
                    userName: "Gal Ryan",
                    travelDate: "10 September 2026",
                });

                setIsLoading(false);
            }, 1000);
        };

        verifyToken();
    }, [token, navigate, resetReview]);

    const handlePhotoChange = (event) => {
        const selectedFiles = Array.from(event.target.files);

        if (photos.length + selectedFiles.length > 5) {
            Failed({
                title: "Error",
                text: "Maksimal 5 foto yang dapat diupload.",
            });

            return;
        }

        const invalidFiles = selectedFiles.filter(
            (file) => !file.type.startsWith("image/")
        );

        if (invalidFiles.length > 0) {
            Failed({
                title: "Error",
                text: "File yang diupload harus berupa foto.",
            });

            return;
        }

        setPhotos([...photos, ...selectedFiles]);

        // Supaya input file bisa memilih file yang sama lagi
        event.target.value = "";
    };

    const handleRemovePhoto = (index) => {
        setPhotos(photos.filter((_, i) => i !== index));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (rating === 0) {
            await Failed({
                title: "Error",
                text: "Silakan berikan rating terlebih dahulu.",
            });

            return;
        }

        if (!comment.trim()) {
            await Failed({
                title: "Error",
                text: "Silakan berikan komentar terlebih dahulu.",
            });

            return;
        }

        const formData = new FormData();

        formData.append("token", token);
        formData.append("rating", rating);
        formData.append("comment", comment);

        photos.forEach((photo) => {
            formData.append("photos[]", photo);
        });

        try {
            setIsStoreLoading(true);

            console.log("Review:", {
                token,
                rating,
                comment,
                photos,
            });

            // Simulasi API / store
            await new Promise((resolve) => {
                setTimeout(resolve, 5000);
            });

            console.log("Review berhasil disimpan");

            // Nanti setelah API berhasil:
            // await Success({
            //     title: "Review Berhasil",
            //     text: "Terima kasih sudah memberikan review.",
            // });

            // navigate("/");
        } catch (error) {
            console.error(error);

            await Failed({
                title: "Review Gagal",
                text: "Terjadi kesalahan saat menyimpan review.",
            });
        } finally {
            setIsStoreLoading(false);
        }
    };

    if (isLoading) {
        return (
            <>
            <SEO
                title={`Review ${reviewData.tourName} | Travel Murah Jogja`}
                description={`Berikan ulasan Anda tentang ${reviewData.tourName}. Temukan kegiatan dan paket wisata terbaik di ${reviewData.city}. Jelajahi berbagai pilihan wisata, aktivitas, dan perjalanan menarik untuk liburan Anda.`}
                path={`/review/${token}`}
            />

            <div className="review-page">
                <div className="review-page__container">

                    <HorizontalCardSkleton />

                    <div className="review-booking review-booking--skeleton">
                        <div className="skeleton-title"></div>

                        <div className="skeleton-row">
                            <div className="skeleton-text"></div>
                            <div className="skeleton-text skeleton-text--right"></div>
                        </div>

                        <div className="skeleton-row">
                            <div className="skeleton-text"></div>
                            <div className="skeleton-text skeleton-text--right"></div>
                        </div>
                    </div>

                </div>
            </div>
            </>
        );
    }

    if (!reviewData) {
        return null;
    }

    return (
        <>
            <LoadingAfterStore loading={isStoreLoading} />

            <div className="review-page">
                <div className="review-page__container">

                    {/* Tour */}
                    <div className="review-tour">

                        <img
                            src={reviewData.tourImage}
                            alt={reviewData.tourName}
                            className="review-tour__image"
                        />

                        <div className="review-tour__info">

                            <h1>
                                {reviewData.tourName}
                            </h1>

                            <p>
                                {reviewData.pointOfInterest}
                            </p>

                            <p>
                                {reviewData.city}
                            </p>

                        </div>

                    </div>

                    {/* Booking */}
                    <div className="review-booking">

                        <h2>
                            Detail Booking
                        </h2>

                        <div className="review-booking__item">
                            <span>Nama</span>

                            <strong>
                                {reviewData.userName}
                            </strong>
                        </div>

                        <div className="review-booking__item">
                            <span>Travel Date</span>

                            <strong>
                                {reviewData.travelDate}
                            </strong>
                        </div>

                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit}>

                        {/* Rating */}
                        <div className="review-rating">

                            <h2>
                                Bagaimana pengalaman Anda?
                            </h2>

                            <div className="review-rating__stars">

                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        type="button"
                                        key={star}
                                        onClick={() => setRating(star)}
                                        className={
                                            star <= rating
                                                ? "active"
                                                : ""
                                        }
                                    >
                                        ★
                                    </button>
                                ))}

                            </div>

                        </div>

                        {/* Comment */}
                        <div className="review-comment">

                            <h2>
                                Ceritakan pengalaman Anda
                            </h2>

                            <Editor
                                apiKey={
                                    import.meta.env
                                        .VITE_TINYMCE_API_KEY
                                }
                                value={comment}
                                onEditorChange={(content) =>
                                    setComment(content)
                                }
                                init={{
                                    height: 300,
                                    menubar: false,
                                    plugins: [
                                        "lists",
                                        "link",
                                        "autolink",
                                    ],
                                    toolbar:
                                        "undo redo | bold italic underline | bullist numlist | link",
                                }}
                            />

                        </div>

                        {/* Photo */}
                        <div className="review-photo">

                            <h2>
                                Tambahkan Foto
                            </h2>

                            <p>
                                Maksimal 5 foto.
                            </p>

                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handlePhotoChange}
                            />

                            <div className="review-photo__preview">

                                {photos.map((photo, index) => (
                                    <div
                                        className="review-photo__item"
                                        key={index}
                                    >

                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt={`Review ${index + 1}`}
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemovePhoto(index)
                                            }
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={isStoreLoading}
                        >
                            Kirim Review
                        </button>
                    </form>

                </div>
            </div>
        </>
    );
}