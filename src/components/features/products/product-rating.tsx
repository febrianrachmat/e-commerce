import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type ProductRatingProps = {
  rate: number;
  count: number;
  className?: string;
  size?: "sm" | "md";
};

const sizeStyles = {
  sm: {
    star: "size-3.5",
    text: "text-xs md:text-sm",
  },
  md: {
    star: "size-4",
    text: "text-sm md:text-base",
  },
} as const;

export function ProductRating({
  rate,
  count,
  className,
  size = "sm",
}: ProductRatingProps) {
  const rounded = Math.round(rate);
  const styles = sizeStyles[size];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex" aria-hidden>
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={cn(
              styles.star,
              index < rounded
                ? "fill-brand text-brand"
                : "text-muted-foreground/35",
            )}
          />
        ))}
      </div>
      <span className={cn("tabular-nums text-muted-foreground", styles.text)}>
        {rate.toFixed(1)} ({count})
      </span>
    </div>
  );
}
