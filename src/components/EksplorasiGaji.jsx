import React from 'react';

const dummyTableData = [
  { id: 1, role: 'Software Engineer', location: 'Jakarta', salary: 'Rp 15.000.000', companies: 'Tokopedia, Gojek' },
  { id: 2, role: 'Data Scientist', location: 'Jakarta', salary: 'Rp 18.000.000', companies: 'Traveloka, Grab' },
  { id: 3, role: 'UI/UX Designer', location: 'Bandung', salary: 'Rp 10.000.000', companies: 'Bukalapak, eFishery' },
  { id: 4, role: 'Product Manager', location: 'Jakarta', salary: 'Rp 22.000.000', companies: 'Gojek, Tiket.com' },
  { id: 5, role: 'Digital Marketer', location: 'Surabaya', salary: 'Rp 8.500.000', companies: 'Pakuwon, Wismilak' },
];

export default function EksplorasiGaji() {
  return (
    <section className="py-16 md:py-24 bg-surface-50" id="eksplorasi-gaji">
      <div className="container mx-auto px-4 md:px-8">
        {/* 1. Page Header */}
        <header className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Eksplorasi Gaji</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Temukan insight data gaji dan tren kompensasi di berbagai industri dan posisi untuk merencanakan karir Anda selanjutnya.
          </p>
        </header>

        {/* 2. Filter Section */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 mb-10 hover:shadow-md transition-all">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="flex flex-col gap-2">
              <label htmlFor="filter-industry" className="text-sm font-semibold text-gray-700">Pilih Industri</label>
              <select id="filter-industry" className="border border-gray-200 rounded-lg p-2.5 text-gray-700 outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50">
                <option>Semua Industri</option>
                <option>Teknologi</option>
                <option>Keuangan</option>
                <option>Kesehatan</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="filter-location" className="text-sm font-semibold text-gray-700">Pilih Lokasi</label>
              <select id="filter-location" className="border border-gray-200 rounded-lg p-2.5 text-gray-700 outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50">
                <option>Semua Lokasi</option>
                <option>Jakarta</option>
                <option>Bandung</option>
                <option>Surabaya</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="filter-experience" className="text-sm font-semibold text-gray-700">Tingkat Pengalaman</label>
              <select id="filter-experience" className="border border-gray-200 rounded-lg p-2.5 text-gray-700 outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50">
                <option>Semua Tingkat</option>
                <option>Junior (0-2 tahun)</option>
                <option>Mid-level (3-5 tahun)</option>
                <option>Senior (5+ tahun)</option>
              </select>
            </div>
            
            <div>
              <button className="w-full rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition-all hover:shadow-xl hover:shadow-primary-500/30 hover:-translate-y-0.5 active:translate-y-0">
                Terapkan Filter
              </button>
            </div>
          </div>
        </div>

        {/* 3. Visual Chart Placeholder */}
        <div className="bg-gradient-to-r from-primary-50 to-white rounded-2xl border-2 border-dashed border-primary-200 p-8 flex items-center justify-center h-80 mb-10 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center group-hover:backdrop-blur-none transition-all duration-500">
            <span className="text-primary-600 font-bold text-xl drop-shadow-sm group-hover:scale-110 transition-transform duration-500">
              Area Visualisasi Grafik Tren Gaji
            </span>
          </div>
          {/* Subtle background decoration to mimic a chart */}
          <div className="absolute bottom-0 left-0 right-0 h-40 opacity-30 flex items-end justify-between px-10 gap-4" aria-hidden="true">
            <div className="w-1/6 bg-primary-200 rounded-t-lg h-1/4"></div>
            <div className="w-1/6 bg-primary-300 rounded-t-lg h-2/4"></div>
            <div className="w-1/6 bg-primary-400 rounded-t-lg h-1/3"></div>
            <div className="w-1/6 bg-primary-500 rounded-t-lg h-3/4"></div>
            <div className="w-1/6 bg-primary-600 rounded-t-lg h-full"></div>
          </div>
        </div>

        {/* 4. Summary Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden">
          <div className="p-6 md:p-8 border-b border-gray-100">
            <h3 className="text-xl font-bold text-gray-900">Ringkasan Data Gaji</h3>
            <p className="text-sm text-gray-500 mt-1">Berdasarkan filter yang diterapkan saat ini.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                  <th className="p-4 md:px-8 md:py-5 font-semibold">Posisi Pekerjaan</th>
                  <th className="p-4 md:px-8 md:py-5 font-semibold">Lokasi</th>
                  <th className="p-4 md:px-8 md:py-5 font-semibold">Gaji Median</th>
                  <th className="p-4 md:px-8 md:py-5 font-semibold">Perusahaan Teratas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700 text-sm md:text-base">
                {dummyTableData.map((row) => (
                  <tr key={row.id} className="hover:bg-primary-50/50 transition-colors">
                    <td className="p-4 md:px-8 md:py-5 font-semibold text-gray-900">{row.role}</td>
                    <td className="p-4 md:px-8 md:py-5">{row.location}</td>
                    <td className="p-4 md:px-8 md:py-5 font-bold text-gray-900">{row.salary}</td>
                    <td className="p-4 md:px-8 md:py-5 text-gray-500">{row.companies}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
