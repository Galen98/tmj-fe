import { useEffect, useMemo, useState } from "react";
// import "./BookingDatePicker.css";

const WEEKDAYS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const MONTHS = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseDateKey(value) {
  if (!value) return null;

  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;

  const date = new Date(year, month - 1, day);
  return toDateKey(date) === value ? date : null;
}

function addDays(date, days) {
  const result = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  result.setDate(result.getDate() + days);
  return result;
}

function formatShort(date) {
  return `${date.getDate()} ${MONTHS[date.getMonth()].slice(0, 3)}`;
}

export default function BookingDatePicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const date = parseDateKey(value) || new Date();
    return new Date(date.getFullYear(), date.getMonth(), 1);
  });

  const today = new Date();
  const todayKey = toDateKey(today);
  const selected = parseDateKey(value);

  const quickDates = Array.from({ length: 3 }, (_, index) => {
    const date = addDays(today, index);
    return {
      date,
      key: toDateKey(date),
      label: index === 0 ? "Hari Ini" : index === 1 ? "Besok" : formatShort(date),
    };
  });

  const isQuickSelected = quickDates.some((item) => item.key === value);

  const selectDate = (key) => {
    if (key < todayKey) return;
    onChange(key);
    setOpen(false);
  };

  const openCalendar = () => {
    const date = selected || today;
    setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    setOpen(true);
  };

  const days = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const offset = new Date(year, month, 1).getDay();
    const count = new Date(year, month + 1, 0).getDate();

    return [
      ...Array.from({ length: offset }, () => null),
      ...Array.from({ length: count }, (_, index) =>
        new Date(year, month, index + 1)
      ),
    ];
  }, [currentMonth]);

  const previousMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const canGoPrevious =
    currentMonth.getFullYear() > today.getFullYear() ||
    (currentMonth.getFullYear() === today.getFullYear() &&
      currentMonth.getMonth() > today.getMonth());

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <div className="booking-date-picker">
        <div className="booking-date-picker__quick">
          {quickDates.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`booking-date-picker__pill ${
                value === item.key ? "is-active" : ""
              }`}
              onClick={() => selectDate(item.key)}
            >
              {item.label}
            </button>
          ))}

          <button
            type="button"
            className={`booking-date-picker__pill booking-date-picker__more ${
              value && !isQuickSelected ? "is-active" : ""
            }`}
            onClick={openCalendar}
          >
            <span aria-hidden="true">▦</span>
            {value && !isQuickSelected ? formatShort(selected) : "Tanggal Lainnya"}
            <span aria-hidden="true">›</span>
          </button>
        </div>

        {selected && (
          <div className="booking-date-picker__selected">
            <span>Tanggal perjalanan</span>
            <strong>
              {selected.toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </strong>
          </div>
        )}
      </div>

      {open && (
        <div
          className="booking-calendar-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div
            className="booking-calendar"
            role="dialog"
            aria-modal="true"
            aria-label="Pilih tanggal perjalanan"
          >
            <div className="booking-calendar__handle" />

            <div className="booking-calendar__header">
              <strong>Pilih Tanggal</strong>
              <button type="button" onClick={() => setOpen(false)} aria-label="Tutup">
                ×
              </button>
            </div>

            <div className="booking-calendar__navigation">
              <button
                type="button"
                onClick={previousMonth}
                disabled={!canGoPrevious}
                aria-label="Bulan sebelumnya"
              >
                ‹
              </button>

              <strong>
                {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </strong>

              <button type="button" onClick={nextMonth} aria-label="Bulan berikutnya">
                ›
              </button>
            </div>

            <div className="booking-calendar__grid">
              {WEEKDAYS.map((day) => (
                <span key={day} className="booking-calendar__weekday">
                  {day}
                </span>
              ))}

              {days.map((date, index) => {
                if (!date) return <span key={`empty-${index}`} />;

                const key = toDateKey(date);
                const isToday = key === todayKey;
                const isSelected = key === value;
                const isPast = key < todayKey;

                return (
                  <button
                    key={key}
                    type="button"
                    disabled={isPast}
                    onClick={() => selectDate(key)}
                    className={[
                      "booking-calendar__day",
                      isToday ? "is-today" : "",
                      isSelected ? "is-selected" : "",
                    ].join(" ")}
                    aria-label={date.toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                    aria-pressed={isSelected}
                  >
                    {date.getDate()}
                    {isToday && <small>Hari ini</small>}
                  </button>
                );
              })}
            </div>

            <div className="booking-calendar__footer">
              <button type="button" onClick={() => selectDate(todayKey)}>
                Pilih Hari Ini
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}