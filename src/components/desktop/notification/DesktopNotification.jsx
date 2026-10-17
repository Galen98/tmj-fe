import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    // faCheck,
    // faArrowRight,
    faSpinner,
    faBell,
} from "@fortawesome/free-solid-svg-icons";


export default function DesktopNotification({
    open,
    // onClose,
    notifications,
    isLoading,
}) {

    if (!open) {
        return null;
    }


    return (
        <div className="desktop-notification">
            <div className="desktop-notification__header">

                <span className="desktop-notification__title">
                    Notifikasi
                </span>

                {/* {!isLoading && notifications.length > 0 && (

                    <button
                        type="button"
                        className="desktop-notification__mark-read"
                    >
                        <FontAwesomeIcon icon={faCheck} />

                        Tandai semua dibaca
                    </button>

                )} */}

            </div>

            {isLoading && (
                <div className="desktop-notification__loading">

                    <FontAwesomeIcon
                        icon={faSpinner}
                        spin
                    />

                    <span>
                        Memuat notifikasi...
                    </span>

                </div>
            )}

            {!isLoading && notifications.length > 0 && (

                <div className="desktop-notification__list">

                    {notifications.map((notification) => (

                        <button
                            type="button"
                            key={notification.id}
                            className={`desktop-notification__item ${
                                notification.read
                                    ? "desktop-notification__item--read"
                                    : ""
                            }`}
                        >

                            {notification.read && (
                                <span className="desktop-notification__dot" />
                            )}


                            <div className="desktop-notification__content">

                                <div className="desktop-notification__item-title">
                                    {notification.title}
                                </div>

                                <div className="desktop-notification__item-description">
                                    {notification.description}
                                </div>

                                <div className="desktop-notification__time">
                                    {notification.time}
                                </div>

                            </div>
                        </button>

                    ))}
                </div>
            )}


            {!isLoading && notifications.length === 0 && (

                <div className="desktop-notification__empty">

                    <div className="desktop-notification__empty-icon">

                        <FontAwesomeIcon
                            icon={faBell}
                        />

                    </div>

                    <div className="desktop-notification__empty-text">
                        Belum ada notifikasi
                    </div>

                </div>

            )}

            {/* {!isLoading && notifications.length > 0 && (

                <button
                    type="button"
                    className="desktop-notification__footer"
                    onClick={onClose}
                >

                    <span>
                        Lihat semua notifikasi
                    </span>

                    <FontAwesomeIcon
                        icon={faArrowRight}
                    />

                </button>

            )} */}
        </div>
    );
}