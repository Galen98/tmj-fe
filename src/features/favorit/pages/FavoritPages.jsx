import SEO from "../../../components/SEO";
import Breadscrum from "../../../components/Breadscrum";
import HorizonCard from "../../../components/HorizonCard";
import HorizontalCardSkleton from "../../../components/utils/HorizontalCardSkleton";
import NoData from "../../../components/NoData";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleInfo,
    faEllipsis,
} from "@fortawesome/free-solid-svg-icons";

import {
    useState,
    useRef,
    useEffect,
} from "react";

import Swal from "sweetalert2";


export default function FavoritPages() {

    /*
     * =========================================
     * STATE
     * =========================================
     */

    const [isLoading, setIsLoading] =
        useState(true);

    const [favorites, setFavorites] =
        useState([]);

    const [openMenu, setOpenMenu] =
        useState(false);

    const menuRef =
        useRef(null);


    /*
     * =========================================
     * LOAD FAVORITES DARI LOCAL STORAGE
     * =========================================
     */

    useEffect(() => {

        const loadFavorites = () => {

            try {

                const storedFavorites =
                    JSON.parse(
                        localStorage.getItem(
                            "favorites"
                        ) || "[]"
                    );


                setFavorites(
                    Array.isArray(
                        storedFavorites
                    )
                        ? storedFavorites
                        : []
                );


            } catch (error) {

                console.error(
                    "Gagal membaca favorites:",
                    error
                );


                setFavorites(
                    []
                );

            } finally {

                setIsLoading(
                    false
                );

            }

        };


        /*
         * Simulasi loading.
         *
         * Kalau nanti sudah pakai API,
         * bagian setTimeout ini bisa
         * dihilangkan.
         */

        const timer =
            setTimeout(
                loadFavorites,
                500
            );


        return () =>
            clearTimeout(
                timer
            );

    }, []);


    /*
     * =========================================
     * HAPUS SEMUA FAVORITE
     * =========================================
     */

    const handleDeleteFavorite =
        async () => {

            const result =
                await Swal.fire({

                    title:
                        "Hapus semua favorit?",

                    text:
                        "Semua daftar favorit akan dihapus.",

                    icon:
                        "warning",

                    showCancelButton:
                        true,

                    confirmButtonText:
                        "Ya, hapus",

                    cancelButtonText:
                        "Batal",

                    confirmButtonColor:
                        "#d33",

                    cancelButtonColor:
                        "#6c757d",

                });


            if (
                !result.isConfirmed
            ) {
                return;
            }


            /*
             * Hapus localStorage
             */

            localStorage.removeItem(
                "favorites"
            );


            /*
             * Update UI tanpa refresh
             */

            setFavorites(
                []
            );


            /*
             * Optional:
             * berguna kalau komponen lain
             * nanti perlu tahu favorites berubah.
             */

            window.dispatchEvent(
                new Event(
                    "favoritesUpdated"
                )
            );


            await Swal.fire({

                title:
                    "Berhasil!",

                text:
                    "Daftar favorit telah dihapus.",

                icon:
                    "success",

                confirmButtonColor:
                    "#0d6efd",

            });

        };


    /*
     * =========================================
     * CLOSE DROPDOWN
     * =========================================
     */

    useEffect(() => {

        const handleClickOutside =
            (e) => {

                if (
                    menuRef.current &&
                    !menuRef.current.contains(
                        e.target
                    )
                ) {

                    setOpenMenu(
                        false
                    );

                }

            };


        document.addEventListener(
            "mousedown",
            handleClickOutside
        );


        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

        };

    }, []);


    /*
     * =========================================
     * RENDER
     * =========================================
     */

    return (
        <>
            <SEO
                title="Wishlist | Travel Murah Jogja"
                description="Daftar paket wisata favorit yang telah Anda simpan."
                path="/favorit"
            />


            <div className="app__container border-top-soft mt-mobile">

                <div className="container py-5">


                    {/* =========================
                        HEADER
                    ========================= */}

                    <div className="favorite-header">

                        <Breadscrum
                            title="Wishlist kamu"
                            subtitle={
                                isLoading
                                    ? "Memuat..."
                                    : `${favorites.length} kegiatan`
                            }
                        />


                        {favorites.length > 0 && (
                            <div
                                className="favorite-menu"
                                ref={menuRef}
                            >

                                <button
                                    type="button"
                                    className="favorite-menu-btn"
                                    onClick={() =>
                                        setOpenMenu(
                                            (prev) =>
                                                !prev
                                        )
                                    }
                                    disabled={
                                        isLoading
                                    }
                                >

                                    <FontAwesomeIcon
                                        icon={
                                            faEllipsis
                                        }
                                    />

                                </button>


                                {openMenu && (

                                    <div className="favorite-dropdown">

                                        <button
                                            type="button"
                                            className="favorite-dropdown-item danger"
                                            onClick={() => {

                                                setOpenMenu(
                                                    false
                                                );

                                                handleDeleteFavorite();

                                            }}
                                        >

                                            Hapus daftar favorit

                                        </button>

                                    </div>

                                )}

                            </div>
                        )}

                    </div>


                    {/* =========================
                        CONTENT
                    ========================= */}

                    {isLoading ? (

                        /*
                         * SKELETON
                         */

                        <div className="favorite-skeleton">

                            <HorizontalCardSkleton />

                            <HorizontalCardSkleton />

                            <HorizontalCardSkleton />

                        </div>

                    ) : favorites.length > 0 ? (

                        /*
                         * FAVORITES
                         */

                        <>

                            <div className="favorite-info">

                                <FontAwesomeIcon
                                    icon={
                                        faCircleInfo
                                    }
                                    className="favorite-info-icon"
                                />

                                <span>
                                    Disimpan secara lokal di perangkat ini
                                </span>

                            </div>


                            {favorites.map(
                                (item) => (

                                    <HorizonCard
                                        key={
                                            item.id
                                        }

                                        {...item}

                                        to={
                                            `/travels/${item.slug}`
                                        }
                                    />

                                )
                            )}

                        </>

                    ) : (

                        /*
                         * EMPTY
                         */

                        <NoData />

                    )}

                </div>

            </div>
        </>
    );
}