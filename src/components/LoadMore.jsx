import { useState } from "react";

export default function LoadMore({
    onLoadMore,
    hasMore = true,
    loadingText = "Memuat...",
    buttonText = "Tampilkan lebih banyak",
}) {

    /*
     * =========================================
     * STATE
     * =========================================
     */

    const [loading, setLoading] =
        useState(false);


    /*
     * =========================================
     * HANDLE LOAD MORE
     * =========================================
     */

    const handleLoadMore =
        async () => {

            if (
                loading ||
                !hasMore ||
                !onLoadMore
            ) {
                return;
            }


            try {

                setLoading(true);

                await onLoadMore();

            } catch (error) {

                console.error(
                    "Gagal load more:",
                    error
                );

            } finally {

                setLoading(false);

            }

        };


    /*
     * =========================================
     * HIDE IF NO MORE DATA
     * =========================================
     */

    if (!hasMore) {
        return null;
    }


    /*
     * =========================================
     * VIEW
     * =========================================
     */

    return (

        <div className="load-more">

            <div className="load-more__line"></div>


            <button
                type="button"
                className={`load-more__button ${
                    loading
                        ? "load-more__button--loading"
                        : ""
                }`}
                onClick={
                    handleLoadMore
                }
                disabled={
                    loading
                }
            >

                {loading ? (

                    <>

                        <span className="load-more__spinner"></span>

                        {loadingText}

                    </>

                ) : (

                    buttonText

                )}

            </button>


            <div className="load-more__line"></div>

        </div>

    );
}