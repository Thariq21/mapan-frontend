import { useState } from "react";

export default function PredictSalary() {
  const [formData, setFormData] = useState({
    job_title: "",
    company: "",
    location: "",
  });

  const [salaryResult, setSalaryResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const API_URL = `${import.meta.env.VITE_API_URL}/predictSalary`;

  const triggerToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const formatRupiah = (value) => {
    if (value === null || value === undefined || isNaN(value)) return "-";

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePredictSalary = async (e) => {
    e.preventDefault();

    if (!formData.job_title.trim()) {
      triggerToast("Job title wajib diisi!");
      return;
    }

    if (!formData.company.trim()) {
      triggerToast("Nama perusahaan wajib diisi!");
      return;
    }

    if (!formData.location.trim()) {
      triggerToast("Lokasi wajib diisi!");
      return;
    }

    try {
      setIsLoading(true);
      setSalaryResult(null);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          job_title: formData.job_title,
          company: formData.company,
          location: formData.location,
        }),
      });

      const result = await response.json();

      console.log("SALARY RESULT:", result);

      if (!response.ok) {
        throw new Error(result.message || "Gagal memprediksi salary.");
      }

      setSalaryResult(result.data || result);
      triggerToast("Prediksi salary berhasil diambil!");
    } catch (error) {
      triggerToast(error.message || "Terjadi kesalahan saat memproses data.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      job_title: "",
      company: "",
      location: "",
    });
    setSalaryResult(null);
  };

  const predictedSalary = salaryResult?.predicted_salary_idr ?? null;
  const currency = salaryResult?.currency || "IDR";
  const modelVersion = salaryResult?.model_version || "-";

  const monthlySalary = predictedSalary;
  const yearlySalary = predictedSalary ? predictedSalary * 12 : null;
  const dailySalary = predictedSalary ? Math.round(predictedSalary / 22) : null;

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
            Salary Estimator
          </span>

          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Prediksi Salary Berdasarkan{" "}
            <span className="gradient-text">Job Information</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-500 sm:text-lg">
            Masukkan posisi, perusahaan, dan lokasi pekerjaan untuk mendapatkan
            estimasi salary bulanan dalam Rupiah.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <form
              onSubmit={handlePredictSalary}
              className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl shadow-primary-900/5 sm:p-8"
            >
              <div className="mb-8">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-3xl">
                  💰
                </div>

                <h2 className="text-xl font-bold text-gray-900">
                  Input Data Pekerjaan
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Isi data sesuai posisi yang ingin diprediksi salary-nya.
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Job Title
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      💼
                    </span>

                    <input
                      type="text"
                      name="job_title"
                      value={formData.job_title}
                      onChange={handleChange}
                      placeholder="Contoh: Backend Developer"
                      className="w-full rounded-xl border border-gray-200 bg-surface-50 py-3.5 pl-11 pr-4 text-sm text-gray-800 outline-none transition focus:border-primary-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Company
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      🏢
                    </span>

                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Contoh: PT. GOTO"
                      className="w-full rounded-xl border border-gray-200 bg-surface-50 py-3.5 pl-11 pr-4 text-sm text-gray-800 outline-none transition focus:border-primary-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Location
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      📍
                    </span>

                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Contoh: Jakarta"
                      className="w-full rounded-xl border border-gray-200 bg-surface-50 py-3.5 pl-11 pr-4 text-sm text-gray-800 outline-none transition focus:border-primary-500 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-primary-600 to-primary-700 py-4 text-base font-bold text-white shadow-xl shadow-primary-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? "⏳ Memproses..." : "✨ Predict Salary"}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-2xl border border-gray-200 bg-white px-6 py-4 text-sm font-bold text-gray-600 transition hover:bg-gray-50"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-7">
            {!salaryResult && !isLoading && (
              <div className="flex h-full min-h-115 flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-white p-8 text-center shadow-md">
                <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-3xl bg-primary-50 text-5xl">
                  📈
                </div>

                <h3 className="text-xl font-bold text-gray-900">
                  Hasil Prediksi Akan Muncul di Sini
                </h3>

                <p className="mt-2 max-w-md text-sm leading-relaxed text-gray-500">
                  Isi form pekerjaan, lalu klik tombol Predict Salary untuk
                  melihat estimasi gaji.
                </p>
              </div>
            )}

            {isLoading && (
              <div className="flex h-full min-h-115 flex-col items-center justify-center rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-md">
                <div className="mb-6 flex h-24 w-24 animate-pulse items-center justify-center rounded-3xl bg-primary-50 text-5xl">
                  🔍
                </div>

                <h3 className="text-xl font-bold text-gray-900">
                  Sedang Memprediksi Salary...
                </h3>

                <p className="mt-2 text-sm text-primary-600">
                  Sistem sedang memproses data pekerjaan Anda.
                </p>

                <div className="mt-8 h-2.5 w-full max-w-xs overflow-hidden rounded-full bg-gray-100">
                  <div className="h-full w-full animate-pulse rounded-full bg-linear-to-r from-primary-500 to-accent-500" />
                </div>
              </div>
            )}

            {salaryResult && !isLoading && (
              <div className="space-y-6">
                <div className="overflow-hidden rounded-3xl border border-primary-100 bg-white shadow-xl">
                  <div className="bg-linear-to-r from-primary-600 to-primary-700 p-6 text-white sm:p-8">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <span className="mb-3 inline-block rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                          Hasil Prediksi Salary
                        </span>

                        <h2 className="text-2xl font-extrabold sm:text-3xl">
                          {formData.job_title}
                        </h2>

                        <p className="mt-2 text-sm font-medium text-white/80">
                          {formData.company} • {formData.location}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-white/15 px-4 py-3 text-sm font-bold">
                        {currency}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8">
                    <div className="rounded-3xl bg-primary-50 p-6 text-center">
                      <p className="text-xs font-bold uppercase tracking-wider text-primary-500">
                        Estimasi Salary Bulanan
                      </p>

                      <p className="mt-3 text-4xl font-extrabold text-primary-700 sm:text-5xl">
                        {formatRupiah(monthlySalary)}
                      </p>

                      <p className="mt-3 text-sm text-gray-500">
                        Perkiraan gaji berdasarkan data posisi, perusahaan, dan
                        lokasi yang dimasukkan.
                      </p>
                    </div>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-2xl border border-gray-100 bg-surface-50 p-5">
                        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-success-50 text-2xl">
                          📅
                        </div>

                        <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                          Estimasi Tahunan
                        </p>

                        <p className="mt-2 text-xl font-extrabold text-gray-900">
                          {formatRupiah(yearlySalary)}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-gray-100 bg-surface-50 p-5">
                        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-warning-50 text-2xl">
                          🧾
                        </div>

                        <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                          Estimasi Harian
                        </p>

                        <p className="mt-2 text-xl font-extrabold text-gray-900">
                          {formatRupiah(dailySalary)}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          Perhitungan 22 hari kerja/bulan
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-5">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h4 className="font-bold text-gray-900">
                            Model yang Digunakan
                          </h4>

                          <p className="mt-1 text-sm text-gray-500">
                            Sistem prediksi salary aktif.
                          </p>
                        </div>

                        <span className="rounded-full bg-surface-100 px-4 py-2 text-xs font-bold text-gray-600">
                          {modelVersion}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
                  <div className="flex gap-4">
                    <span className="text-2xl">💡</span>

                    <div>
                      <h4 className="font-bold text-amber-900">
                        Catatan Prediksi
                      </h4>

                      <p className="mt-1 text-sm leading-relaxed text-amber-800">
                        Hasil ini merupakan estimasi dari model dan bisa berbeda
                        dengan offering aktual. Salary biasanya dipengaruhi juga
                        oleh pengalaman, skill teknis, level posisi, benefit,
                        dan proses negosiasi.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
