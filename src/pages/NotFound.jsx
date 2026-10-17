import { Link } from "react-router-dom";
import NotFoundImg from "../assets/404.png";

export default function NotFound() {
  return (
    <div className="app__container border-top-soft mt-mobile">
    <div className="d-flex align-items-center justify-content-center text-center" style={{ minHeight: "70vh" }}>
      <div>
       <img src={NotFoundImg} alt="404" width={300}/>

        <p className="text-muted mb-4">
          Maaf, halaman yang kamu cari tidak tersedia atau sudah dipindahkan.
        </p>

        <Link to="/" 
          className="btn btn-primary rounded-5"
        >
          Kembali ke Beranda
        </Link>
      </div>
      </div>
    </div>
  );
}