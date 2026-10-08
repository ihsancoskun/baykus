export type ExamType = {
  id: string;
  name: string;
  description: string;
  levels: string[];
};

export type GSUInfo = {
  id: string;
  title: string;
  description: string;
  features: string[];
};

export type BranchLesson = {
  id: string;
  subject: string;
  description: string;
  curriculum: string[];
};

export type SuccessFigures = {
  francePlacementRate: number;
  totalExams: number;
  yearsOfExperience: number;
  gsuInternalExamRate: number;
};

export const DELF_DALF_DATA: ExamType[] = [
  {
    id: "delf-dalf",
    name: "DELF (Diplôme d'Études en Langue Française)",
    description: "Fransızca yetkinliğinizi uluslararası arenada taçlandıran, ömür boyu geçerliliğe sahip prestijli bir diploma.",
    levels: ["A1", "A2", "B1", "B2"],
  },
  {
    id: "delf-dalf",
    name: "DALF (Diplôme Approfondi de Langue Française)",
    description: "İleri düzey Fransızca hakimiyetinizi kanıtlayan, Fransa'nın en seçkin üniversitelerinin kapılarını aralayan üst düzey sertifikasyon.",
    levels: ["C1", "C2"],
  },
];

export const GSU_DATA: GSUInfo = {
  id: "gsicsinavlar",
  title: "Galatasaray Üniversitesi (GSÜ) Hazırlık & İç Sınav",
  description: "GSÜ'nün köklü akademik geleneğine ve iç sınav (passage) sistemine kusursuz uyum sağlayan, öğrencilere özel tasarlanmış destek programı.",
  features: [
    "İç Sınav (Passage) Simülasyonları",
    "Akademik Metin Analizi ve Yazım Pratikleri",
    "Sözlü Mülakat (Oral) Teknikleri ve Provaları",
    "Hazırlık Atlama (Muafiyet) Sınavına Yönelik Özel Çalışmalar"
  ],
};

export const BRANCH_LESSONS_DATA: BranchLesson[] = [
  {
    id: "fransizca-matematik-dersleri",
    subject: "Matematik (Fransızca)",
    description: "Saint Joseph, Galatasaray Lisesi gibi Fransız ekolünden gelen prestijli kurumların müfredatına bütünüyle entegre matematik eğitimi.",
    curriculum: ["Cebir", "Geometri", "Analiz", "Olasılık ve İstatistik"],
  },
  {
    id: "fransizca-fizik-dersleri",
    subject: "Fen Bilimleri (Fransızca)",
    description: "Fizik, Kimya ve Biyoloji alanlarında Fransızca akademik terminolojiye tam hakimiyet ve müfredatla senkronize destek.",
    curriculum: ["Fizik", "Kimya", "Biyoloji"],
  },
  {
    id: "fransizca-edebiyat-dersleri",
    subject: "Fransız Edebiyatı",
    description: "Klasik ve modern Fransız edebiyatının başyapıtlarına derinlemesine bakış ve eleştirel metin analizi (Commentaire composé).",
    curriculum: ["Metin Analizi", "Dönem Akımları", "Yazar İncelemeleri"],
  },
];

export const SUCCESS_DATA: SuccessFigures = {
  francePlacementRate: 90,
  totalExams: 1000,
  gsuInternalExamRate: 95,
  yearsOfExperience: 40,
};
