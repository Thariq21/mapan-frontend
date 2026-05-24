import { salaryInsights } from '../data/dummyData';

export default function SalaryInsights() {
  return (
    <section id="gaji" className="py-16 md:py-24" aria-labelledby="salary-heading">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section header */}
        <header className="mb-10 text-center">
          <span className="inline-block mb-3 rounded-full bg-primary-100 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-primary-700">
            Data Terkini
          </span>
          <h2 id="salary-heading" className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Wawasan <span className="gradient-text">Gaji</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Bandingkan rata-rata gaji di berbagai posisi teknologi di Indonesia.
            Data dikumpulkan dari ribuan profesional.
          </p>
        </header>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {salaryInsights.map((item, index) => (
            <article
              key={item.id}
              className={`group relative flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm hover:shadow-md transition-all animate-fade-in-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
              id={`salary-card-${item.id}`}
            >
              {/* Icon + Category */}
              <div className="flex justify-between items-start">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-2xl shadow-sm group-hover:bg-primary-100 transition-colors">
                  {item.icon}
                </div>
                <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-600">
                  {item.category}
                </span>
              </div>

              {/* Title */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{item.company}</p>
              </div>

              {/* Salary */}
              <div className="mt-auto pt-4 border-t border-gray-100">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Rata-rata Gaji / bulan
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {item.avgSalary}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 rounded-lg bg-success-500/10 px-2.5 py-1 text-sm font-semibold text-success-500">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                    </svg>
                    {item.growth}
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Rentang: {item.salaryRange}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
