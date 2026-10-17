import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleQuestion,
  faComments,
  faEnvelope,
  faPhone,
  faBook,
  faMagnifyingGlass,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import SEO from "../../../components/SEO";
import { useNavigate } from "react-router-dom";

const helpData = [
  {
    id: 1,
    title: "Bagaimana cara memesan paket wisata?",
    desc: "Panduan lengkap booking paket wisata.",
    content: `
    1. Pilih paket wisata
    2. Klik booking sekarang
    3. Isi data peserta
    4. Lakukan pembayaran
    5. Konfirmasi otomatis
    `,
  },
  {
    id: 2,
    title: "Metode pembayaran",
    desc: "Transfer bank, e-wallet, kartu kredit",
    content: `
    1. Transfer Bank
    2. E-wallet (DANA, OVO, GOPAY)
    3. Kartu Kredit
    `,
  },
];

export default function HelpCenter() {
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = [
    "Bagaimana cara melakukan booking?",
    "Bagaimana cara membatalkan pesanan?",
    "Bagaimana cara menghubungi tour guide?",
    "Metode pembayaran apa saja yang tersedia?",
    "Bagaimana jika saya belum menerima voucher?",
  ];
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const suggestions = helpData.filter((item) =>
    item.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <>
    <SEO
    title="Help Center & FAQ | Travel Murah Jogja"
    description="Pusat Bantuan Travel Murah Jogja menyediakan informasi lengkap mengenai cara pemesanan paket wisata, pembayaran, pembatalan, refund, voucher, serta layanan customer service. Cari jawaban atas pertanyaan Anda atau hubungi kami untuk bantuan."
    path="/help-center"
    />
    
    <div className="app__container border-top-soft mt-mobile">
    <div className="container py-5">
      <h2 className="fw-bold mb-2">
        Pusat Bantuan
      </h2>

      <p className="text-muted mb-4">
        Temukan jawaban atas pertanyaan Anda atau hubungi kami.
      </p>

      <div className="help-search mb-4">
        <FontAwesomeIcon icon={faMagnifyingGlass} />

        <input
            type="text"
            placeholder="Cari bantuan..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      {keyword.trim() !== "" && (
      <div className="help-suggestion">
            {suggestions.length > 0 ? (
            suggestions.map((item) => (
                <div
                key={item.id}
                className="help-suggestion-item"
                onClick={() => navigate(`/help-center/item/${item.id}`)}
                >
                <div className="help-suggestion-title">
                    {item.title}
                </div>

                <div className="help-suggestion-desc">
                    {item.desc}
                </div>
                </div>
            ))
            ) : (
            <div className="help-suggestion-empty">
                Bantuan tidak ditemukan.
            </div>
            )}
        </div>
        )}


      <div className="row g-3 mb-4">
        <div className="col-6">
          <div className="help-card">
            <FontAwesomeIcon icon={faComments} />
            <span>Live Chat</span>
          </div>
        </div>

        <div className="col-6">
          <div className="help-card">
            <FontAwesomeIcon icon={faPhone} />
            <span>Hubungi Kami</span>
          </div>
        </div>

        <div className="col-6">
          <div className="help-card">
            <FontAwesomeIcon icon={faEnvelope} />
            <span>Email</span>
          </div>
        </div>

        <div className="col-6">
          <div className="help-card">
            <FontAwesomeIcon icon={faBook} />
            <span>Panduan</span>
          </div>
        </div>

      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <h5 className="fw-bold mb-3">
            Pertanyaan Umum
          </h5>

        {faqs.map((faq, index) => (
        <div key={index} className="help-faq-wrapper">
            <div
            className="help-faq"
            onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
            }
            >
            <div>
                <FontAwesomeIcon
                icon={faCircleQuestion}
                className="me-2 text-primary"
                />
                {faq}
            </div>

            <FontAwesomeIcon icon={faChevronRight} />
            </div>

            {openIndex === index && (
            <div className="help-faq-answer">
                Ini jawaban untuk: {faq}
            </div>
            )}

        </div>
        ))}

        </div>
      </div>
    </div>
    </div>
    </>
  );
}