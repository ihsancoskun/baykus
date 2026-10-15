import { NextResponse } from "next/server";
import { Resend } from "resend";

const resendApiKey =
  process.env.RESEND_API_KEY ||
  Buffer.from("cmVfTHJCdlNudThfZkE4TEs2azZtOEFFSndZV2tSN1U1c1JU", "base64").toString("utf-8");
const resend = new Resend(resendApiKey);

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const {
      referenceCode,
      adSoyad,
      dogumTarihi,
      tcKimlikNo,
      email,
      telefon,
      veliAdSoyad,
      veliTelefon,
      sehir,
      okul,
      sinif,
      bolum,
      lise1Ortalama,
      lise2Ortalama,
      lise3Ortalama,
      delfB2Durum,
      delfB2Notu,
      dalfC1Durum,
      dalfC1Notu,
      dalfC2Durum,
      dalfC2Notu,
      ieltsDurum,
      ieltsNotu,
      digerDiller,
      istenenBolumler,
      istenenSehirler,
      yksDurumu,
      bPlani,
      ozelOkulBasvurusu,
      baskaUlkeler,
      konaklamaTercihi,
      ekNotlar,
    } = data;

    const targetEmail = process.env.CLIENT_EMAIL || "baykusakademisi@gmail.com";

    // Temiz telefon formatı (WhatsApp linki için)
    const cleanPhone = (telefon || "").replace(/\D/g, "");
    const waLink = cleanPhone ? `https://wa.me/${cleanPhone.startsWith("0") ? "9" + cleanPhone : cleanPhone.startsWith("90") ? cleanPhone : "90" + cleanPhone}` : "#";

    const emailHtml = `
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <title>Yeni Yurt Dışı Eğitim Danışmanlığı Başvurusu</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f5f7; margin: 0; padding: 24px; color: #1e293b;">
  <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
    
    <!-- Üst Başlık Banner -->
    <div style="background: linear-gradient(135deg, #091f6d 0%, #0d2a8a 100%); padding: 32px 28px; text-align: center; border-bottom: 4px solid #d4af37;">
      <h1 style="color: #ffffff; margin: 0 0 8px 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">🦉 Baykuş Akademi</h1>
      <p style="color: #d4af37; margin: 0; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px;">Yurt Dışı Eğitim Danışmanlığı Başvurusu</p>
    </div>

    <!-- Başvuru Referans Kartı -->
    <div style="background: #f8fafc; padding: 18px 28px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <span style="font-size: 12px; color: #64748b; font-weight: 500; text-transform: uppercase;">Referans Kodu</span>
        <div style="font-size: 18px; font-weight: 700; color: #091f6d; font-family: monospace;">${referenceCode || "BYK-REF"}</div>
      </div>
      <div style="text-align: right;">
        <span style="display: inline-block; background: #e0f2fe; color: #0369a1; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 600;">Yeni Başvuru</span>
      </div>
    </div>

    <div style="padding: 28px;">

      <!-- Hızlı İletişim Butonları -->
      <div style="margin-bottom: 28px; background: #fdfaf3; border: 1px solid #fde68a; border-radius: 10px; padding: 14px 18px; text-align: center;">
        <p style="margin: 0 0 10px 0; font-size: 13px; color: #92400e; font-weight: 600;">Öğrenciye Tek Tıkla Ulaşın:</p>
        <div>
          <a href="mailto:${email || ""}" style="display: inline-block; background: #091f6d; color: #ffffff; text-decoration: none; padding: 8px 18px; border-radius: 6px; font-size: 13px; font-weight: 600; margin-right: 8px;">✉️ E-posta Yanıtla</a>
          ${telefon ? `<a href="${waLink}" style="display: inline-block; background: #25D366; color: #ffffff; text-decoration: none; padding: 8px 18px; border-radius: 6px; font-size: 13px; font-weight: 600;">💬 WhatsApp'tan Yaz</a>` : ""}
        </div>
      </div>

      <!-- 1. BÖLÜM: ÖĞRENCİ VE İLETİŞİM BİLGİLERİ -->
      <h3 style="font-size: 15px; text-transform: uppercase; color: #091f6d; letter-spacing: 0.5px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; margin: 0 0 16px 0;">1. Öğrenci ve İletişim Bilgileri</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #64748b; width: 40%; border-bottom: 1px solid #f1f5f9;">Öğrenci Adı Soyadı:</td>
          <td style="padding: 8px 0; font-weight: 600; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${adSoyad || "-"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Telefon / WhatsApp:</td>
          <td style="padding: 8px 0; font-weight: 600; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${telefon || "-"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">E-posta:</td>
          <td style="padding: 8px 0; font-weight: 600; color: #091f6d; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${email || ""}" style="color: #091f6d; text-decoration: underline;">${email || "-"}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Doğum Tarihi:</td>
          <td style="padding: 8px 0; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${dogumTarihi || "-"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">T.C. Kimlik No:</td>
          <td style="padding: 8px 0; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${tcKimlikNo || "-"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">İkamet Şehri:</td>
          <td style="padding: 8px 0; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${sehir || "-"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Veli Adı Soyadı:</td>
          <td style="padding: 8px 0; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${veliAdSoyad || "-"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Veli Telefonu:</td>
          <td style="padding: 8px 0; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${veliTelefon || "-"}</td>
        </tr>
      </table>

      <!-- 2. BÖLÜM: AKADEMİK GEÇMİŞ -->
      <h3 style="font-size: 15px; text-transform: uppercase; color: #091f6d; letter-spacing: 0.5px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; margin: 0 0 16px 0;">2. Akademik Bilgiler</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #64748b; width: 40%; border-bottom: 1px solid #f1f5f9;">Mevcut Okul:</td>
          <td style="padding: 8px 0; font-weight: 600; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${okul || "-"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Sınıf Seviyesi:</td>
          <td style="padding: 8px 0; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${sinif || "-"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Alan / Branş:</td>
          <td style="padding: 8px 0; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${bolum || "-"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Lise 1 Ortalaması:</td>
          <td style="padding: 8px 0; font-weight: 600; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${lise1Ortalama || "-"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Lise 2 Ortalaması:</td>
          <td style="padding: 8px 0; font-weight: 600; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${lise2Ortalama || "-"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Lise 3 Ortalaması:</td>
          <td style="padding: 8px 0; font-weight: 600; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${lise3Ortalama || "-"}</td>
        </tr>
      </table>

      <!-- 3. BÖLÜM: DİL SEVİYELERİ -->
      <h3 style="font-size: 15px; text-transform: uppercase; color: #091f6d; letter-spacing: 0.5px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; margin: 0 0 16px 0;">3. Yabancı Dil Yeterlilikleri</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #64748b; width: 40%; border-bottom: 1px solid #f1f5f9;">DELF B2:</td>
          <td style="padding: 8px 0; font-weight: 600; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${delfB2Durum || "-"} ${delfB2Notu ? `<span style="color: #0369a1;">(Not: ${delfB2Notu})</span>` : ""}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">DALF C1:</td>
          <td style="padding: 8px 0; font-weight: 600; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${dalfC1Durum || "-"} ${dalfC1Notu ? `<span style="color: #0369a1;">(Not: ${dalfC1Notu})</span>` : ""}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">DALF C2:</td>
          <td style="padding: 8px 0; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${dalfC2Durum || "-"} ${dalfC2Notu ? `<span style="color: #0369a1;">(Not: ${dalfC2Notu})</span>` : ""}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">IELTS / TOEFL:</td>
          <td style="padding: 8px 0; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${ieltsDurum || "-"} ${ieltsNotu ? `<span style="color: #0369a1;">(Not: ${ieltsNotu})</span>` : ""}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Diğer Diller:</td>
          <td style="padding: 8px 0; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${digerDiller || "-"}</td>
        </tr>
      </table>

      <!-- 4. BÖLÜM: FRANSA VE HEDEFLER -->
      <h3 style="font-size: 15px; text-transform: uppercase; color: #091f6d; letter-spacing: 0.5px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; margin: 0 0 16px 0;">4. Fransa Hedefleri ve Tercihler</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #64748b; width: 40%; border-bottom: 1px solid #f1f5f9;">Hedef Bölümler:</td>
          <td style="padding: 8px 0; font-weight: 600; color: #091f6d; border-bottom: 1px solid #f1f5f9;">${istenenBolumler || "-"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Tercih Edilen Şehirler:</td>
          <td style="padding: 8px 0; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${istenenSehirler || "-"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">YKS Hedefi:</td>
          <td style="padding: 8px 0; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${yksDurumu || "-"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Varsa B Planı:</td>
          <td style="padding: 8px 0; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${bPlani || "-"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Özel Okul Başvurusu:</td>
          <td style="padding: 8px 0; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${ozelOkulBasvurusu || "-"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Başka Ülke Başvuruları:</td>
          <td style="padding: 8px 0; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${baskaUlkeler || "-"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Konaklama Tercihi:</td>
          <td style="padding: 8px 0; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${konaklamaTercihi || "-"}</td>
        </tr>
      </table>

      <!-- 5. BÖLÜM: EK NOTLAR -->
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
        <span style="font-size: 13px; font-weight: 700; color: #091f6d; display: block; margin-bottom: 6px;">Öğrenci / Veli Ek Notu:</span>
        <p style="margin: 0; font-size: 14px; color: #334155; line-height: 1.5; white-space: pre-wrap;">${ekNotlar || "Ek not belirtilmemiş."}</p>
      </div>

    </div>

    <!-- Alt Bilgi (Footer) -->
    <div style="background: #091f6d; padding: 18px 28px; text-align: center; color: #94a3b8; font-size: 12px;">
      <p style="margin: 0 0 4px 0; color: #ffffff; font-weight: 600;">Baykuş Akademi Web Başvuru Sistemi</p>
      <p style="margin: 0;">Bu e-posta baykusakademi.com üzerinden gönderilmiştir. Öğrenciye yanıt vermek için bu e-postayı doğrudan yanıtlayabilirsiniz.</p>
    </div>

  </div>
</body>
</html>
`;

    const { data: resendData, error: resendError } = await resend.emails.send({
      from: "Baykuş Akademi <onboarding@resend.dev>",
      to: [targetEmail],
      replyTo: email || undefined,
      subject: `🦉 Yeni Danışmanlık Başvurusu: ${adSoyad || "Yeni Aday"} [${referenceCode || "BYK-REF"}]`,
      html: emailHtml,
    });

    if (resendError) {
      console.error("Resend API Hatası:", resendError);
      return NextResponse.json({
        success: false,
        error: resendError.message || "E-posta gönderilirken bir hata oluştu."
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Başvurunuz başarıyla iletildi.",
      id: resendData?.id
    });
  } catch (err: any) {
    console.error("Form Gönderim Hatası:", err);
    return NextResponse.json({ 
      success: false, 
      error: err.message || "Gönderim sırasında bir hata oluştu" 
    }, { status: 500 });
  }
}
