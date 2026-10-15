import { NextResponse } from "next/server";

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

    // FormSubmit payload (baykusakademisi@gmail.com'a giden temiz tablo)
    const payload = {
      _subject: `🦉 Yeni Yurt Dışı Danışmanlık Başvurusu: ${adSoyad || "Yeni Aday"} [${referenceCode || "BYK-REF"}]`,
      _template: "table",
      email: email || undefined,
      _replyto: email || undefined,
      _captcha: "false",
      _autoresponse: `Merhaba ${adSoyad || "Değerli Öğrencimiz / Velimiz"},\n\nBaykuş Akademi Yurt Dışı Eğitim Danışmanlığı ön başvuru formunuz başarıyla bize ulaşmıştır.\n\nBaşvuru Referans Kodunuz: ${referenceCode || "-"}\n\nEğitim danışmanlarımız formda paylaştığınız akademik bilgileri ve hedeflerinizi titizlikle inceledikten sonra, randevu ve süreç planlaması için sizinle en kısa sürede iletişime geçecektir.\n\nSaygılarımızla,\nBaykuş Akademi\nWeb: https://baykusakademi.com\nE-posta: baykusakademisi@gmail.com`,

      "--- ÖĞRENCİ BİLGİLERİ ---": "------------------------",
      "Başvuru Referans Kodu": referenceCode || "-",
      "Öğrenci Adı Soyadı": adSoyad || "-",
      "Telefon / WhatsApp": telefon || "-",
      "E-posta Adresi": email || "-",
      "Doğum Tarihi": dogumTarihi || "-",
      "T.C. Kimlik No": tcKimlikNo || "-",
      "İkamet Şehri": sehir || "-",
      "Veli Adı Soyadı": veliAdSoyad || "-",
      "Veli Telefonu": veliTelefon || "-",

      "--- AKADEMİK GEÇMİŞ ---": "------------------------",
      "Okulu": okul || "-",
      "Sınıf": sinif || "-",
      "Branş / Bölüm": bolum || "-",
      "Lise 1 Yıl Sonu Ortalaması": lise1Ortalama || "-",
      "Lise 2 Yıl Sonu Ortalaması": lise2Ortalama || "-",
      "Lise 3 Yıl Sonu Ortalaması": lise3Ortalama || "-",

      "--- YABANCI DİL BELGELERİ ---": "------------------------",
      "DELF B2": `${delfB2Durum || "-"} ${delfB2Notu ? `(Puan: ${delfB2Notu})` : ""}`,
      "DALF C1": `${dalfC1Durum || "-"} ${dalfC1Notu ? `(Puan: ${dalfC1Notu})` : ""}`,
      "DALF C2": `${dalfC2Durum || "-"} ${dalfC2Notu ? `(Puan: ${dalfC2Notu})` : ""}`,
      "IELTS / TOEFL": `${ieltsDurum || "-"} ${ieltsNotu ? `(Puan: ${ieltsNotu})` : ""}`,
      "Diğer Diller": digerDiller || "-",

      "--- FRANSA VE HEDEFLER ---": "------------------------",
      "Hedeflenen Bölümler": istenenBolumler || "-",
      "Tercih Edilen Şehirler": istenenSehirler || "-",
      "YKS Hedefi": yksDurumu || "-",
      "Varsa B Planı": bPlani || "-",
      "Özel Okul Başvurusu": ozelOkulBasvurusu || "-",
      "Başka Ülke Başvurusu": baskaUlkeler || "-",
      "Konaklama Tercihi": konaklamaTercihi || "-",
      "Öğrenci / Veli Notu": ekNotlar || "Yok"
    };

    const targetEmail = process.env.CLIENT_EMAIL || "baykusakademisi@gmail.com";

    const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Referer": "https://baykusakademi.com",
        "Origin": "https://baykusakademi.com"
      },
      body: JSON.stringify(payload)
    });

    const resData = await response.json();

    return NextResponse.json({
      success: true,
      message: resData.message || "Başvurunuz başarıyla iletildi."
    });
  } catch (err: any) {
    console.error("Form Gönderim Hatası:", err);
    return NextResponse.json({ 
      success: false, 
      error: err.message || "Gönderim sırasında bir hata oluştu" 
    }, { status: 500 });
  }
}
