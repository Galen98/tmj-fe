import { Link, useLocation } from "react-router-dom";
import {
    faHeart,
    faBell,
    faComments,
    faArrowLeft,
    faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PhoneNavigation({
    onOpenNotification,
    onOpenChatlist,
}) {
    const location = useLocation();

    const isPaketWisata =
        location.pathname.startsWith("/paket-wisata");

    const isTravel =
        location.pathname.startsWith("/travels");

    // Jangan tampilkan PhoneNavigation default
    // di halaman /travels dan turunannya
    if (isTravel) {
        return null;
    }

    const defaultMenu = [
        {
            icon: faHeart,
            label: "Favorit",
            to: "/favorit",
        },
        {
            icon: faBell,
            label: "Notifikasi",
            to: "/notifikasi",
            badge: 5,
        },
        {
            icon: faComments,
            label: "Chat",
            to: "/chat",
            badge: 3,
        },
    ];

    const paketWisataMenu = [
        {
            icon: faArrowLeft,
            label: "Kembali",
            to: "/",
        },
        {
            icon: faHeart,
            label: "Favorit",
            to: "#",
        },
        {
            icon: faShareNodes,
            label: "Bagikan",
            to: "#",
        },
    ];

    const menus = isPaketWisata
        ? paketWisataMenu
        : defaultMenu;

    return (
        <div className="phone-navigation d-md-none">
            {menus.map((menu) => {

                if (menu.label === "Notifikasi") {
                    return (
                        <button
                            key={menu.label}
                            className="phone-item border-0 bg-transparent"
                            onClick={onOpenNotification}
                        >
                            <div className="phone-icon">
                                <FontAwesomeIcon
                                    icon={menu.icon}
                                />

                                {menu.badge > 0 && (
                                    <span className="phone-badge">
                                        {menu.badge}
                                    </span>
                                )}
                            </div>

                            <span>
                                {menu.label}
                            </span>
                        </button>
                    );
                }

                if (menu.label === "Chat") {
                    return (
                        <button
                            key={menu.label}
                            className="phone-item border-0 bg-transparent"
                            onClick={onOpenChatlist}
                        >
                            <div className="phone-icon">
                                <FontAwesomeIcon
                                    icon={menu.icon}
                                />

                                {menu.badge > 0 && (
                                    <span className="phone-badge">
                                        {menu.badge}
                                    </span>
                                )}
                            </div>

                            <span>
                                {menu.label}
                            </span>
                        </button>
                    );
                }

                return (
                    <Link
                        key={menu.label}
                        to={menu.to}
                        className="phone-item"
                    >
                        <div className="phone-icon">
                            <FontAwesomeIcon
                                icon={menu.icon}
                            />

                            {menu.badge > 0 && (
                                <span className="phone-badge">
                                    {menu.badge}
                                </span>
                            )}
                        </div>

                        <span>
                            {menu.label}
                        </span>
                    </Link>
                );
            })}
        </div>
    );
}