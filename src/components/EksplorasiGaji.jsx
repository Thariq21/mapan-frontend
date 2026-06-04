import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

export default function EksplorasiGaji() {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch data
  const fetchSalaryData = async (queryJob = '', queryLoc = '') => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://ds-mapan.thrqrhmn.my.id/api/salary-distribution', {
        params: {
          job_title: queryJob || undefined,
          location: queryLoc || undefined
        }
      });
      
      if (Array.isArray(response.data)) {
        setData(response.data.slice(0, 10));
      } else {
        setData([]);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Gagal mengambil data dari server. Silakan coba lagi nanti.");
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch initial data on mount
  useEffect(() => {
    fetchSalaryData();
  }, []);

  const handleSearch = () => {
    fetchSalaryData(jobTitle, location);
  };

  // Custom tooltip for Recharts
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const itemData = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
          <p className="font-bold text-gray-900 mb-1">{itemData.job_title}</p>
          <p className="text-sm text-gray-500 mb-2">{itemData.company_name} &bull; {itemData.location}</p>
          <p className="font-bold text-primary-600">
            Rp {itemData.mean_salary?.toLocaleString('id-ID')}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="py-16 md:py-24 bg-surface-50" id="eksplorasi-gaji">
      <div className="container mx-auto px-4 md:px-8">
        {/* 1. Page Header */}
        <header className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Eksplorasi Gaji</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Temukan insight data gaji dan tren kompensasi berdasarkan data nyata.
          </p>
        </header>

        {/* 2. Filter Section */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 mb-10 hover:shadow-md transition-all">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="flex flex-col gap-2">
              <label htmlFor="input-job" className="text-sm font-semibold text-gray-700">Pekerjaan</label>
              <input 
                id="input-job"
                type="text" 
                placeholder="Contoh: Data Analyst"
                className="border border-gray-200 rounded-lg p-2.5 text-gray-700 outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="input-location" className="text-sm font-semibold text-gray-700">Lokasi</label>
              <input 
                id="input-location"
                type="text" 
                placeholder="Contoh: Jakarta Selatan"
                className="border border-gray-200 rounded-lg p-2.5 text-gray-700 outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            
            <div>
              <button 
                onClick={handleSearch}
                disabled={isLoading}
                className="w-full flex items-center justify-center rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition-all hover:shadow-xl hover:shadow-primary-500/30 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {isLoading ? "Mencari..." : "Cari Data"}
              </button>
            </div>
          </div>
        </div>

        {/* 3. Visual Chart */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 mb-10 shadow-sm hover:shadow-md transition-all">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Grafik Distribusi Gaji</h3>
          
          <div className="h-[400px] w-full relative">
            {isLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-xl">
                <svg className="animate-spin h-10 w-10 text-primary-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-gray-600 font-medium">Memuat data grafik...</p>
              </div>
            )}
            
            {error && !isLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/80 rounded-xl">
                <div className="h-16 w-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-900 font-bold mb-1">Terjadi Kesalahan</p>
                <p className="text-gray-500">{error}</p>
              </div>
            )}
            
            {!isLoading && !error && data.length === 0 && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/80 rounded-xl border-2 border-dashed border-gray-200">
                <div className="h-16 w-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mb-4">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <p className="text-gray-900 font-bold mb-1">Data Tidak Ditemukan</p>
                <p className="text-gray-500 text-center max-w-md">Tidak ada data gaji yang sesuai dengan kriteria pencarian Anda. Coba kata kunci atau lokasi lain.</p>
              </div>
            )}
            
            {data.length > 0 && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis 
                    dataKey="job_title" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    dy={10}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    tickFormatter={(value) => `Rp ${value / 1000000}M`}
                  />
                  <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />
                  <Bar dataKey="mean_salary" radius={[6, 6, 0, 0]} maxBarSize={60}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill="url(#colorGradient)" />
                    ))}
                  </Bar>
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563eb" stopOpacity={1} />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.8} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* 4. Summary Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden">
          <div className="p-6 md:p-8 border-b border-gray-100">
            <h3 className="text-xl font-bold text-gray-900">Ringkasan Data Gaji</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                  <th className="p-4 md:px-8 md:py-5 font-semibold">Posisi Pekerjaan</th>
                  <th className="p-4 md:px-8 md:py-5 font-semibold">Lokasi</th>
                  <th className="p-4 md:px-8 md:py-5 font-semibold">Gaji Median</th>
                  <th className="p-4 md:px-8 md:py-5 font-semibold">Perusahaan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700 text-sm md:text-base">
                {isLoading ? (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-gray-500">Memuat data...</td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-gray-500">Data tidak tersedia.</td>
                  </tr>
                ) : (
                  data.map((row, index) => (
                    <tr key={index} className="hover:bg-primary-50/50 transition-colors">
                      <td className="p-4 md:px-8 md:py-5 font-semibold text-gray-900">{row.job_title}</td>
                      <td className="p-4 md:px-8 md:py-5">{row.location}</td>
                      <td className="p-4 md:px-8 md:py-5 font-bold text-gray-900">
                        Rp {row.mean_salary?.toLocaleString('id-ID')}
                      </td>
                      <td className="p-4 md:px-8 md:py-5 text-gray-500">{row.company_name}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
