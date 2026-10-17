import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faPaperPlane,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function DesktopChatRoom({
    open,
    chatId,
    conversations,
    chats,
    onBack,
    onClose,
}) {
    const [message, setMessage] = useState("");

    if (!open || !chatId) {
        return null;
    }

    const conversation = conversations[chatId];

    const chat = chats.find(
        (item) => item.id === chatId
    );

    if (!conversation || !chat) {
        return null;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!message.trim()) {
            return;
        }

        console.log("Send message:", {
            id: chatId,
            message: message,
        });

        setMessage("");
    };

    return (
        <div className="desktop-chat-room">

            {/* Header */}
            <div className="desktop-chat-room__header">

                <button
                    type="button"
                    className="desktop-chat-room__back"
                    onClick={onBack}
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>

                <div className="desktop-chat-room__avatar">
                    <img
                        src={chat.image}
                        alt={conversation.title}
                    />
                </div>

                <div className="desktop-chat-room__info">

                    <span className="desktop-chat-room__name">
                        {conversation.title}
                    </span>

                    <span className="desktop-chat-room__status">
                        Online
                    </span>

                </div>

                <button
                    type="button"
                    className="desktop-chat-room__close"
                    onClick={onClose}
                >
                    <FontAwesomeIcon icon={faXmark} />
                </button>

            </div>
            
            <div className="desktop-chat-room__messages">
                {conversation.messages.map((item) => (

                    <div
                        key={item.id}
                        className={
                            item.sender === "user"
                                ? "desktop-chat-room__message desktop-chat-room__message--user"
                                : "desktop-chat-room__message desktop-chat-room__message--admin"
                        }
                    >

                        <div className="desktop-chat-room__bubble">

                            <span>
                                {item.text}
                            </span>

                            <small>
                                {item.time}
                            </small>

                        </div>

                    </div>

                ))}
            </div>


            <form
                className="desktop-chat-room__input"
                onSubmit={handleSubmit}
            >

                <input
                    type="text"
                    value={message}
                    onChange={(event) =>
                        setMessage(event.target.value)
                    }
                    placeholder="Tulis pesan..."
                />

                <button
                    type="submit"
                    disabled={!message.trim()}
                >
                    <FontAwesomeIcon icon={faPaperPlane} />
                </button>
            </form>
        </div>
    );
}