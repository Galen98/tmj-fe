import { useNavigate } from "react-router-dom";

const sortingOptions = [
    {
        id: 1,
        name: "Trip Paling Populer",
        value: "most-popular",
    },
    {
        id: 2,
        name: "Harga Terendah",
        value: "lowest-price",
    },
    {
        id: 3,
        name: "Harga Tertinggi",
        value: "highest-price",
    },
    {
        id: 4,
        name: "Durasi Tersingkat",
        value: "shortest-duration",
    },
    {
        id: 5,
        name: "Durasi Terlama",
        value: "longest-duration",
    },
];

export default function SortingSection() {
    const navigate = useNavigate();

    const handleSort = (item) => {
        navigate(
            `/recommendations?sort=${encodeURIComponent(item.value)}`
        );
    };

    return (
        <div className="sorting-section bg-white p-4 rounded mb-5">
            <div className="section-header mb-4">
                <h3 className="section-title">
                    Urutkan
                </h3>

                <div className="section-underline" />
            </div>

            <div className="sorting-slider">
                {sortingOptions.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        className="sorting-chip"
                        onClick={() => handleSort(item)}
                    >
                        {item.name}
                    </button>
                ))}
            </div>
        </div>
    );
}