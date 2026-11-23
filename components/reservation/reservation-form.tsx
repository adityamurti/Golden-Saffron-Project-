"use client";

import { useState } from "react";
import { site } from "@/lib/seo/site";
import { buildReservationLink } from "@/lib/whatsapp";

/**
 * Form 4 field -> tautan WhatsApp berisi pesan lengkap.
 *
 * Tanpa backend: tidak ada fetch, tidak ada DB, tidak ada API route.
 * Tanggal & jam default diisi hari ini / jam makan malam agar tamu
 * tidak perlu mengubah dua field kalau memang itu niatnya.
 */
export function ReservationForm() {
  const today = new Date().toISOString().slice(0, 10);
  const [name, setName] = useState("");
  const [date, setDate] = useState(today);
  const [time, setTime] = useState("19:00");
  const [guests, setGuests] = useState(2);

  const href = buildReservationLink(site.whatsapp, {
    name: name.trim() === "" ? "—" : name.trim(),
    date,
    time,
    guests,
  });

  const fieldClass =
    "mt-2 w-full border border-ghost-border bg-transparent px-3.5 py-3 font-body text-[0.9375rem] text-ink outline-none focus:border-saffron";
  const labelClass =
    "text-[0.5625rem] font-semibold tracking-label text-muted-3 uppercase";

  return (
    <form
      className="mt-10 max-w-[34rem] md:mt-12"
      onSubmit={(event) => {
        // Tombol submit tetap <a> agar buka WhatsApp; cegah submit ganda.
        event.preventDefault();
        window.open(href, "_blank", "noopener,noreferrer");
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="date" className={labelClass}>
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            required
            min={today}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="time" className={labelClass}>
            Time
          </label>
          <input
            id="time"
            name="time"
            type="time"
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="guests" className={labelClass}>
            Guests
          </label>
          <select
            id="guests"
            name="guests"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className={fieldClass}
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary mt-8 w-full"
      >
        Reserve via WhatsApp
      </a>

      <p className="mt-4 text-[0.75rem] leading-[1.7] text-muted-3">
        Your booking is confirmed directly by our team on WhatsApp. For groups
        larger than 12, please message us.
      </p>
    </form>
  );
}
