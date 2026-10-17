import { useState } from "react";

import ParticipantPicker from "./ParticipantPicker";

export default function BookingBox({
    product,
    selectedDate,
    setSelectedDate,
    participants,
    setParticipants,
    onCheckAvailability,
    loading,
}) {
    const [showParticipant, setShowParticipant] =
        useState(false);

    const today = new Date().toLocaleDateString("en-CA");

    const participantText =
        product.tipe === "group"
            ? `${participants.participant || 1} Peserta`
            : [
                  `${participants.adult || 1} Dewasa`,
                  product.is_children &&
                  participants.child > 0
                      ? `${participants.child} Anak`
                      : null,
              ]
                  .filter(Boolean)
                  .join(", ");

    return (
        <div className="booking-box">

            <h3>
                Pilih detail perjalanan
            </h3>

            <div className="booking-box__field">

                <label>
                    Tanggal perjalanan
                </label>

                <input
                    type="date"
                    min={today}
                    value={selectedDate}
                    onChange={(e) =>
                        setSelectedDate(
                            e.target.value
                        )
                    }
                />

            </div>

            <div className="booking-box__field booking-participant">

                <label>
                    Peserta
                </label>

                <button
                    type="button"
                    className="booking-participant__trigger"
                    onClick={() =>
                        setShowParticipant(
                            (prev) => !prev
                        )
                    }
                >
                    {participantText}
                </button>

                {showParticipant && (
                    <ParticipantPicker
                        product={product}
                        participants={participants}
                        onChange={setParticipants}
                        onClose={() =>
                            setShowParticipant(false)
                        }
                    />
                )}

            </div>

            <button
                type="button"
                className="btn btn-primary w-100"
                disabled={
                    !selectedDate ||
                    loading
                }
                onClick={onCheckAvailability}
            >
                {loading
                    ? "Memeriksa..."
                    : "Lihat Ketersediaan"}
            </button>

        </div>
    );
}