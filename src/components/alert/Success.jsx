import Swal from "sweetalert2";

export default function Success({
    title = "Berhasil",
    text = "",
    confirmButtonText = "OK",
}) {
    return Swal.fire({
        icon: "success",
        title,
        text,
        confirmButtonText,
    });
}