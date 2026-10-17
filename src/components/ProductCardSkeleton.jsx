export default function ProductCardSkeleton() {
    return (
        <div className="col-6 col-md-4 col-lg-2-4">
            <div className="product-card-skeleton">

                <div className="product-card-skeleton__image"></div>

                <div className="product-card-skeleton__name"></div>
                <div className="product-card-skeleton__name short"></div>

                <div className="product-card-skeleton__price"></div>

                <div className="product-card-skeleton__rating"></div>

                <div className="product-card-skeleton__origin"></div>
                <div className="product-card-skeleton__category"></div>

            </div>
        </div>
    );
}