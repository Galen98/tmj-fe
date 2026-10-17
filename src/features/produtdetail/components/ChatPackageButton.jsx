import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";

export default function ChatPackageButton({
    onClick,
}) {
    return (
        <button
            type="button"
            className="chat-package-floating d-none d-md-block"
            onClick={onClick}
        >
            <FontAwesomeIcon
                icon={faComments}
                className="chat-package-floating__icon"
            /> <span> Chat Paket Wisata Ini</span>
        </button>
    );
}