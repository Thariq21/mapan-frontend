export default function StarRating({ rating, maxStars = 5, size = "md" }) {
  const sizeClasses = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const starSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`Rating ${rating} dari ${maxStars} bintang`}
    >
      {Array.from({ length: maxStars }, (_, i) => {
        const filled = i < Math.floor(rating);
        const half = !filled && i < rating;

        return (
          <svg
            key={i}
            className={`${starSize} ${filled ? "text-warning-500" : half ? "text-warning-500" : "text-surface-300"}`}
            fill={filled || half ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={filled || half ? 0 : 1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
        );
      })}
    </div>
  );
}
