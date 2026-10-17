import ProductCardSkeleton from "./ProductCardSkeleton";

export default function LoadingContent({
    type = "product",
    count = 5,
}) {
    if (type === "product") {
        return (
            <div className="row listing-pages__products">
                {[...Array(count)].map((_, index) => (
                    <ProductCardSkeleton key={index} />
                ))}
            </div>
        );
    }

    return null;
}