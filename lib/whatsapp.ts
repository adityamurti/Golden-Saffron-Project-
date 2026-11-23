/**
 * Sumber TUNGGAL untuk semua tautan WhatsApp.
 *
 * Jangan pernah menulis "wa.me" di komponen. Semua CTA wajib lewat sini,
 * supaya nomor dan format pesan hanya berubah di satu tempat.
 */

/** Buang semua karakter non-digit. wa.me hanya menerima digit. */
export function normalizeWhatsAppNumber(input: string): string {
  return input.replace(/\D/g, "");
}

/**
 * Bangun tautan wa.me.
 *
 * Catatan encoding: `encodeURIComponent` menghasilkan %20/%0A/%26 yang
 * diterima wa.me. Jangan pakai URLSearchParams — hasilnya "+" untuk spasi,
 * dan wa.me menampilkan "+" apa adanya di dalam pesan.
 */
export function buildWhatsAppLink(opts: {
  whatsapp: string;
  message: string;
}): string {
  const digits = normalizeWhatsAppNumber(opts.whatsapp);
  if (digits.length === 0) {
    throw new Error("buildWhatsAppLink: nomor WhatsApp kosong setelah normalisasi");
  }
  return `https://wa.me/${digits}?text=${encodeURIComponent(opts.message)}`;
}

export type ReservationDetails = {
  name: string;
  /** Format YYYY-MM-DD (nilai <input type="date">). */
  date: string;
  /** Format HH:MM (nilai <input type="time">). */
  time: string;
  guests: number;
};

/**
 * Pesan reservasi SENGAJA dalam Bahasa Indonesia: pembacanya staf restoran,
 * bukan tamu. Ini satu-satunya teks berbahasa Indonesia di situs.
 */
export function buildReservationMessage(details: ReservationDetails): string {
  return [
    "Halo Golden Saffron, saya ingin reservasi.",
    `Nama: ${details.name}`,
    `Tanggal: ${details.date}`,
    `Jam: ${details.time}`,
    `Jumlah: ${details.guests} orang`,
  ].join("\n");
}

export function buildReservationLink(
  whatsapp: string,
  details: ReservationDetails,
): string {
  return buildWhatsAppLink({
    whatsapp,
    message: buildReservationMessage(details),
  });
}

/** Pesan umum untuk CTA non-reservasi. */
export function buildGeneralMessage(): string {
  return "Halo Golden Saffron, saya ingin bertanya.";
}
