export type CredentialCategory =
  | "Certification"
  | "Competition"
  | "Hackathon"
  | "Organization";

export interface Credential {
  id: string;
  number: string;
  title: string;
  role?: string;
  issuer: string;
  category: CredentialCategory;
  year?: string;
  description?: string;
  credentialId?: string;
  issuedAt?: string;
  expiresAt?: string;
  preview: string;
  document: string;
  featured: boolean;
}

export const CREDENTIALS: readonly Credential[] = [
  {
    id: "techsprint-innovation-cup-2026",
    number: "01/",
    title: "Top 10 Web Development",
    issuer: "Codelab Indonesia",
    category: "Competition",
    year: "2026",
    credentialId: "002/STF/e/TECHSPRINT/CODELAB-INDONESIA/V/2026",
    description:
      "Top 10 Kategori Web Development pada Ajang Perlombaan TechSprint Innovation Cup 2026 yang Diselenggarakan oleh Codelab Indonesia.",
    preview:
      "/credentials/Riki Andika Khusna Saputra-CH Minyak Goreng Sawit for MBG - Universitas Teknologi Yogyakarta (Peringkat 6).webp",
    document:
      "/certificates/Riki Andika Khusna Saputra-CH Minyak Goreng Sawit for MBG - Universitas Teknologi Yogyakarta (Peringkat 6).pdf",
    featured: true,
  },
  {
    id: "refactory-hackathon",
    number: "02/",
    title: "Refactory Hackathon Participant",
    issuer: "Refactory × Universitas Gadjah Mada",
    category: "Hackathon",
    description:
      "Participant in Refactory Hackathon, held as part of Refactory's ongoing collaborative hackathon series, chapter Universitas Gadjah Mada - Yogyakarta.",
    preview: "/credentials/Riki Andika Khusna Saputra.webp",
    document: "/certificates/Riki Andika Khusna Saputra.pdf",
    featured: true,
  },
  {
    id: "dicoding-flutter-pemula",
    number: "03/",
    title: "Belajar Membuat Aplikasi Flutter untuk Pemula",
    issuer: "Dicoding Indonesia",
    category: "Certification",
    year: "2026",
    credentialId: "MRZM60G6RPYQ",
    issuedAt: "27 January 2026",
    expiresAt: "27 January 2029",
    preview: "/credentials/sertifikat_course_159_4367613_270126215112-1.webp",
    document: "/certificates/sertifikat_course_159_4367613_270126215112.pdf",
    featured: true,
  },
  {
    id: "dicoding-pemrograman-dart",
    number: "04/",
    title: "Memulai Pemrograman dengan Dart",
    issuer: "Dicoding Indonesia",
    category: "Certification",
    year: "2026",
    credentialId: "MRZM60GWRPYQ",
    issuedAt: "27 January 2026",
    expiresAt: "27 January 2029",
    preview: "/credentials/sertifikat_course_191_4367613_270126215340-1.webp",
    document: "/certificates/sertifikat_course_191_4367613_270126215340.pdf",
    featured: true,
  },
  {
    id: "dicoding-dasar-ai",
    number: "05/",
    title: "Belajar Dasar AI",
    issuer: "Dicoding Indonesia",
    category: "Certification",
    year: "2026",
    credentialId: "6RPNGQK78Z2M",
    issuedAt: "27 January 2026",
    expiresAt: "27 January 2029",
    preview: "/credentials/sertifikat_course_653_4367613_270126215255-1.webp",
    document: "/certificates/sertifikat_course_653_4367613_270126215255.pdf",
    featured: true,
  },
  {
    id: "himatika-peserta-web-dev-2025",
    number: "06/",
    title: "Peserta Lomba Web Development",
    issuer: "HIMATIKA Universitas Teknologi Yogyakarta",
    category: "Competition",
    year: "2025",
    credentialId: "9201260110043",
    issuedAt: "18 December 2025",
    description:
      "Peserta Lomba Web Development dalam kegiatan Himatika Tech Innovaction Challenge yang diselenggarakan oleh Himpunan Mahasiswa Informatika Universitas Teknologi Yogyakarta.",
    preview: "/credentials/Sertifikat Peserta Riki Andika Khusna Saputra.webp",
    document: "/certificates/Sertifikat Peserta Riki Andika Khusna Saputra.pdf",
    featured: false,
  },
  {
    id: "himatika-panitia-tech-innovation-challenge-2024",
    number: "07/",
    title: "Himatika Tech Innovation Challenge",
    role: "Panitia",
    issuer: "HIMATIKA Universitas Teknologi Yogyakarta",
    category: "Organization",
    year: "2024",
    credentialId: "9202250330029",
    issuedAt: "21 December 2024",
    description:
      "Panitia dalam kegiatan Himatika Tech Innovation Challenge yang diselenggarakan oleh Himpunan Mahasiswa Informatika Universitas Teknologi Yogyakarta.",
    preview: "/credentials/Riki Andika Khusna Saputra copy.webp",
    document: "/certificates/Riki Andika Khusna Saputra copy.pdf",
    featured: false,
  },
  {
    id: "himatika-panitia-bootcamp-festika-2025",
    number: "08/",
    title: "Bootcamp Festika AI Nexus",
    role: "Panitia",
    issuer: "HIMATIKA Universitas Teknologi Yogyakarta",
    category: "Organization",
    year: "2025",
    credentialId: "9201251400043",
    issuedAt: "07 June 2025",
    description:
      "Panitia dalam kegiatan Bootcamp Festika bertemakan AI Nexus, Menghubungkan Teknologi dengan Kreativitas Manusia yang diselenggarakan oleh Himpunan Mahasiswa Informatika Universitas Teknologi Yogyakarta.",
    preview:
      "/credentials/Riki Andika Khusna Saputra - 5230411280 (1).webp",
    document:
      "/certificates/Riki Andika Khusna Saputra - 5230411280 (1).pdf",
    featured: false,
  },
  {
    id: "himatika-panitia-workshop-festika-2025",
    number: "09/",
    title: "Workshop Festika AI Nexus",
    role: "Panitia",
    issuer: "HIMATIKA Universitas Teknologi Yogyakarta",
    category: "Organization",
    year: "2025",
    credentialId: "9201251400059",
    issuedAt: "14 June 2025",
    description:
      "Panitia dalam kegiatan Workshop Festika bertemakan AI Nexus, Menghubungkan Teknologi dengan Kreativitas Manusia yang diselenggarakan oleh Himpunan Mahasiswa Informatika Universitas Teknologi Yogyakarta.",
    preview:
      "/credentials/Riki Andika Khusna Saputra - 5230411280.webp",
    document:
      "/certificates/Riki Andika Khusna Saputra - 5230411280.pdf",
    featured: false,
  },
];
