import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function ChatListDrawer({ open, onClose, onOpenConversation }) {
    const chats = [
    {
        id: 1,
        image: "https://picsum.photos/80?1",
        name: "Bali Adventure",
        message: "Halo kak, ada yang bisa kami bantu?",
        time: "09:20",
        unread: true,
        unreadCount: 2,
    },
    {
        id: 2,
        image: "https://picsum.photos/80?2",
        name: "Lombok Tour",
        message: "Booking Anda sudah dikonfirmasi.",
        time: "Kemarin",
        unread: true,
        unreadCount: 1,
    },
    {
        id: 3,
        image: "https://picsum.photos/80?3",
        name: "Labuan Bajo",
        message: "Terima kasih telah memesan.",
        time: "Sen",
        unread: false,
        unreadCount: 0,
    },
    ];
        
  return (
    <div className={`notification-drawer ${open ? "show" : ""}`}>
      <div className="notification-header">
        <button
          className="notification-back"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <h5>Chat</h5>

        <div style={{ width: 24 }}></div>
      </div>

      <div className="notification-body">

        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`chat-item ${chat.unread ? "chat-unread" : ""}`}
            onClick={() => onOpenConversation(chat.id)}
            >
            <img
                src={chat.image}
                alt={chat.name}
                className="chat-image"
            />

            <div className="chat-content">

                <div className="chat-top">

                <h6>{chat.name}</h6>

                <div className="chat-right">

                    <small>{chat.time}</small>

                    {chat.unreadCount > 0 && (
                    <span className="chat-badge">
                        {chat.unreadCount}
                    </span>
                    )}

                </div>

                </div>

                <p>{chat.message}</p>

            </div>
            </div>
        ))}

      </div>
    </div>
  );
}