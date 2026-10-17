import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function NotificationDrawer({ open, onClose }) {
  const notifications = [
    {
        title: "Booking Berhasil",
        desc: "Pemesanan Paket Wisata Bali telah berhasil.",
        date: "5 Juli 2026",
        read: true,
    },
    {
        title: "Promo Baru",
        desc: "Diskon hingga 30% untuk destinasi Lombok.",
        date: "4 Juli 2026",
        read: true,
    },
    {
        title: "Pembayaran Diterima",
        desc: "Pembayaran Anda telah kami terima.",
        date: "3 Juli 2026",
        read: true,
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

        <h5>Notifikasi</h5>

        <div style={{ width: 24 }}></div>

      </div>

      <div className="notification-body">

        {notifications.map((item, index) => (
          <div
            key={index}
            className={`notification-item ${
                !item.read ? "notification-unread" : ""
            }`}
            >
            <div className="notification-content">
                <h6>{item.title}</h6>
                <p>{item.desc}</p>
                <small>{item.date}</small>
            </div>
            </div>
        ))}

      </div>
    </div>
  );
}