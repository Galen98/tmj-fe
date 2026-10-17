import Swal from "sweetalert2";

export default function Confirm({
    title = "Apakah Anda yakin?",
    text = "",
    confirmButtonText = "Ya, Lanjutkan",
    cancelButtonText = "Batal",
}) {
    return Swal.fire({
        icon: "question",
        title,
        text,
        showCancelButton: true,
        confirmButtonText,
        cancelButtonText,
        reverseButtons: true,
    });
}