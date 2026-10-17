import StepBookingImg from "../../../assets/book-step.png";

export default function StepBooking() {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 text-center">
          <img 
            src={StepBookingImg} 
            alt="Langkah Pemesanan" 
            className="img-fluid d-block mx-auto"
            style={{ maxHeight: "300px", objectFit: "contain" }} 
          />
        </div>
      </div>
    </div>
  );
}