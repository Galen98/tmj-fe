import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLock,
    faCircleCheck,
    faHeadset
} from "@fortawesome/free-solid-svg-icons";

export default function CheckoutBenefit() {

    return (
        <div className="checkout-benefit">
            <h5>
                Kenapa harus pesan melalui kami?
            </h5>

            <div className="checkout-benefit-item">

                <FontAwesomeIcon icon={faLock} />

                <span>
                    Pembayaran aman
                </span>

            </div>

            <div className="checkout-benefit-item">
                <FontAwesomeIcon icon={faCircleCheck} />

                <span>
                    Biaya fixed
                </span>
            </div>

            <div className="checkout-benefit-item">
                <FontAwesomeIcon icon={faHeadset} />

                <span>
                    Dukungan pelanggan 24 jam
                </span>

            </div>
        </div>
    );
}