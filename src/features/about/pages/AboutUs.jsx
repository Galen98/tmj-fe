import SEO from "../../../components/SEO";
import AboutImg from "../../../assets/about.png"

export default function AboutUs() {
  return (
    <>
    <SEO
    title="Travel Murah Jogja | About Us"
    description="Travel murah jogja adalah platform wisata modern yang dirancang untuk memudahkan kamu
            menemukan berbagai destinasi terbaik, paket perjalanan lengkap, serta
            pengalaman liburan yang tak terlupakan dalam satu tempat."
    path="/about-us"
    />

    <div className="py-5 mt-3">
      <div className="container">
        <div className="bg-white p-4 rounded">
          <div className="row align-items-center mb-5">
            <div className="col-md-6">
              <h2 className="fw-bold mb-3">
                Tentang Kami
              </h2>

              <div className="mb-3"></div>

              <p className="text-muted">
                Kami adalah platform wisata modern yang dirancang untuk memudahkan kamu
                menemukan berbagai destinasi terbaik, paket perjalanan lengkap, serta
                pengalaman liburan yang tak terlupakan dalam satu tempat. Dengan
                menggabungkan teknologi dan layanan yang terintegrasi, kami menghadirkan
                solusi praktis mulai dari pemesanan paket wisata, akomodasi, hingga
                aktivitas menarik yang dapat disesuaikan dengan kebutuhan dan preferensi kamu.
                </p>

                <p className="text-muted">
                Kami bekerja sama dengan mitra terpercaya untuk memastikan setiap perjalanan
                yang kamu rencanakan berjalan dengan nyaman, aman, dan menyenangkan. Fokus kami
                adalah memberikan pengalaman terbaik dengan harga yang kompetitif, sehingga
                kamu bisa menikmati perjalanan tanpa ribet dan lebih fokus pada momen berharga.
                </p>
            </div>

            <div className="col-md-6 mt-4 mb-4 text-center">
              <img
                src={AboutImg}
                alt="travel"
                className="img-fluid rounded"
                style={{ maxHeight: "200px", objectFit: "cover" }}
              />
            </div>
       </div>

       <div className="row">
        <div className="col-12 col-md-6 mb-4">
            <div className="p-4 border rounded h-100">
            <h5 className="mb-3">Layanan Kami</h5>
            <ol className="service-list">
                <li>Tur Harian</li>
                <li>Paket Wisata Multi-Hari</li>
                <li>Antar Jemput Bandara</li>
                <li>Hotel & Penerbangan Domestik</li>
                <li>M.I.C.E (Meeting, Incentive, Convention, Exhibition)</li>
            </ol>
            </div>
        </div>

        <div className="col-12 col-md-6 mb-4">
            <div className="p-4 border rounded h-100">
            <h5 className="mb-3">Janji Kami</h5>
            <ol className="text-muted text-start">
                <li>
                <strong>FLEKSIBEL</strong><br />
                Kami berkomitmen untuk menyesuaikan layanan dengan kebutuhan pelanggan agar memberikan pengalaman perjalanan terbaik.
                </li>

                <li>
                <strong>TERPERCAYA</strong><br />
                Kami menyediakan informasi yang akurat dan valid sehingga pelanggan dapat mengandalkan setiap layanan yang kami berikan.
                </li>

                <li>
                <strong>BERTANGGUNG JAWAB</strong><br />
                Kami selalu memberikan pelayanan terbaik untuk mencapai kepuasan pelanggan.
                </li>
            </ol>
            </div>
        </div>
        </div>
      </div>
    </div>
  </div>
  </>
);
}