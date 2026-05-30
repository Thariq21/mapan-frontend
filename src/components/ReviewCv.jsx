import { useState, useEffect } from "react";

// Mock data recommendations based on industry
const mockRecommendations = {
  teknologi: [
    {
      id: 1,
      category: "Metrik Kuantitatif",
      original: "Mengerjakan frontend website menggunakan React.",
      improved: "Mempercepat waktu pemuatan halaman sebesar 35% dengan menerapkan code-splitting dan lazy loading pada React frontend.",
      reason: "Menambahkan metrik kuantitatif terukur (35%) dan metode penyelesaian (code-splitting, lazy-loading) yang menunjukkan keahlian teknis Anda.",
    },
    {
      id: 2,
      category: "Kata Kerja Aksi",
      original: "Membantu memperbaiki bug di server Node.js.",
      improved: "Mereduksi error rate sistem API Node.js sebesar 18% melalui implementasi unit testing komprehensif dan refactoring modular.",
      reason: "Mengganti kata lemah 'Membantu memperbaiki' dengan kata kerja aksi kuat 'Mereduksi', serta menunjukkan metode kerja yang profesional.",
    },
    {
      id: 3,
      category: "Dampak Bisnis",
      original: "Bertanggung jawab atas database MySQL.",
      improved: "Mengoptimalkan query database MySQL untuk memangkas waktu load dashboard admin dari 5 detik menjadi 1.2 detik, mendukung 10k+ pengguna aktif.",
      reason: "Mengubah deskripsi tugas pasif menjadi pencapaian aktif yang berfokus pada dampak performa dan skala pengguna.",
    }
  ],
  kreatif: [
    {
      id: 1,
      category: "Metrik Kuantitatif",
      original: "Mengelola akun media sosial perusahaan.",
      improved: "Meningkatkan engagement rate Instagram sebesar 120% dalam 3 bulan melalui kurasi konten interaktif dan kampanye ads terarah.",
      reason: "Menampilkan pertumbuhan spesifik (120% engagement) untuk memperkuat portofolio pemasaran Anda.",
    },
    {
      id: 2,
      category: "Kata Kerja Aksi",
      original: "Menulis artikel blog untuk website.",
      improved: "Memproduksi 15+ artikel SEO-optimized yang berhasil mendongkrak organic traffic website sebesar 45% dalam satu semester.",
      reason: "Mengganti kata pasif dengan kata kerja aktif 'Memproduksi' dan melengkapinya dengan pencapaian traffic organik.",
    },
    {
      id: 3,
      category: "Dampak Bisnis",
      original: "Mendesain feeds Instagram dan banner promosi.",
      improved: "Merekonstruksi visual brand identity di platform digital yang sukses meningkatkan CTR (Click-Through Rate) iklan sebesar 2.4x lipat.",
      reason: "Menekankan nilai strategis dari desain visual Anda terhadap konversi bisnis riil.",
    }
  ],
  bisnis: [
    {
      id: 1,
      category: "Metrik Kuantitatif",
      original: "Membuat laporan keuangan bulanan.",
      improved: "Menyusun dan menganalisis laporan portofolio keuangan bulanan senilai Rp 750 Juta+ dengan akurasi 100% menggunakan otomatisasi macro VBA.",
      reason: "Menambahkan besaran nilai aset (Rp 750 Juta) dan alat penunjang produktivitas (macro VBA) untuk validasi kompetensi.",
    },
    {
      id: 2,
      category: "Kata Kerja Aksi",
      original: "Membantu negosiasi dengan klien.",
      improved: "Mengamankan 5 kontrak kemitraan strategis baru B2B senilai Rp 200 Juta yang menaikkan revenue kuartalan divisi sebesar 22%.",
      reason: "Menggunakan kata kerja kuat 'Mengamankan' dibanding 'Membantu', serta menunjukkan dampak langsung pada keuntungan perusahaan.",
    },
    {
      id: 3,
      category: "Dampak Bisnis",
      original: "Melayani keluhan pelanggan.",
      improved: "Mengembangkan sistem retensi pelanggan pasca-pembelian yang sukses mendongkrak indeks kepuasan konsumen (CSAT) dari 3.8 ke 4.7 dari skala 5.",
      reason: "Mengubah deskripsi layanan pelanggan yang reaktif menjadi inisiatif proaktif berskala kepuasan yang terukur.",
    }
  ],
  umum: [
    {
      id: 1,
      category: "Metrik Kuantitatif",
      original: "Menyelesaikan tugas administratif kantor.",
      improved: "Mengotomatisasi 4 alur kerja administrasi rutin menggunakan Google Workspace Suite, menghemat 8 jam kerja per minggu bagi seluruh tim.",
      reason: "Menunjukkan kontribusi nyata terhadap efisiensi waktu kerja operasional tim secara kuantitatif.",
    },
    {
      id: 2,
      category: "Kata Kerja Aksi",
      original: "Bertanggung jawab memimpin jalannya proyek.",
      improved: "Mengorkestrasi proyek lintas divisi beranggotakan 8 staf untuk meluncurkan produk baru tepat waktu dan menghemat budget sebesar 10%.",
      reason: "Mengganti frasa pasif 'Bertanggung jawab memimpin' dengan kata kerja kepemimpinan 'Mengorkestrasi' yang bernilai tinggi.",
    },
    {
      id: 3,
      category: "Dampak Bisnis",
      original: "Membuat presentasi untuk rapat manajemen.",
      improved: "Menyusun 12 deck presentasi analisis pasar strategis yang digunakan dewan direksi untuk merumuskan target ekspansi bisnis tahunan.",
      reason: "Meningkatkan signifikansi dokumen buatan Anda dengan menunjukkan kepada siapa dokumen disajikan dan tujuan strategisnya.",
    }
  ]
};

