export default function HorizontalCardSkeleton() {
    return (
        <div className="horizontal-card-skeleton">
            <div className="horizontal-card-skeleton__image"></div>

            <div className="horizontal-card-skeleton__content">
                <div className="horizontal-card-skeleton__category"></div>
                <div className="horizontal-card-skeleton__title"></div>
                <div className="horizontal-card-skeleton__title short"></div>
                <div className="horizontal-card-skeleton__info"></div>
                <div className="horizontal-card-skeleton__rating"></div>
                <div className="horizontal-card-skeleton__price"></div>
            </div>
        </div>
    );
}