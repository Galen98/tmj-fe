import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSpinner,
    faComment,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function DesktopChatList({
    open,
    onClose,
    chats,
    isLoading,
    onSelectChat
}) {

    if (!open) {
        return null;
    }

    return (
        <div className="desktop-chat-list">
            <div className="desktop-chat-list__header">
                <span className="desktop-chat-list__title">
                    Daftar Chat
                </span>

                <button
                    type="button"
                    className="desktop-chat-list__close"
                    onClick={onClose}
                >
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </div>


            {isLoading && (

                <div className="desktop-chat-list__loading">
                    <FontAwesomeIcon
                        icon={faSpinner}
                        spin
                    />

                    <span>
                        Memuat chat...
                    </span>
                </div>

            )}


            {!isLoading && chats.length > 0 && (

                <div className="desktop-chat-list__items">

                    {chats.map((chat) => (

                        <button
                            type="button"
                            key={chat.id}
                            className="desktop-chat-list__item"
                            onClick={() => onSelectChat(chat.id)}
                        >

                            <div className="desktop-chat-list__avatar">

                                <img
                                    src={chat.image}
                                    alt={chat.name}
                                />

                            </div>


                            <div className="desktop-chat-list__content">

                                <div className="desktop-chat-list__top">

                                    <span className="desktop-chat-list__name">
                                        {chat.name}
                                    </span>

                                    <span className="desktop-chat-list__time">
                                        {chat.time}
                                    </span>

                                </div>

                                <div className="desktop-chat-list__message">
                                    {chat.message}
                                </div>

                            </div>


                            {chat.unread && chat.unreadCount > 0 && (
                                <span className="desktop-chat-list__unread-count">
                                    {chat.unreadCount}
                                </span>
                            )}

                        </button>
                    ))}
                </div>
            )}


            {!isLoading && chats.length === 0 && (
                <div className="desktop-chat-list__empty">
                    <FontAwesomeIcon icon={faComment} />
                    <span>
                        Belum ada chat
                    </span>
                </div>
            )}
        </div>
    );
}