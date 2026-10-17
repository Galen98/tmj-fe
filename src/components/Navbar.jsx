import { Link } from "react-router-dom";

import logo from "../assets/android-chrome-512x512.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faBell,
    faCircleQuestion,
    faMagnifyingGlass,
    faCartShopping,
    faComment,
    faHouse,
    faEnvelope,
    faHeart,
} from "@fortawesome/free-solid-svg-icons";

import {
    MessageCircleMore,
    ShoppingCart,
    EllipsisVertical,
} from "lucide-react";

import {
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";

import {
    useEffect,
    useState,
} from "react";


/*
 * =========================================
 * DESKTOP COMPONENT
 * =========================================
 */

import DesktopSearchSuggest
    from "./desktop/DesktopSearchSuggest";

import DesktopNotification
    from "./desktop/notification/DesktopNotification";

import DesktopChatList
    from "./desktop/chatlist/DesktopChatList";

import DesktopChatRoom
    from "./desktop/chatlist/DesktopChatRoom";


/*
 * =========================================
 * MOBILE COMPONENT
 * =========================================
 */

import NotificationDrawer
    from "./mobile/notification/NotificationDrawer";

import ChatListDrawer
    from "./mobile/chatlist/ChatListDrawer";

import ChatRoomConversationDrawer
    from "./mobile/chatlist/ChatRoomConversationDrawer";


export default function Navbar() {

    /*
     * =========================================
     * MOBILE MENU
     * =========================================
     */

    const [
        isOpen,
        setIsOpen,
    ] = useState(false);


    /*
     * =========================================
     * SEARCH
     * =========================================
     */

    const [
        searchKeyword,
        setSearchKeyword,
    ] = useState("");

    const [
        searchFocus,
        setSearchFocus,
    ] = useState(false);


    /*
     * =========================================
     * NOTIFICATION DATA
     * =========================================
     */

    const [
        notifications,
        setNotifications,
    ] = useState([]);

    const [
        isNotificationLoading,
        setIsNotificationLoading,
    ] = useState(false);

    const hasUnreadNotification = true;


    /*
     * =========================================
     * DESKTOP NOTIFICATION
     * =========================================
     */

    const [
        isNotificationOpen,
        setIsNotificationOpen,
    ] = useState(false);


    /*
     * =========================================
     * MOBILE NOTIFICATION
     * =========================================
     */

    const [
        isNotificationMobileOpen,
        setIsNotificationMobileOpen,
    ] = useState(false);


    /*
     * =========================================
     * CHAT DATA
     * =========================================
     */

    const [
        chats,
        setChats,
    ] = useState([]);

    const [
        isChatLoading,
        setIsChatLoading,
    ] = useState(false);


    /*
     * =========================================
     * DESKTOP CHAT
     * =========================================
     */

    const [
        isChatListDesktopOpen,
        setIsChatListDesktopOpen,
    ] = useState(false);

    const [
        isChatRoomDesktopOpen,
        setIsChatRoomDesktopOpen,
    ] = useState(false);

    const [
        activeChatId,
        setActiveChatId,
    ] = useState(null);


    /*
     * =========================================
     * MOBILE CHAT
     * =========================================
     */

    const [
        isChatListMobileOpen,
        setIsChatListMobileOpen,
    ] = useState(false);

    const [
        isChatRoomMobileOpen,
        setIsChatRoomMobileOpen,
    ] = useState(false);

    const [
        activeMobileChatId,
        setActiveMobileChatId,
    ] = useState(null);


    /*
     * =========================================
     * CART
     * =========================================
     */

    const [
        cartCount,
        setCartCount,
    ] = useState(0);


    /*
     * =========================================
     * MOBILE MENU HANDLER
     * =========================================
     */

    const openMobileMenu = () => {

        setIsOpen(true);

    };


    const closeMobileMenu = () => {

        setIsOpen(false);

    };


    /*
     * =========================================
     * CART COUNT
     * =========================================
     */

    useEffect(() => {

        const updateCartCount = () => {

            try {

                const carts =
                    JSON.parse(
                        localStorage.getItem(
                            "carts"
                        )
                    ) || [];


                setCartCount(
                    carts.length
                );

            } catch (error) {

                console.error(
                    "Gagal membaca cart:",
                    error
                );

                setCartCount(0);

            }

        };


        updateCartCount();


        window.addEventListener(
            "storage",
            updateCartCount
        );

        window.addEventListener(
            "cartUpdated",
            updateCartCount
        );


        return () => {

            window.removeEventListener(
                "storage",
                updateCartCount
            );

            window.removeEventListener(
                "cartUpdated",
                updateCartCount
            );

        };

    }, []);


    /*
     * =========================================
     * DUMMY NOTIFICATION
     * =========================================
     */

    const dummyNotifications = [

        {
            id: 1,
            title:
                "Pembayaran berhasil",
            description:
                "Pembayaran pesanan #TMJ001 berhasil.",
            time:
                "5 menit lalu",
            read:
                false,
        },

        {
            id: 2,
            title:
                "Booking dikonfirmasi",
            description:
                "Booking Bromo Argopuro telah dikonfirmasi.",
            time:
                "1 jam lalu",
            read:
                false,
        },

        {
            id: 3,
            title:
                "Promo terbaru",
            description:
                "Dapatkan promo wisata menarik minggu ini.",
            time:
                "Kemarin",
            read:
                false,
        },

    ];


    /*
     * =========================================
     * DUMMY CHAT
     * =========================================
     */

    const dummyChats = [

        {
            id: 1,
            image:
                "https://picsum.photos/80?1",
            name:
                "Bali Adventure",
            message:
                "Halo kak, ada yang bisa kami bantu?",
            time:
                "09:20",
            unread:
                true,
            unreadCount:
                2,
        },

        {
            id: 2,
            image:
                "https://picsum.photos/80?2",
            name:
                "Lombok Tour",
            message:
                "Booking Anda sudah dikonfirmasi.",
            time:
                "Kemarin",
            unread:
                true,
            unreadCount:
                1,
        },

        {
            id: 3,
            image:
                "https://picsum.photos/80?3",
            name:
                "Labuan Bajo",
            message:
                "Terima kasih telah memesan.",
            time:
                "Sen",
            unread:
                false,
            unreadCount:
                0,
        },

    ];


    /*
     * =========================================
     * CONVERSATIONS
     * =========================================
     */

    const conversations = {

        1: {

            title:
                "Bali Adventure",

            messages: [

                {
                    id: 1,
                    sender:
                        "admin",
                    text:
                        "Halo kak 👋 Selamat datang di Bali Adventure.",
                    time:
                        "09:10",
                    date:
                        "2026-07-05",
                },

                {
                    id: 2,
                    sender:
                        "admin",
                    text:
                        "Ada yang bisa kami bantu?",
                    time:
                        "09:11",
                    date:
                        "2026-07-05",
                },

                {
                    id: 3,
                    sender:
                        "user",
                    text:
                        "Saya ingin bertanya mengenai paket Bali 5 Hari.",
                    time:
                        "09:12",
                    date:
                        "2026-07-05",
                },

            ],

        },


        2: {

            title:
                "Lombok Tour",

            messages: [

                {
                    id: 1,
                    sender:
                        "admin",
                    text:
                        "Booking Anda sudah kami konfirmasi.",
                    time:
                        "10:00",
                    date:
                        "2026-07-05",
                },

            ],

        },


        3: {

            title:
                "Labuan Bajo",

            messages: [

                {
                    id: 1,
                    sender:
                        "admin",
                    text:
                        "Terima kasih sudah memilih kami.",
                    time:
                        "08:00",
                    date:
                        "2026-07-05",
                },

            ],

        },

    };


    /*
     * =========================================
     * LOAD NOTIFICATION
     * =========================================
     */

    const loadNotifications = () => {

        if (notifications.length > 0) {
            return;
        }


        setIsNotificationLoading(
            true
        );


        setTimeout(() => {

            setNotifications(
                dummyNotifications
            );

            setIsNotificationLoading(
                false
            );

        }, 1000);

    };


    /*
     * =========================================
     * DESKTOP NOTIFICATION
     * =========================================
     */

    const handleNotificationToggle = () => {

        const nextOpen =
            !isNotificationOpen;


        setIsNotificationOpen(
            nextOpen
        );


        if (nextOpen) {

            loadNotifications();

        }

    };


    /*
     * =========================================
     * MOBILE NOTIFICATION
     * =========================================
     */

    const handleMobileNotification = () => {

        // tutup menu titik tiga
        closeMobileMenu();

        // tutup chat
        setIsChatListMobileOpen(
            false
        );

        setIsChatRoomMobileOpen(
            false
        );

        setActiveMobileChatId(
            null
        );

        // buka notification
        setIsNotificationMobileOpen(
            true
        );

        loadNotifications();

    };


    /*
     * =========================================
     * LOAD CHAT
     * =========================================
     */

    const loadChats = () => {

        if (chats.length > 0) {
            return;
        }


        setIsChatLoading(
            true
        );


        setTimeout(() => {

            setChats(
                dummyChats
            );

            setIsChatLoading(
                false
            );

        }, 1000);

    };


    /*
     * =========================================
     * DESKTOP CHAT LIST
     * =========================================
     */

    const handleChatListToggle = () => {

        const nextOpen =
            !isChatListDesktopOpen;


        setIsChatListDesktopOpen(
            nextOpen
        );


        if (nextOpen) {

            loadChats();

        }

    };


    /*
     * =========================================
     * DESKTOP SELECT CHAT
     * =========================================
     */

    const handleSelectChat = (
        chatId
    ) => {

        setActiveChatId(
            chatId
        );

        setIsChatListDesktopOpen(
            false
        );

        setIsChatRoomDesktopOpen(
            true
        );

    };


    /*
     * =========================================
     * DESKTOP BACK CHAT
     * =========================================
     */

    const handleBackToChatList = () => {

        setIsChatRoomDesktopOpen(
            false
        );

        setIsChatListDesktopOpen(
            true
        );

    };


    /*
     * =========================================
     * DESKTOP CLOSE CHAT
     * =========================================
     */

    const handleCloseChatRoom = () => {

        setIsChatRoomDesktopOpen(
            false
        );

        setActiveChatId(
            null
        );

    };


    /*
     * =========================================
     * MOBILE OPEN CHAT LIST
     * =========================================
     */

    const handleMobileChat = () => {

        // tutup menu titik tiga
        closeMobileMenu();

        // tutup notification
        setIsNotificationMobileOpen(
            false
        );

        // tutup conversation jika sebelumnya terbuka
        setIsChatRoomMobileOpen(
            false
        );

        // reset active chat
        setActiveMobileChatId(
            null
        );

        // buka chat list
        setIsChatListMobileOpen(
            true
        );

        // persiapan kalau nanti ChatListDrawer
        // menggunakan data dari Navbar
        loadChats();

    };


    /*
     * =========================================
     * MOBILE OPEN CONVERSATION
     * =========================================
     */

    const handleOpenMobileConversation = (
        chatId
    ) => {

        setActiveMobileChatId(
            chatId
        );

        // tutup list
        setIsChatListMobileOpen(
            false
        );

        // buka conversation
        setIsChatRoomMobileOpen(
            true
        );

    };


    /*
     * =========================================
     * MOBILE BACK TO CHAT LIST
     * =========================================
     */

    const handleBackMobileConversation = () => {

        // tutup conversation
        setIsChatRoomMobileOpen(
            false
        );

        // reset chat aktif
        setActiveMobileChatId(
            null
        );

        // tampilkan chat list lagi
        setIsChatListMobileOpen(
            true
        );

    };


    /*
     * =========================================
     * MOBILE CLOSE CHAT LIST
     * =========================================
     */

    const handleCloseMobileChatList = () => {

        setIsChatListMobileOpen(
            false
        );

        setActiveMobileChatId(
            null
        );

    };


    /*
     * =========================================
     * VIEW
     * =========================================
     */

    return (

        <>

            {/* ================================= */}
            {/* HEADER */}
            {/* ================================= */}

            <header className="header">

                <div className="grid wide">


                    {/* ============================= */}
                    {/* DESKTOP TOP NAVBAR */}
                    {/* ============================= */}

                    <nav className="header__navbar hide-on-mobile-tablet">

                        <ul className="header__navbar-list">

                            <li className="header__navbar-item">

                                <Link
                                    to="/contact-us"
                                    className="header__navbar-item-link header__navbar-item--separate"
                                >
                                    Kontak Kami
                                </Link>

                            </li>


                            <li className="header__navbar-item header__navbar-item--separate">

                                <span>
                                    Ikuti Kami
                                </span>

                                <a
                                    href="https://www.instagram.com/travelmurahjogja/"
                                    className="header__navbar-icon-link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >

                                    <FontAwesomeIcon
                                        icon={
                                            faInstagram
                                        }
                                    />

                                </a>

                            </li>

                        </ul>


                        <ul className="header__navbar-list">

                            {/* FAVORIT */}

                            <li className="header__navbar-item">

                                <Link
                                    to="/favorit"
                                    className="header__navbar-item-link"
                                >

                                    <FontAwesomeIcon
                                        icon={
                                            faHeart
                                        }
                                    />

                                    {" "}

                                    Favorit

                                </Link>

                            </li>


                            {/* NOTIFICATION */}

                            <li className="header__navbar-item desktop-notification-wrapper">

                                <button
                                    type="button"
                                    className="header__navbar-item-link desktop-notif border-0 bg-transparent"
                                    onClick={
                                        handleNotificationToggle
                                    }
                                >

                                    <span className="desktop-notif-icon">

                                        <FontAwesomeIcon
                                            icon={
                                                faBell
                                            }
                                        />

                                        {hasUnreadNotification && (

                                            <span className="desktop-notif-dot" />

                                        )}

                                    </span>

                                    <span>
                                        Notifikasi
                                    </span>

                                </button>


                                <DesktopNotification
                                    open={
                                        isNotificationOpen
                                    }
                                    onClose={() =>
                                        setIsNotificationOpen(
                                            false
                                        )
                                    }
                                    notifications={
                                        notifications
                                    }
                                    isLoading={
                                        isNotificationLoading
                                    }
                                />

                            </li>


                            {/* HELP */}

                            <li className="header__navbar-item">

                                <Link
                                    to="/help-center"
                                    className="header__navbar-item-link"
                                >

                                    <FontAwesomeIcon
                                        icon={
                                            faCircleQuestion
                                        }
                                    />

                                    {" "}

                                    Pusat Bantuan

                                </Link>

                            </li>


                            {/* CHAT */}

                            <li className="header__navbar-item">

                                <button
                                    type="button"
                                    className="header__navbar-item-link desktop-chatlist border-0 bg-transparent"
                                    onClick={
                                        handleChatListToggle
                                    }
                                >

                                    <FontAwesomeIcon
                                        icon={
                                            faComment
                                        }
                                    />

                                    {" "}

                                    Daftar Chat

                                </button>


                                <DesktopChatList
                                    open={
                                        isChatListDesktopOpen
                                    }
                                    onClose={() =>
                                        setIsChatListDesktopOpen(
                                            false
                                        )
                                    }
                                    chats={
                                        chats
                                    }
                                    isLoading={
                                        isChatLoading
                                    }
                                    onSelectChat={
                                        handleSelectChat
                                    }
                                />


                                <DesktopChatRoom
                                    open={
                                        isChatRoomDesktopOpen
                                    }
                                    chatId={
                                        activeChatId
                                    }
                                    conversations={
                                        conversations
                                    }
                                    chats={
                                        chats
                                    }
                                    onBack={
                                        handleBackToChatList
                                    }
                                    onClose={
                                        handleCloseChatRoom
                                    }
                                />

                            </li>

                        </ul>

                    </nav>


                    {/* ============================= */}
                    {/* MAIN HEADER */}
                    {/* ============================= */}

                    <div className="header-with-search">


                        {/* ========================= */}
                        {/* LOGO */}
                        {/* ========================= */}

                        <div className="header__logo">

                            <Link
                                to="/"
                                className="header__logo-link"
                            >

                                <svg
                                    viewBox="0 0 512 512"
                                    className="header__logo-img shopee-svg-icon header-with-search__shopee-logo icon-shopee-logo"
                                >

                                    <image
                                        href={
                                            logo
                                        }
                                    />

                                </svg>

                            </Link>

                        </div>


                        {/* ========================= */}
                        {/* SEARCH */}
                        {/* ========================= */}

                        <div className="header__search">

                            <div className="header__search-input-wrap">

                                <input
                                    type="text"
                                    className="header__search-input"
                                    placeholder="Mau cari wisata apa?"
                                    value={
                                        searchKeyword
                                    }
                                    onChange={(
                                        e
                                    ) => {

                                        setSearchKeyword(
                                            e.target.value
                                        );

                                        setSearchFocus(
                                            true
                                        );

                                    }}
                                    onFocus={() =>
                                        setSearchFocus(
                                            true
                                        )
                                    }
                                />

                            </div>


                            {/* DESKTOP SEARCH BUTTON */}

                            <button
                                type="button"
                                className="header__search-btn btn-primary"
                            >

                                <FontAwesomeIcon
                                    icon={
                                        faMagnifyingGlass
                                    }
                                />

                            </button>


                            {/* SEARCH SUGGEST */}

                            <DesktopSearchSuggest
                                keyword={
                                    searchKeyword
                                }
                                isFocus={
                                    searchFocus
                                }
                                onClose={() =>
                                    setSearchFocus(
                                        false
                                    )
                                }
                            />

                        </div>


                        {/* ========================= */}
                        {/* MOBILE ACTION */}
                        {/* ========================= */}

                        <div className="header__mobile-actions d-md-none">


                            {/* CHAT */}

                            <button
                                type="button"
                                className="header__mobile-action"
                                onClick={
                                    handleMobileChat
                                }
                                aria-label="Chat"
                            >

                                <MessageCircleMore
                                    size={25}
                                    strokeWidth={2}
                                />

                            </button>


                            {/* CART */}

                            <Link
                                to="/cart"
                                className="header__mobile-action"
                                aria-label="Keranjang"
                            >

                                <ShoppingCart
                                    size={26}
                                    strokeWidth={2}
                                />

                                {cartCount > 0 && (

                                    <span className="header__mobile-badge">

                                        {cartCount}

                                    </span>

                                )}

                            </Link>


                            {/* MORE */}

                            <button
                                type="button"
                                className="header__mobile-action header__mobile-more"
                                onClick={
                                    openMobileMenu
                                }
                                aria-label="Menu"
                            >

                                <EllipsisVertical
                                    size={25}
                                    strokeWidth={2.5}
                                />

                            </button>

                        </div>


                        {/* ========================= */}
                        {/* DESKTOP CART */}
                        {/* ========================= */}

                        <div className="header__cart hide-on-mobile-tablet">

                            <Link
                                to="/cart"
                                className="header__cart-wrap"
                            >

                                <FontAwesomeIcon
                                    icon={
                                        faCartShopping
                                    }
                                    className="header__cart-icon"
                                />


                                {cartCount > 0 && (

                                    <span className="header__cart-notice">

                                        {cartCount}

                                    </span>

                                )}

                            </Link>

                        </div>

                    </div>

                </div>

            </header>


            {/* ================================= */}
            {/* MOBILE MENU */}
            {/* ================================= */}

            <div
                className={`mobile-menu ${
                    isOpen
                        ? "show"
                        : ""
                }`}
            >

                <div className="mobile-menu-header">

                    <div>

                        <h5 className="mb-0 fw-bold">
                            Travel Murah Jogja
                        </h5>

                        <small className="text-muted">
                            Partner Healing Terbaikmu
                        </small>

                    </div>


                    <button
                        type="button"
                        className="btn-close"
                        onClick={
                            closeMobileMenu
                        }
                        aria-label="Tutup menu"
                    />

                </div>


                <div className="mobile-menu-body">


                    {/* HOME */}

                    <Link
                        to="/"
                        className="mobile-item"
                        onClick={
                            closeMobileMenu
                        }
                    >

                        <div className="mobile-item-icon">

                            <FontAwesomeIcon
                                icon={
                                    faHouse
                                }
                            />

                        </div>

                        <span>
                            Halaman Utama
                        </span>

                    </Link>


                    {/* NOTIFICATION */}

                    <button
                        type="button"
                        className="mobile-item border-0 bg-transparent w-100"
                        onClick={
                            handleMobileNotification
                        }
                    >

                        <div className="mobile-item-icon">

                            <FontAwesomeIcon
                                icon={
                                    faBell
                                }
                            />

                            {hasUnreadNotification && (

                                <span className="mobile-item-dot" />

                            )}

                        </div>

                        <span>
                            Notifikasi
                        </span>

                    </button>


                    {/* FAVORIT */}

                    <Link
                        to="/favorit"
                        className="mobile-item"
                        onClick={
                            closeMobileMenu
                        }
                    >

                        <div className="mobile-item-icon">

                            <FontAwesomeIcon
                                icon={
                                    faHeart
                                }
                            />

                        </div>

                        <span>
                            Favorit Saya
                        </span>

                    </Link>


                    {/* INSTAGRAM */}

                    <a
                        href="https://www.instagram.com/travelmurahjogja/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mobile-item"
                    >

                        <div className="mobile-item-icon">

                            <FontAwesomeIcon
                                icon={
                                    faInstagram
                                }
                            />

                        </div>

                        <span>
                            Ikuti Kami
                        </span>

                    </a>


                    {/* HELP CENTER */}

                    <Link
                        to="/help-center"
                        className="mobile-item"
                        onClick={
                            closeMobileMenu
                        }
                    >

                        <div className="mobile-item-icon">

                            <FontAwesomeIcon
                                icon={
                                    faCircleQuestion
                                }
                            />

                        </div>

                        <span>
                            Pusat Bantuan
                        </span>

                    </Link>


                    {/* CONTACT */}

                    <Link
                        to="/contact-us"
                        className="mobile-item"
                        onClick={
                            closeMobileMenu
                        }
                    >

                        <div className="mobile-item-icon">

                            <FontAwesomeIcon
                                icon={
                                    faEnvelope
                                }
                            />

                        </div>

                        <span>
                            Kontak Kami
                        </span>

                    </Link>

                </div>

            </div>


            {/* ================================= */}
            {/* MOBILE MENU OVERLAY */}
            {/* ================================= */}

            {isOpen && (

                <div
                    className="mobile-overlay"
                    onClick={
                        closeMobileMenu
                    }
                />

            )}


            {/* ================================= */}
            {/* MOBILE NOTIFICATION */}
            {/* ================================= */}

            <NotificationDrawer
                open={
                    isNotificationMobileOpen
                }
                onClose={() =>
                    setIsNotificationMobileOpen(
                        false
                    )
                }
                notifications={
                    notifications
                }
                isLoading={
                    isNotificationLoading
                }
            />


            {/* ================================= */}
            {/* MOBILE CHAT LIST */}
            {/* ================================= */}

            <ChatListDrawer
                open={
                    isChatListMobileOpen
                }
                onClose={
                    handleCloseMobileChatList
                }
                onOpenConversation={
                    handleOpenMobileConversation
                }
            />


            {/* ================================= */}
            {/* MOBILE CHAT ROOM */}
            {/* ================================= */}

            <ChatRoomConversationDrawer
                open={
                    isChatRoomMobileOpen
                }
                onClose={
                    handleBackMobileConversation
                }
                chatId={
                    activeMobileChatId
                }
            />

        </>

    );

}