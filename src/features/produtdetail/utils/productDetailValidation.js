export const validateBookingTime = ({
    selectedDate,
    selectedTime,
    minimumHours = 0,
    dateAvailabilities = [],
}) => {
    if (!selectedDate || !selectedTime) {
        return {
            valid: false,
            message: "Tanggal dan jam perjalanan belum dipilih.",
        };
    }

    // Validasi date availability
    const availability = dateAvailabilities.find(
        (item) => item.date === selectedDate
    );

    if (availability && availability.status === false) {
        return {
            valid: false,
            message: "Tanggal perjalanan yang dipilih tidak tersedia.",
        };
    }

    // Normalisasi waktu
    const normalizedTime = String(selectedTime)
        .trim()
        .replace(".", ":");

    const [hour, minute] = normalizedTime
        .split(":")
        .map(Number);

    if (
        !Number.isInteger(hour) ||
        !Number.isInteger(minute) ||
        hour < 0 ||
        hour > 23 ||
        minute < 0 ||
        minute > 59
    ) {
        return {
            valid: false,
            message: "Format jam perjalanan tidak valid.",
        };
    }

    // Parsing tanggal
    const [year, month, day] = selectedDate
        .split("-")
        .map(Number);

    const tourDateTime = new Date(
        year,
        month - 1,
        day,
        hour,
        minute,
        0,
        0
    );

    if (
        !Number.isInteger(year) ||
        !Number.isInteger(month) ||
        !Number.isInteger(day) ||
        tourDateTime.getFullYear() !== year ||
        tourDateTime.getMonth() !== month - 1 ||
        tourDateTime.getDate() !== day
    ) {
        return {
            valid: false,
            message: "Tanggal perjalanan tidak valid.",
        };
    }

    const now = new Date();

    const difference = tourDateTime.getTime() - now.getTime();

    const minimumDifference = minimumHours * 60 * 60 * 1000;

    if (difference < minimumDifference) {
        return {
            valid: false,
            message: `Pemesanan hanya dapat dilakukan minimal ${minimumHours} jam sebelum waktu perjalanan.`,
        };
    }

    return {
        valid: true,
        tourDateTime,
    };
};