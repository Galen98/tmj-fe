import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function VoucherCard({ 
  title,
  description,
  code,
  icon,
  onCopySuccess
}) {
  const copyCode = () => {
    navigator.clipboard.writeText(code);
    onCopySuccess();
  };

  return (
    <>
    <div className="voucher-card shadow-sm">
      <div className="voucher-header">
        <div className="voucher-icon">
            <FontAwesomeIcon icon={icon} />
        </div>

        <div className="flex-grow-1 ms-3">
          <h5>{title}</h5>
          <small>{description}</small>
        </div>

        {/* <button className="btn-info-circle">
         <FontAwesomeIcon icon={faInfo}/>
        </button> */}
      </div>

      <div className="voucher-footer">
        <div className="voucher-code">
          <FontAwesomeIcon icon={faCopy}/>
          <span>{code}</span>
        </div>

        <button className="btn-copy" onClick={copyCode}>
          Copy
        </button>
      </div>
    </div>
    </>
  );
}