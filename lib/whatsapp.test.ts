import { describe, expect, it } from "vitest";
import {
  buildReservationLink,
  buildReservationMessage,
  buildWhatsAppLink,
  normalizeWhatsAppNumber,
} from "./whatsapp";

describe("normalizeWhatsAppNumber", () => {
  it("membuang +, spasi, dan tanda hubung", () => {
    expect(normalizeWhatsAppNumber("+62 812-3456-7890")).toBe("6281234567890");
  });

  it("membuang nomor yang hanya berisi non-digit", () => {
    expect(normalizeWhatsAppNumber("+- ()")).toBe("");
  });
});

describe("buildWhatsAppLink", () => {
  it("tidak menyertakan + dan memakai domain wa.me", () => {
    const link = buildWhatsAppLink({
      whatsapp: "+62 812-3456-7890",
      message: "halo",
    });
    expect(link.startsWith("https://wa.me/6281234567890?text=")).toBe(true);
    expect(link).not.toContain("+");
  });

  it("meng-encode spasi dan newline", () => {
    const link = buildWhatsAppLink({
      whatsapp: "6281234567890",
      message: "baris satu\nbaris dua",
    });
    expect(link).toContain("baris%20satu%0Abaris%20dua");
  });

  it("tidak memotong pesan pada karakter &", () => {
    const link = buildWhatsAppLink({
      whatsapp: "6281234567890",
      message: "Naan & curry",
    });
    expect(link.split("text=")[1]).toBe("Naan%20%26%20curry");
  });

  it("melempar error bila nomor kosong", () => {
    expect(() => buildWhatsAppLink({ whatsapp: "--", message: "x" })).toThrow();
  });
});

describe("buildReservationMessage", () => {
  it("memuat nama, tanggal, jam, dan jumlah tamu", () => {
    const message = buildReservationMessage({
      name: "Budi",
      date: "2026-11-24",
      time: "19:00",
      guests: 4,
    });
    expect(message).toContain("Budi");
    expect(message).toContain("2026-11-24");
    expect(message).toContain("19:00");
    expect(message).toContain("4 orang");
  });
});

describe("buildReservationLink", () => {
  it("menghasilkan tautan wa.me yang memuat detail reservasi", () => {
    const link = buildReservationLink("6281234567890", {
      name: "Budi",
      date: "2026-11-24",
      time: "19:00",
      guests: 4,
    });
    expect(link.startsWith("https://wa.me/6281234567890?text=")).toBe(true);
    expect(decodeURIComponent(link.split("text=")[1] ?? "")).toContain("Budi");
  });
});
