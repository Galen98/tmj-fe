import { create } from "zustand";

const useReviewStore = create((set) => ({
    rating: 0,
    comment: "",
    photos: [],

    setRating: (rating) => set({ rating }),

    setComment: (comment) => set({ comment }),

    setPhotos: (photos) => set({ photos }),

    resetReview: () =>
        set({
            rating: 0,
            comment: "",
            photos: [],
        }),
}));

export default useReviewStore;