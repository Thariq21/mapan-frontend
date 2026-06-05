import { useState } from "react";

export default function ReviewCv() {
  const [step, setStep] = useState("upload");
  const [file, setFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [careerResult, setCareerResult] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const API_URL = `${import.meta.env.VITE_API_URL}/recommendCareer`;

  const triggerToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const validateAndSetFile = (selectedFile) => {
    const validExtensions = ["pdf", "docx", "doc"];
    const fileExtension = selectedFile.name.split(".").pop().toLowerCase();

    if (!validExtensions.includes(fileExtension)) {
      triggerToast("Format file tidak didukung! Gunakan PDF atau DOCX.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      triggerToast("Ukuran file maksimal 5MB.");
      return;
    }

    setFile(selectedFile);
    triggerToast(`Berhasil memilih file: ${selectedFile.name}`);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

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
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleStartScan = async (e) => {
    e.preventDefault();

    if (!file) {
      triggerToast("Silakan unggah dokumen CV terlebih dahulu!");
      return;
    }

    try {
      setStep("scanning");
      setCareerResult(null);

      const formData = new FormData();
      formData.append("cv", file);

      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Gagal mendapatkan rekomendasi karir.",
        );
      }

      setCareerResult(result.data);
      setStep("result");
    } catch (error) {
      triggerToast(error.message || "Terjadi kesalahan saat memproses CV.");
      setStep("upload");
    }
  };

  const handleReset = () => {
    setStep("upload");
    setFile(null);
    setCareerResult(null);
  };

  const getSectorLabel = (sector) => {
    const labels = {
      Kreatif_Media: "Kreatif & Media",
      Keuangan_Admin: "Keuangan & Administrasi",
      Sales_Pelayanan: "Sales & Pelayanan",
      Teknologi: "Teknologi",
    };

    return labels[sector] || sector;
  };

  const getScoreColor = (percent) => {
    if (percent >= 70) return "text-success-600 bg-success-50";
    if (percent >= 50) return "text-warning-600 bg-warning-50";
    return "text-red-600 bg-red-50";
  };

  const getProgressColor = (percent) => {
    if (percent >= 70) return "bg-success-500";
    if (percent >= 50) return "bg-warning-500";
    return "bg-red-500";
  };

  const recommendations = careerResult?.recommendations || [];
  const userSkills = careerResult?.user_skills_canonical || [];
  const topRecommendation = recommendations[0];

  return (
    <div className="relative min-h-screen bg-linear-to-b from-surface-50 to-white pt-24 pb-16">
      {showToast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-xl bg-surface-900 px-5 py-3.5 text-white shadow-2xl">
          <span className="h-2 w-2 rounded-full bg-accent-400" />
          <p className="text-sm font-medium">{toastMessage}</p>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-primary-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-600">
            Career Recommendation
          </span>

          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Temukan Rekomendasi Karir dari{" "}
            <span className="gradient-text">CV Anda</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-500 sm:text-lg">
            Upload CV Anda, lalu sistem akan menganalisis skill dan memberikan
            rekomendasi karir yang paling sesuai.
          </p>
        </header>

        {step === "upload" && (
          <div className="mx-auto max-w-3xl">
            <form
              onSubmit={handleStartScan}
              className="space-y-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-xl shadow-primary-900/5 sm:p-10"
            >
              <div>
                <label className="mb-3 block text-sm font-semibold text-gray-700">
                  Unggah Dokumen CV
                </label>

                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-12 transition-all duration-300 ${
                    isDragOver
                      ? "scale-[0.99] border-primary-500 bg-primary-50/50"
                      : file
                        ? "border-success-500 bg-success-50/10"
                        : "border-gray-200 hover:border-primary-400 hover:bg-surface-50/50"
                  }`}
                >
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc"
                    onChange={handleFileChange}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />

                  <div
                    className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${
                      file
                        ? "bg-success-100 text-success-500"
                        : "bg-primary-50 text-primary-500"
                    }`}
                  >
                    {file ? (
                      <span className="text-3xl">✅</span>
                    ) : (
                      <span className="text-3xl">📄</span>
                    )}
                  </div>

                  {file ? (
                    <div className="text-center">
                      <p className="text-sm font-bold text-gray-800">
                        {file.name}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB • Klik untuk
                        mengganti file
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-sm font-semibold text-gray-800">
                        Seret & taruh file CV di sini, atau{" "}
                        <span className="text-primary-600 underline">
                          pilih file
                        </span>
                      </p>
                      <p className="mt-2 text-xs text-gray-400">
                        Mendukung PDF, DOC, DOCX maksimal 5MB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-primary-600 to-primary-700 py-4 text-base font-bold text-white shadow-xl shadow-primary-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
              >
                ✨ Dapatkan Rekomendasi Karir
              </button>
            </form>
          </div>
        )}

        {step === "scanning" && (
          <div className="mx-auto max-w-xl py-16 text-center">
            <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-primary-50 text-5xl">
              🔍
            </div>

            <h3 className="mb-2 text-xl font-bold text-gray-900">
              Sedang Menganalisis CV...
            </h3>

            <p className="mb-8 text-sm font-medium text-primary-600">
              Sistem sedang membaca skill dan mencocokkan rekomendasi karir.
            </p>

            <div className="mx-auto h-2.5 max-w-xs overflow-hidden rounded-full bg-gray-100">
              <div className="h-full w-full animate-pulse rounded-full bg-linear-to-r from-primary-500 to-accent-500" />
            </div>
          </div>
        )}

        {step === "result" && (
          <div className="mx-auto max-w-6xl space-y-8">
            <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-surface-900 p-6 text-white shadow-lg sm:flex-row">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-2xl">
                  💼
                </span>

                <div className="text-center sm:text-left">
                  <h3 className="text-lg font-bold">Hasil Rekomendasi Karir</h3>
                  <p className="text-sm text-surface-400">
                    File: <strong className="text-white">{file?.name}</strong>
                  </p>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/20"
              >
                🔄 Upload CV Baru
              </button>
            </div>

            {topRecommendation && (
              <div className="rounded-3xl border border-primary-100 bg-linear-to-r from-primary-50 to-white p-6 shadow-md sm:p-8">
                <div className="grid gap-6 lg:grid-cols-3 lg:items-center">
                  <div className="lg:col-span-2">
                    <span className="mb-3 inline-block rounded-full bg-primary-600 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                      Rekomendasi Teratas
                    </span>

                    <h2 className="text-3xl font-extrabold text-gray-900">
                      {topRecommendation.role_name_id}
                    </h2>

                    <p className="mt-1 text-base font-semibold text-gray-500">
                      {topRecommendation.role_name}
                    </p>

                    <p className="mt-4 text-sm leading-relaxed text-gray-600">
                      Berdasarkan CV yang diunggah, posisi ini menjadi
                      rekomendasi paling sesuai dengan tingkat kecocokan{" "}
                      <strong>{topRecommendation.match_percent}%</strong>.
                    </p>
                  </div>

                  <div className="rounded-3xl bg-white p-6 text-center shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Match Score
                    </p>

                    <div className="mt-3 text-5xl font-extrabold text-primary-600">
                      {topRecommendation.match_percent}%
                    </div>

                    <div className="mt-4 h-3 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className={`h-full rounded-full ${getProgressColor(
                          topRecommendation.match_percent,
                        )}`}
                        style={{
                          width: `${topRecommendation.match_percent}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-success-50 text-2xl">
                  🧠
                </div>

                <h4 className="text-lg font-bold text-gray-900">
                  Skill Terdeteksi
                </h4>

                <p className="mt-1 text-sm text-gray-500">
                  Skill yang berhasil dibaca dari CV.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {userSkills.length > 0 ? (
                    userSkills.map((skill, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-success-50 px-3 py-1.5 text-xs font-bold text-success-600"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-400">
                      Belum ada skill terdeteksi.
                    </span>
                  )}
                </div>
              </div>

              <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-2xl">
                  📊
                </div>

                <h4 className="text-lg font-bold text-gray-900">
                  Total Rekomendasi
                </h4>

                <p className="mt-1 text-sm text-gray-500">
                  Jumlah role yang berhasil dicocokkan.
                </p>

                <p className="mt-5 text-4xl font-extrabold text-primary-600">
                  {recommendations.length}
                </p>
              </div>

              <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-warning-50 text-2xl">
                  ⚙️
                </div>

                <h4 className="text-lg font-bold text-gray-900">
                  Model Version
                </h4>

                <p className="mt-1 text-sm text-gray-500">
                  Versi model yang digunakan.
                </p>

                <p className="mt-5 wrap-break-word text-xs font-semibold text-gray-600">
                  {careerResult?.model_version || "-"}
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-md sm:p-8">
              <header className="mb-6 border-b border-gray-100 pb-5">
                <h4 className="text-xl font-bold text-gray-900">
                  Daftar Rekomendasi Karir
                </h4>

                <p className="mt-1 text-sm text-gray-500">
                  Urutan berdasarkan tingkat kecocokan dari CV yang diunggah.
                </p>
              </header>

              <div className="space-y-5">
                {recommendations.map((item) => (
                  <div
                    key={item.role_id}
                    className="rounded-2xl border border-gray-100 p-5 transition-all hover:border-primary-200 hover:shadow-sm"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-lg font-extrabold text-primary-600">
                          #{item.rank}
                        </div>

                        <div>
                          <h5 className="text-lg font-bold text-gray-900">
                            {item.role_name_id}
                          </h5>

                          <p className="text-sm font-medium text-gray-500">
                            {item.role_name}
                          </p>

                          <span className="mt-3 inline-block rounded-full bg-surface-100 px-3 py-1 text-xs font-semibold text-gray-600">
                            {getSectorLabel(item.sector)}
                          </span>
                        </div>
                      </div>

                      <div className="min-w-45 rounded-2xl bg-surface-50 p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-xs font-bold text-gray-500">
                            Kecocokan
                          </span>

                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-extrabold ${getScoreColor(
                              item.match_percent,
                            )}`}
                          >
                            {item.match_percent}%
                          </span>
                        </div>

                        <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
                          <div
                            className={`h-full rounded-full ${getProgressColor(
                              item.match_percent,
                            )}`}
                            style={{ width: `${item.match_percent}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 grid gap-4 lg:grid-cols-2">
                      <div className="rounded-2xl bg-success-50/50 p-4">
                        <h6 className="mb-3 text-sm font-bold text-success-700">
                          Skill yang Cocok
                        </h6>

                        <div className="flex flex-wrap gap-2">
                          {item.matched_skills.length > 0 ? (
                            item.matched_skills.map((skill, index) => (
                              <span
                                key={index}
                                className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-success-700"
                              >
                                {skill}
                              </span>
                            ))
                          ) : (
                            <p className="text-xs text-gray-500">
                              Belum ada skill yang cocok secara langsung.
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="rounded-2xl bg-warning-50/50 p-4">
                        <h6 className="mb-3 text-sm font-bold text-warning-700">
                          Skill yang Perlu Ditambahkan
                        </h6>

                        <div className="flex flex-wrap gap-2">
                          {item.missing_skills.map((skill, index) => (
                            <span
                              key={index}
                              className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-warning-700"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
              <div className="flex gap-4">
                <span className="text-2xl">💡</span>

                <div>
                  <h4 className="font-bold text-amber-900">
                    Saran Pengembangan CV
                  </h4>

                  <p className="mt-1 text-sm leading-relaxed text-amber-800">
                    Karena skill yang terdeteksi masih terbatas, coba tambahkan
                    skill yang benar-benar Anda kuasai ke dalam CV, terutama
                    tools, software, project, dan pengalaman yang relevan dengan
                    role target.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
