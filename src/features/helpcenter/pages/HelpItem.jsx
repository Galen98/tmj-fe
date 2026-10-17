import { useParams } from "react-router-dom";

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

export default function HelpItem() {
  const { id } = useParams();
  const item = helpData.find(
    (d) => String(d.id) === id
  );

  if (!item) {
    return (
    <div className="app__container border-top-soft mt-mobile" style={{backgroundColor:"white"}}>
      <div className="container py-4">
        <h4>Data tidak ditemukan</h4>
      </div>
    </div>
    );
  }

  return (
    <div className="app__container border-top-soft mt-mobile" style={{backgroundColor:"white"}}>
    <div className="container py-4">
      <h3>{item.title}</h3>
      <p className="text-muted">
        {item.desc}
      </p>

      <div className="card p-3">
        <pre style={{ whiteSpace: "pre-wrap" }}>
          {item.content}
        </pre>
      </div>
    </div>
    </div>
  );
}