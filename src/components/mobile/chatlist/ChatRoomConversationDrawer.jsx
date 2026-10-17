import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

export default function ChatRoomConversationDrawer({
  open,
  onClose,
  chatId,
}) {

  const conversations = {
    1: {
      title: "Bali Adventure",
      messages: [
        {
          id: 1,
          sender: "admin",
          text: "Halo kak 👋 Selamat datang di Bali Adventure.",
          time: "09:10",
          date: "2026-07-05",
        },
        {
          id: 2,
          sender: "admin",
          text: "Ada yang bisa kami bantu?",
          time: "09:11",
          date: "2026-07-05",
        },
        {
          id: 3,
          sender: "user",
          text: "Saya ingin bertanya mengenai paket Bali 5 Hari.",
          time: "09:12",
          date: "2026-07-05",
        },
      ],
    },

    2: {
      title: "Lombok Tour",
      messages: [
        {
          id: 1,
          sender: "admin",
          text: "Booking Anda sudah kami konfirmasi.",
          time: "10:00",
          date: "2026-07-05",
        },
      ],
    },

    3: {
      title: "Labuan Bajo",
      messages: [
        {
          id: 1,
          sender: "admin",
          text: "Terima kasih sudah memilih kami.",
          time: "08:00",
          date: "2026-07-05",
        },
      ],
    },
  };

  const conversation = conversations[chatId];

  if (!conversation) return null;

  const getDateLabel = (date) => {
    const today = new Date();
    const msgDate = new Date(date);

    today.setHours(0, 0, 0, 0);
    msgDate.setHours(0, 0, 0, 0);

    const diffDays = Math.floor(
        (today - msgDate) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) return "Hari Ini";
    if (diffDays === 1) return "Kemarin";

    return msgDate.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
  };

  return (
    <div className={`notification-drawer ${open ? "show" : ""}`}>
      <div className="notification-header">

        <button
          className="notification-back"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <h5>{conversation.title}</h5>

        <div style={{ width: 24 }} />

      </div>

      <div className="conversation-body">
        {conversation.messages.map((msg, index) => (
        <div key={msg.id}>
            {(index === 0 ||
            conversation.messages[index - 1].date !== msg.date) && (
            <div className="chat-date">
                {getDateLabel(msg.date)}
            </div>
            )}
            <div
            className={`message-row ${
                msg.sender === "user"
                ? "message-right"
                : "message-left"
            }`}
            >
            <div className="message-bubble">
                <p>{msg.text}</p>
                <small>{msg.time}</small>
            </div>
            </div>

        </div>
        ))}
      </div>

      <div className="conversation-footer">
        <input
          type="text"
          placeholder="Ketik pesan..."
        />

        <button>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
}