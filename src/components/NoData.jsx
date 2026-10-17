import NoDataImg from "../assets/no-data.png";
import { useNavigate } from "react-router-dom";

export default function NoData() {
const navigate = useNavigate();

  return (
    <div className="app__container border-top-soft mt-mobile">
    <div className="d-flex justify-content-center align-items-center min-vh-100 text-center mt-mobile ">
      <div>
        <img
          src={NoDataImg}
          alt="No Data"
          style={{ width: "280px", maxWidth: "100%" }}
          className="mb-4"
        />

        <h4 className="mb-2">Tidak Ada Data</h4>
        <p className="text-muted">
          Data belum tersedia atau masih kosong.
        </p>
        <div className="text-center mt-4">
            <button
                className="btn btn-primary px-4 py-2 w-100 rounded-5 fw-bold"
                onClick={() => navigate("/")}
            >
                Temukan kegiatan lain
            </button>
        </div>
      </div>
    </div>
    </div>
  );
}