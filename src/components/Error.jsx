

export default function Error() {

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="d-flex app__container justify-content-center align-items-center min-vh-100 text-center mt-mobile">
      <div>
        {/* <img
          src={ErrorImg}
          alt="Error"
          style={{ width: "200px", maxWidth: "100%" }}
          className="mb-4"
        /> */}

        {/* Text */}
        <h4 className="mb-2 text-danger">Terjadi Kesalahan</h4>
        <p className="text-muted mb-4">
          Layanan sedang mengalami gangguan atau gagal dimuat.
        </p>

        <button
          onClick={handleRefresh}
          className="btn btn-primary px-4 rounded"
        >
          Refresh Halaman
        </button>

      </div>
    </div>
  );
}