export default function LoadingAfterStore({ loading = false }) {
    if (!loading) {
        return null;
    }

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 999999,
                background: "rgba(255, 255, 255, 0.8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div style={{ textAlign: "center" }}>
                <div
                    style={{
                        width: 40,
                        height: 40,
                        border: "4px solid #ddd",
                        borderTop: "4px solid #333",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                        margin: "0 auto 15px",
                    }}
                />

                <p>Mohon tunggu...</p>
            </div>

            <style>
                {`
                    @keyframes spin {
                        to {
                            transform: rotate(360deg);
                        }
                    }
                `}
            </style>
        </div>
    );
}