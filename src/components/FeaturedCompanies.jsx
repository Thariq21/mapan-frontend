import { featuredCompanies } from "../data/dummyData";
import StarRating from "./StarRating";

export default function FeaturedCompanies() {
  return (
    <section
      className="py-16 md:py-24 bg-linear-to-b from-surface-50 to-white"
      aria-labelledby="companies-heading"
    >
      <div className="container mx-auto px-4 md:px-8">
        {/* Section header */}
        <header className="mb-10 text-center">
          <span className="inline-block mb-3 rounded-full bg-accent-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-accent-600">
            Pilihan Terbaik
          </span>
          <h2
            id="companies-heading"
            className="text-3xl font-bold text-gray-900 sm:text-4xl"
          >
            Perusahaan <span className="gradient-text">Pilihan</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Perusahaan-perusahaan terkemuka dengan peluang pertumbuhan karir
            terbaik di Indonesia.
          </p>
        </header>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredCompanies.map((company, index) => (
            <article
              key={company.id}
              className="group relative flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm hover:shadow-md transition-all"
              style={{ animationDelay: `${index * 0.1}s` }}
              id={`company-card-${company.id}`}
            >
              {/* Top colored accent bar */}
              <div
                className="absolute top-0 left-6 right-6 h-1 rounded-b-full opacity-60 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: company.color }}
              />

              {/* Logo & Name */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl shadow-sm"
                    style={{ backgroundColor: `${company.color}15` }}
                  >
                    {company.logo}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {company.name}
                    </h3>
                    <p className="text-sm text-gray-500">{company.industry}</p>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <StarRating rating={company.rating} />
                <span className="text-sm font-semibold text-gray-700">
                  {company.rating}
                </span>
                <span className="text-sm text-gray-500">
                  ({company.reviewCount} ulasan)
                </span>
              </div>

              {/* Details */}
              <div className="mt-auto flex flex-col gap-3 border-t border-gray-100 pt-4">
                {/* Salary range */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">Rentang Gaji</p>
                  <p className="text-base font-bold text-gray-900">
                    {company.salaryRange}
                  </p>
                </div>

                {/* Growth score */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-sm text-gray-500">Skor Pertumbuhan</p>
                    <span className="text-sm font-bold text-primary-600">
                      {company.growthScore}/100
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-primary-500 to-accent-500 transition-all duration-700"
                      style={{ width: `${company.growthScore}%` }}
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
