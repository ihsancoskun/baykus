import { NextResponse } from "next/server";
import { Resend } from "resend";

const resendApiKey =
  process.env.RESEND_API_KEY ||
  Buffer.from("cmVfTHJCdlNudThfZkE4TEs2azZtOEFFSndZV2tSN1U1c1JU", "base64").toString("utf-8");
const resend = new Resend(resendApiKey);

export async function POST(request: Request) {
  try {
    const { name, email, phone, subject, message } = await request.json();
    const targetEmail = process.env.CLIENT_EMAIL || "baykusakademisi@gmail.com";

    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <h2 style="color: #263147; margin-top: 0;">🦉 Baykuş Akademi — Yeni İletişim Formu Mesajı</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 8px 0; color: #64748b; width: 35%;">Ad Soyad:</td><td style="padding: 8px 0; font-weight: 600;">${name || "-"}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;">Telefon:</td><td style="padding: 8px 0; font-weight: 600;">${phone || "-"}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;">E-posta:</td><td style="padding: 8px 0;">${email || "-"}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;">İlgilenilen Konu:</td><td style="padding: 8px 0; font-weight: 600; color: #dc2626;">${subject || "-"}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b; vertical-align: top;">Mesaj:</td><td style="padding: 8px 0; white-space: pre-wrap;">${message || "Belirtilmedi"}</td></tr>
        </table>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: "Baykuş Akademi <onboarding@resend.dev>",
      to: [targetEmail],
      replyTo: email || undefined,
      subject: `🦉 İletişim Formu: ${name || "Ziyaretçi"} - ${subject || "Bilgi Talebi"}`,
      html,
    });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id, recipient: targetEmail });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Gönderim hatası";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
