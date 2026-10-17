import Swal from "sweetalert2";

export default function Failed({
    title = "Gagal",
    text = "",
    confirmButtonText = "OK",
}) {
    return Swal.fire({
        icon: "error",
        title,
        text,
        confirmButtonText,
    });
}