import Swal from "sweetalert2";

export default function Info({
    title = "Informasi",
    text = "",
    confirmButtonText = "OK",
}) {
    return Swal.fire({
        icon: "info",
        title,
        text,
        confirmButtonText,
    });
}