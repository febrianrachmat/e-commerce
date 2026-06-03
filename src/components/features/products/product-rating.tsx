import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type ProductRatingProps = {
  rate: number;
  count: number;
  className?: string;
};

export function ProductRating({ rate, count, className }: ProductRatingProps) {
  const rounded = Math.round(rate);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex" aria-hidden>
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={cn(
              "size-3.5",
              index < rounded
                ? "fill-brand text-brand"
                : "text-muted-foreground/35",
            )}
          />
        ))}
      </div>
      <span className="text-sm text-muted-foreground">
        {rate.toFixed(1)} ({count})
      </span>
    </div>
  );
}
