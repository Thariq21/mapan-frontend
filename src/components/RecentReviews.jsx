import { recentReviews } from '../data/dummyData';
import StarRating from './StarRating';

export default function RecentReviews() {
  return (
    <section className="py-16 md:py-24" aria-labelledby="reviews-heading">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        {/* Section header */}
        <header className="mb-10 text-center">
          <span className="inline-block mb-3 rounded-full bg-primary-100 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-primary-700">
            Dari Komunitas
          </span>
          <h2 id="reviews-heading" className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Ulasan <span className="gradient-text">Terbaru</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Ulasan jujur dari para profesional yang telah bekerja di perusahaan-perusahaan ini.
          </p>
        </header>

        {/* Review list */}
        <div className="space-y-8">
          {recentReviews.map((review, index) => (
            <article
              key={review.id}
              className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm hover:shadow-md transition-all"
              id={`review-item-${review.id}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Review header */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{review.title}</h3>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                    <span className="font-semibold text-primary-600">{review.company}</span>
                    <span aria-hidden="true">·</span>
                    <span>{review.role}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      {review.location}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <StarRating rating={review.rating} />
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
                    {review.date}
                  </span>
                </div>
              </div>

              {/* Pros & Cons */}
              <div className="grid gap-5 sm:grid-cols-2 mt-2">
                {/* Pros */}
                <div className="rounded-xl bg-success-500/5 p-5 border border-success-500/10">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-success-500/15 text-success-500">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                    <h4 className="text-sm font-bold text-success-500">Kelebihan</h4>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-600">{review.pros}</p>
                </div>

                {/* Cons */}
                <div className="rounded-xl bg-red-500/5 p-5 border border-red-500/10">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/15 text-red-500">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </span>
                    <h4 className="text-sm font-bold text-red-500">Kekurangan</h4>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-600">{review.cons}</p>
                </div>
              </div>

              {/* Helpful */}
              <div className="mt-4 flex items-center gap-2 pt-5 border-t border-gray-100">
                <button
                  className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-500 transition-all hover:border-primary-300 hover:bg-primary-50 hover:text-primary-600"
                  id={`review-helpful-${review.id}`}
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                  </svg>
                  Bermanfaat ({review.helpful})
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
