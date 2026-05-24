import { useState } from "react";

export default function HeroSection() {
  const [jobQuery, setJobQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Placeholder: will integrate with real search later
    console.log("Cari:", jobQuery, locationQuery);
  };

  return (
    <section
      id="beranda"
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden hero-pattern"
    >
      {/* Background decorative blobs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-32 -left-32 h-125 w-125 rounded-full bg-primary-400/10 blur-3xl animate-float" />
        <div
          className="absolute -bottom-40 -right-40 h-150 w-150 rounded-full bg-accent-400/8 blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-75 w-75 rounded-full bg-primary-200/10 blur-2xl" />
      </div>

      {/* Dot grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle, #1e40af 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 md:px-8 pt-24 pb-16 text-center max-w-5xl">
        {/* Badge */}
        <div className="animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-500"></span>
          </span>
          Platform Transisi Karir #1 di Indonesia
        </div>

        {/* Headline */}
        <h1 className="animate-fade-in-up-delay-1 text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
          Temukan Jalur <span className="gradient-text">Pertumbuhan</span>{" "}
          <br className="hidden sm:block" />
          Karirmu
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-up-delay-2 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-500 sm:text-xl">
          Jelajahi wawasan gaji, ulasan perusahaan, dan peluang karir terbaik.
          Buat keputusan karir yang tepat dengan data yang akurat.
        </p>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="animate-fade-in-up-delay-3 mx-auto mt-10 max-w-3xl"
          id="hero-search-form"
        >
          <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-2 shadow-xl shadow-primary-900/5 sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:p-1.5">
            {/* Job title input */}
            <div className="relative flex-1">
              <svg
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <input
                type="text"
                placeholder="Nama Perusahaan atau Posisi"
                value={jobQuery}
                onChange={(e) => setJobQuery(e.target.value)}
                className="w-full rounded-xl bg-transparent py-3.5 pl-12 pr-4 text-sm text-gray-800 placeholder-gray-400 outline-none transition-colors focus:bg-primary-50/50 sm:rounded-full"
                id="hero-input-job"
              />
            </div>

            {/* Divider */}
            <div
              className="hidden sm:block h-8 w-px bg-gray-200"
              aria-hidden="true"
            />

            {/* Location input */}
            <div className="relative flex-1">
              <svg
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Lokasi"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                className="w-full rounded-xl bg-transparent py-3.5 pl-12 pr-4 text-sm text-gray-800 placeholder-gray-400 outline-none transition-colors focus:bg-primary-50/50 sm:rounded-full"
                id="hero-input-location"
              />
            </div>

            {/* Search button */}
            <button
              type="submit"
              className="cursor-pointer flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-primary-600 to-primary-700 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/30 hover:-translate-y-0.5 active:translate-y-0 sm:rounded-full"
              id="hero-search-btn"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              Cari
            </button>
          </div>
        </form>

        {/* Quick stats */}
        <div className="animate-fade-in-up-delay-3 mx-auto mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </span>
            <span>
              <strong className="text-gray-800">12.000+</strong> Perusahaan
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-500/10 text-accent-600">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15"
                />
              </svg>
            </span>
            <span>
              <strong className="text-gray-800">50.000+</strong> Ulasan
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-success-500/10 text-success-500">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75"
                />
              </svg>
            </span>
            <span>
              <strong className="text-gray-800">8.500+</strong> Data Gaji
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
