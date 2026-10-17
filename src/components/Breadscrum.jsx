import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Breadscrum({
    title,
    subtitle,
}) {

    const navigate = useNavigate();

    return (
        <div className="breadscrum">
            <button
                className="breadscrum-back"
                onClick={() => navigate(-1)}
            >
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            <div>
                <h2>{title}</h2>

                {subtitle && (
                    <span>{subtitle}</span>
                )}
            </div>
        </div>
    );
}