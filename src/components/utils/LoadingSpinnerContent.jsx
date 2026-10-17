export default function LoadingSpinnerContent() {
    return (
        <div className="loading-spinner-content">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}