export default function ReviewCv() {
  const [step, setStep] = useState("upload"); // 'upload', 'scanning', 'result'
  const [file, setFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [industry, setIndustry] = useState("teknologi");
  const [role, setRole] = useState("");
  const [expLevel, setExpLevel] = useState("mid");
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStatusText, setScanStatusText] = useState("Membaca file CV...");
  const [activeTab, setActiveTab] = useState("skor"); // 'skor', 'optimizer', 'rekomendasi'
  const [copiedId, setCopiedId] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Handler for custom notification toast
  const triggerToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndSetFile(droppedFile);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile) => {
    const validExtensions = ["pdf", "docx", "doc"];
    const fileExtension = selectedFile.name.split(".").pop().toLowerCase();

    if (validExtensions.includes(fileExtension)) {
      setFile(selectedFile);
      triggerToast(`Berhasil memilih file: ${selectedFile.name}`);
    } else {
      triggerToast("Format file tidak didukung! Gunakan PDF atau DOCX.");
    }
  };

  const handleStartScan = (e) => {
    e.preventDefault();
    if (!file) {
      triggerToast("Silakan unggah dokumen CV Anda terlebih dahulu!");
      return;
    }
    if (!role.trim()) {
      triggerToast("Silakan masukkan target posisi pekerjaan!");
      return;
    }

    // Switch to scanning phase
    setStep("scanning");
    setScanProgress(0);
  };

  // Effect to handle mock scanning simulation
  useEffect(() => {
    if (step !== "scanning") return;

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        const next = prev + 2;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setStep("result");
          }, 600);
          return 100;
        }

        // Dynamic status updates
        if (next < 25) {
          setScanStatusText("Mengekstrak teks & struktur CV...");
        } else if (next < 50) {
          setScanStatusText("Mencocokkan keyword posisi '" + role + "'...");
        } else if (next < 75) {
          setScanStatusText("Mengevaluasi parameter ATS & keterbacaan...");
        } else {
          setScanStatusText("Memformulasikan rekomendasi optimasi karir...");
        }

        return next;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [step, role]);

  const handleCopyText = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    triggerToast("Rekomendasi berhasil disalin ke clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleReset = () => {
    setStep("upload");
    setFile(null);
    setRole("");
    setScanProgress(0);
    setActiveTab("skor");
  };

  // Fetch target recommendations based on selected industry
  const currentRecommendations = mockRecommendations[industry] || mockRecommendations.umum;

  // Mock scoring calculations
  const totalScore = expLevel === "entry" ? 82 : expLevel === "mid" ? 74 : 67;
  const atsCompatibility = expLevel === "entry" ? 85 : expLevel === "mid" ? 78 : 70;
  const structureScore = 80;
  const impactScore = expLevel === "entry" ? 65 : expLevel === "mid" ? 55 : 45;

  return (
    <div className="relative min-h-screen bg-linear-to-b from-surface-50 to-white pt-24 pb-16">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-xl bg-surface-900 text-white px-5 py-3.5 shadow-2xl animate-fade-in-up">
          <span className="flex h-2 w-2 rounded-full bg-accent-400 animate-pulse" />
          <p className="text-sm font-medium">{toastMessage}</p>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <header className="mb-12 text-center">
          <span className="inline-block mb-3 rounded-full bg-primary-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-600">
            Teknologi Reviewer Pintar
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl tracking-tight">
            Analisis & Optimalkan <span className="gradient-text">CV Anda</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-gray-500 text-base sm:text-lg leading-relaxed">
            Dapatkan evaluasi instan berbasis ATS standar industri serta rekomendasi perbaikan kata kerja aksi dan metrik pencapaian karir.
          </p>
        </header>

        {/* STEP 1: UPLOAD & PARAMETERS */}
        {step === "upload" && (
          <div className="mx-auto max-w-3xl">
            <form onSubmit={handleStartScan} className="space-y-8 rounded-3xl border border-gray-100 bg-white p-6 sm:p-10 shadow-xl shadow-primary-900/5">

              {/* Form Input fields */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Industry Select */}
                <div>
                  <label htmlFor="industry" className="block text-sm font-semibold text-gray-700 mb-2">
                    Target Industri Karir
                  </label>
                  <select
                    id="industry"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-surface-50 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-primary-500 focus:bg-white"
                  >
                    <option value="teknologi">Teknologi & Software</option>
                    <option value="kreatif">Pemasaran, Desain & Kreatif</option>
                    <option value="bisnis">Keuangan, Bisnis & Manajemen</option>
                    <option value="umum">Sektor Lain / Umum</option>
                  </select>
                </div>

                {/* Experience level select */}
                <div>
                  <label htmlFor="expLevel" className="block text-sm font-semibold text-gray-700 mb-2">
                    Tingkat Pengalaman Anda
                  </label>
                  <select
                    id="expLevel"
                    value={expLevel}
                    onChange={(e) => setExpLevel(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-surface-50 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-primary-500 focus:bg-white"
                  >
                    <option value="entry">Fresh Graduate / Entry Level (0-2 thn)</option>
                    <option value="mid">Mid Level / Madya (2-5 thn)</option>
                    <option value="senior">Senior / Eksekutif (5+ thn)</option>
                  </select>
                </div>

                {/* Target Role input */}
                <div className="sm:col-span-2">
                  <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">
                    Target Posisi Pekerjaan
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">💼</span>
                    <input
                      type="text"
                      id="role"
                      placeholder="Contoh: Senior Frontend Developer, Social Media Specialist"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-surface-50 py-3.5 pl-11 pr-4 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-primary-500 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Drag and Drop Zone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Unggah Dokumen CV
                </label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-12 transition-all duration-300 ${isDragOver
                      ? "border-primary-500 bg-primary-50/50 scale-[0.99]"
                      : file
                        ? "border-success-500 bg-success-50/10"
                        : "border-gray-200 hover:border-primary-400 hover:bg-surface-50/50"
                    }`}
                >
                  <input
                    type="file"
                    id="cvFile"
                    accept=".pdf,.docx,.doc"
                    onChange={handleFileChange}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />

                  {/* Icon */}
                  <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 ${file ? "bg-success-100 text-success-500" : "bg-primary-50 text-primary-500"
                    }`}>
                    {file ? (
                      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                      </svg>
                    )}
                  </div>

                  {/* Text */}
                  {file ? (
                    <div className="text-center">
                      <p className="text-sm font-bold text-gray-800">{file.name}</p>
                      <p className="mt-1 text-xs text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB • Klik atau seret file lain untuk mengganti</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-sm font-semibold text-gray-800">
                        Seret & taruh file CV Anda di sini, atau <span className="text-primary-600 underline">pilih file</span>
                      </p>
                      <p className="mt-2 text-xs text-gray-400">Mendukung format PDF, DOCX (Maksimal 5MB)</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="cursor-pointer w-full flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-primary-600 to-primary-700 py-4 text-base font-bold text-white shadow-xl shadow-primary-500/25 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/30 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>✨ Mulai Review CV Instan</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 2: ANIMATION SCANNING */}
        {step === "scanning" && (
          <div className="mx-auto max-w-xl text-center py-16">
            {/* Visual Scanner Mockup */}
            <div className="relative mx-auto mb-10 h-72 w-52 overflow-hidden rounded-2xl border-4 border-gray-100 bg-white shadow-2xl">
              {/* Paper Lines Mockup */}
              <div className="space-y-4 p-6 opacity-30">
                <div className="h-6 w-1/2 rounded-md bg-gray-300" />
                <div className="h-3 w-3/4 rounded bg-gray-200" />
                <div className="space-y-2 pt-6">
                  <div className="h-3 w-full rounded bg-gray-200" />
                  <div className="h-3 w-full rounded bg-gray-200" />
                  <div className="h-3 w-2/3 rounded bg-gray-200" />
                </div>
                <div className="space-y-2 pt-6">
                  <div className="h-3 w-full rounded bg-gray-200" />
                  <div className="h-3 w-5/6 rounded bg-gray-200" />
                </div>
              </div>

              {/* Glowing Scan Line Animation */}
              <div
                className="absolute left-0 right-0 h-1.5 bg-linear-to-r from-primary-400 via-accent-500 to-primary-400 shadow-[0_0_15px_#0ea5e9]"
                style={{
                  animation: "scan-move 2s ease-in-out infinite",
                  top: "0%"
                }}
              />

              {/* Internal scanner style declaration */}
              <style>{`
                @keyframes scan-move {
                  0%, 100% { top: 4%; }
                  50% { top: 94%; }
                }
              `}</style>
            </div>

            {/* Scanning details */}
            <h3 className="text-xl font-bold text-gray-900 mb-2">Sedang Memproses Dokumen CV...</h3>
            <p className="text-sm font-medium text-primary-600 mb-8 h-6">{scanStatusText}</p>

            {/* Progress bar container */}
            <div className="mx-auto max-w-xs overflow-hidden rounded-full bg-gray-100 h-2.5">
              <div
                className="h-full rounded-full bg-linear-to-r from-primary-500 to-accent-500 transition-all duration-75"
                style={{ width: `${scanProgress}%` }}
              />
            </div>
            <span className="mt-2 block text-xs font-bold text-gray-400">{scanProgress}% Selesai</span>
          </div>
        )}

        {/* STEP 3: DASHBOARD ANALYSIS RESULTS */}
        {step === "result" && (
          <div className="space-y-8 animate-fade-in-up">

            {/* Top Info Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-surface-900 p-6 text-white shadow-lg">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-2xl">📊</span>
                <div className="text-center sm:text-left">
                  <h3 className="font-bold text-lg">Laporan Hasil Audit CV</h3>
                  <p className="text-sm text-surface-400">
                    Posisi: <strong className="text-white">{role}</strong> • Industri: {industry.toUpperCase()}
                  </p>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-all active:scale-95"
              >
                🔄 Uji CV Baru
              </button>
            </div>

            {/* Dashboard Tabs Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

              {/* Sidebar Menu (3 cols) */}
              <div className="lg:col-span-3 space-y-3">
                <button
                  onClick={() => setActiveTab("skor")}
                  className={`w-full text-left flex items-center justify-between rounded-xl px-5 py-4 text-sm font-bold transition-all ${activeTab === "skor"
                      ? "bg-primary-600 text-white shadow-lg shadow-primary-500/25 scale-[1.02]"
                      : "bg-white hover:bg-surface-50 text-gray-700 border border-gray-100"
                    }`}
                >
                  <span className="flex items-center gap-3">
                    <span>🎯</span> Skor Evaluasi ATS
                  </span>
                  <span className={`rounded-lg px-2.5 py-0.5 text-xs font-extrabold ${activeTab === "skor" ? "bg-white/20 text-white" : "bg-primary-50 text-primary-600"}`}>
                    {totalScore}/100
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("optimizer")}
                  className={`w-full text-left flex items-center justify-between rounded-xl px-5 py-4 text-sm font-bold transition-all ${activeTab === "optimizer"
                      ? "bg-primary-600 text-white shadow-lg shadow-primary-500/25 scale-[1.02]"
                      : "bg-white hover:bg-surface-50 text-gray-700 border border-gray-100"
                    }`}
                >
                  <span className="flex items-center gap-3">
                    <span>⚡</span> AI Bullet Point Optimizer
                  </span>
                  <span className={`rounded-lg px-2.5 py-0.5 text-xs font-extrabold ${activeTab === "optimizer" ? "bg-white/20 text-white" : "bg-accent-100 text-accent-700"}`}>
                    Baru
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("rekomendasi")}
                  className={`w-full text-left flex items-center justify-between rounded-xl px-5 py-4 text-sm font-bold transition-all ${activeTab === "rekomendasi"
                      ? "bg-primary-600 text-white shadow-lg shadow-primary-500/25 scale-[1.02]"
                      : "bg-white hover:bg-surface-50 text-gray-700 border border-gray-100"
                    }`}
                >
                  <span className="flex items-center gap-3">
                    <span>🛠️</span> Checklist Rekomendasi
                  </span>
                  <span className={`rounded-lg px-2.5 py-0.5 text-xs font-extrabold ${activeTab === "rekomendasi" ? "bg-white/20 text-white" : "bg-warning-50 text-warning-500"}`}>
                    5 Isu
                  </span>
                </button>
              </div>

              {/* Main Content Area (9 cols) */}
              <div className="lg:col-span-9 rounded-3xl border border-gray-100 bg-white p-6 sm:p-8 shadow-md">

                {/* TAB 1: SKOR EVALUASI ATS */}
                {activeTab === "skor" && (
                  <div className="space-y-8 animate-fade-in-up">
                    <header className="border-b border-gray-100 pb-5">
                      <h4 className="text-xl font-bold text-gray-900">Skor Keselarasan ATS & Konten</h4>
                      <p className="text-sm text-gray-500 mt-1">Metrik analisis mendalam terhadap kesiapan dokumen Anda menghadapi parser rekruter.</p>
                    </header>

                    {/* Circular Score & Detail Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-b border-gray-100 pb-8">
                      {/* Overall radial score */}
                      <div className="flex flex-col items-center justify-center p-4 bg-primary-50/20 rounded-2xl border border-primary-50">
                        <div className="relative flex h-36 w-36 items-center justify-center">
                          <svg className="h-full w-full transform -rotate-90">
                            <circle
                              cx="72"
                              cy="72"
                              r="60"
                              className="stroke-gray-100"
                              strokeWidth="10"
                              fill="transparent"
                            />
                            <circle
                              cx="72"
                              cy="72"
                              r="60"
                              className="stroke-primary-600 transition-all duration-1000 ease-out"
                              strokeWidth="10"
                              fill="transparent"
                              strokeDasharray={2 * Math.PI * 60}
                              strokeDashoffset={2 * Math.PI * 60 * (1 - totalScore / 100)}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute flex flex-col items-center">
                            <span className="text-3xl font-extrabold text-gray-900">{totalScore}</span>
                            <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Skor CV</span>
                          </div>
                        </div>
                        <span className="mt-4 text-sm font-semibold text-primary-700">Kategori: Cukup Kompetitif</span>
                      </div>

                      {/* Detail metrics bars */}
                      <div className="md:col-span-2 space-y-5">
                        {/* ATS Compatibility */}
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-sm font-bold text-gray-700">Keterbacaan ATS (ATS Friendly)</span>
                            <span className="text-sm font-extrabold text-gray-900">{atsCompatibility}%</span>
                          </div>
                          <div className="h-2.5 w-full rounded-full bg-gray-100 overflow-hidden">
                            <div className="h-full rounded-full bg-success-500" style={{ width: `${atsCompatibility}%` }} />
                          </div>
                          <p className="text-[11px] text-gray-400 mt-1">Struktur dokumen terdeteksi bersih dari tabel rumit/gambar yang menyulitkan robot scanner.</p>
                        </div>

                        {/* Impact verbs */}
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-sm font-bold text-gray-700">Kekuatan Kata Kerja Aksi (Impact Verbs)</span>
                            <span className="text-sm font-extrabold text-gray-900">{impactScore}%</span>
                          </div>
                          <div className="h-2.5 w-full rounded-full bg-gray-100 overflow-hidden">
                            <div className="h-full rounded-full bg-warning-500" style={{ width: `${impactScore}%` }} />
                          </div>
                          <p className="text-[11px] text-gray-400 mt-1">Sangat kurang menyertakan metrik bisnis terukur dan kata kunci aktif. Perbaiki di tab Optimizer.</p>
                        </div>

                        {/* Formatting */}
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-sm font-bold text-gray-700">Kelengkapan Struktur CV</span>
                            <span className="text-sm font-extrabold text-gray-900">{structureScore}%</span>
                          </div>
                          <div className="h-2.5 w-full rounded-full bg-gray-100 overflow-hidden">
                            <div className="h-full rounded-full bg-primary-500" style={{ width: `${structureScore}%` }} />
                          </div>
                          <p className="text-[11px] text-gray-400 mt-1">Seluruh bagian penting (Kontak, Edukasi, Pengalaman, Keahlian) lengkap dianalisis.</p>
                        </div>
                      </div>
                    </div>

                    {/* Verdict Box */}
                    <div className="rounded-2xl bg-amber-50/50 border border-amber-200/60 p-5 flex gap-4 items-start">
                      <span className="text-2xl mt-0.5">⚠️</span>
                      <div>
                        <h5 className="font-bold text-amber-900 text-sm">Rekomendasi Utama Rekruter</h5>
                        <p className="text-xs text-amber-800 leading-relaxed mt-1">
                          CV Anda memiliki format file dan pembagian seksi yang sangat baik, namun **terlalu pasif**. Agar menarik minat rekruter di posisi **{role}**, Anda disarankan merombak penulisan deskripsi kerja menggunakan formula *Action + Context + Metric* (Gunakan tab *AI Bullet Point Optimizer* untuk bantuan instan).
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: AI BULLET POINT OPTIMIZER */}
                {activeTab === "optimizer" && (
                  <div className="space-y-8 animate-fade-in-up">
                    <header className="border-b border-gray-100 pb-5">
                      <h4 className="text-xl font-bold text-gray-900">AI Bullet Point Optimizer</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Bandingkan penulisan kalimat CV Anda saat ini dengan formula peningkatan terbaik yang disarankan sistem.
                      </p>
                    </header>

                    {/* Optimization cards list */}
                    <div className="space-y-6">
                      {currentRecommendations.map((item) => (
                        <div key={item.id} className="rounded-2xl border border-gray-100 p-5 space-y-4 hover:border-primary-200 hover:shadow-xs transition-all">
                          {/* Top Tag category */}
                          <div className="flex justify-between items-center">
                            <span className="inline-block rounded-md bg-primary-50 px-2.5 py-0.5 text-xs font-bold text-primary-600">
                              Kategori: {item.category}
                            </span>
                            <span className="text-xs text-gray-400 font-medium">Berdasarkan Industri: {industry.toUpperCase()}</span>
                          </div>

                          {/* Before & After Panel */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Before column */}
                            <div className="rounded-xl bg-red-50/40 border border-red-100 p-4">
                              <span className="block text-[10px] font-extrabold uppercase text-red-500 tracking-wider mb-1">❌ SEBELUM (Deskripsi Anda)</span>
                              <p className="text-sm font-medium text-gray-600 italic">"{item.original}"</p>
                            </div>

                            {/* After column */}
                            <div className="rounded-xl bg-success-50/40 border border-success-100 p-4 relative group">
                              <span className="block text-[10px] font-extrabold uppercase text-success-600 tracking-wider mb-1">✨ SESUDAH (Rekomendasi AI)</span>
                              <p className="text-sm font-bold text-gray-800">"{item.improved}"</p>
                            </div>
                          </div>

                          {/* Explanation and Copy Button */}
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3 border-t border-dashed border-gray-100 text-xs">
                            <div className="text-gray-500 leading-relaxed max-w-xl">
                              <strong className="text-gray-700">Analisis AI:</strong> {item.reason}
                            </div>
                            <button
                              onClick={() => handleCopyText(item.id, item.improved)}
                              className={`cursor-pointer inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all shrink-0 active:scale-95 ${copiedId === item.id
                                  ? "bg-success-600 text-white"
                                  : "bg-surface-100 hover:bg-primary-50 hover:text-primary-600 text-gray-700"
                                }`}
                            >
                              {copiedId === item.id ? (
                                <>
                                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                  Tersalin!
                                </>
                              ) : (
                                <>
                                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                  </svg>
                                  Salin Saran
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 3: CHECKLIST REKOMENDASI */}
                {activeTab === "rekomendasi" && (
                  <div className="space-y-8 animate-fade-in-up">
                    <header className="border-b border-gray-100 pb-5">
                      <h4 className="text-xl font-bold text-gray-900">Checklist Tindakan Perbaikan</h4>
                      <p className="text-sm text-gray-500 mt-1">Daftar perbaikan penting yang harus Anda selesaikan sebelum mengirimkan CV.</p>
                    </header>

                    {/* Action Checklist items */}
                    <div className="space-y-4">
                      <div className="flex gap-4 items-start p-4 rounded-xl border border-gray-100">
                        <span className="text-xl shrink-0 mt-0.5">🟢</span>
                        <div>
                          <h5 className="font-bold text-gray-800 text-sm">Gunakan Format PDF Bersih</h5>
                          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                            CV Anda telah berbentuk PDF terindeks dengan baik. Ini mencegah distorsi tata letak saat dibuka di platform HR apa pun.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start p-4 rounded-xl border border-gray-100">
                        <span className="text-xl shrink-0 mt-0.5">⚠️</span>
                        <div>
                          <h5 className="font-bold text-gray-800 text-sm">Tambahkan Metrik Kuantitatif</h5>
                          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                            Sebagian besar deskripsi pekerjaan hanya berupa rincian tanggung jawab. Rekruter menyukai performa bisnis yang terukur seperti persentase peningkatan, durasi waktu, atau nilai nominal uang.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start p-4 rounded-xl border border-gray-100">
                        <span className="text-xl shrink-0 mt-0.5">⚠️</span>
                        <div>
                          <h5 className="font-bold text-gray-800 text-sm">Fokuskan Ringkasan Profil (Summary)</h5>
                          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                            Ringkasan profil Anda di bagian atas masih terlalu panjang lebar. Persingkat menjadi 3 kalimat kuat: Latar belakang keahlian, pencapaian terbaik, dan apa nilai tambah yang Anda bawa untuk posisi **{role}**.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start p-4 rounded-xl border border-gray-100">
                        <span className="text-xl shrink-0 mt-0.5">❌</span>
                        <div>
                          <h5 className="font-bold text-gray-800 text-sm">Kurangi Penggunaan Soft Skills Deskriptif</h5>
                          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                            Hindari mendaftarkan keahlian klise seperti "Dapat bekerja di bawah tekanan" atau "Jujur". Buktikan keterampilan tersebut dalam penjelasan studi kasus pencapaian kerja Anda.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start p-4 rounded-xl border border-gray-100">
                        <span className="text-xl shrink-0 mt-0.5">⚠️</span>
                        <div>
                          <h5 className="font-bold text-gray-800 text-sm">Sesuaikan Tag Kata Kunci (Keywords)</h5>
                          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                            CV Anda masih kekurangan keyword krusial industri untuk target bidang **{industry.toUpperCase()}**. Masukkan beberapa tools kerja relevan di bagian daftar keterampilan.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
