"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ProductFiltersToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;
  sort: string;
  sortLabel: string;
  onSortChange: (value: string | null) => void;
  sortOptions: { value: string; label: string }[];
  category?: string;
  categories: string[];
  categoryLabel: (value: string) => string;
  onCategoryChange: (value?: string) => void;
  allCategoriesLabel: string;
  resultCountLabel?: string;
};

export function ProductFiltersToolbar({
  search,
  onSearchChange,
  searchPlaceholder,
  sort,
  sortLabel,
  onSortChange,
  sortOptions,
  category,
  categories,
  categoryLabel,
  onCategoryChange,
  allCategoriesLabel,
  resultCountLabel,
}: ProductFiltersToolbarProps) {
  return (
    <div className="rounded-xl border border-border/70 bg-surface p-3 md:p-4">
      <div className="space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="search"
              placeholder={searchPlaceholder}
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              className="h-10 border-border/70 bg-muted/35 pl-10 dark:bg-muted/25"
            />
          </div>

          <div className="flex items-center gap-3 sm:shrink-0">
            {resultCountLabel ? (
              <p className="hidden text-xs font-medium tracking-wide text-muted-foreground sm:block">
                {resultCountLabel}
              </p>
            ) : null}

            <Select value={sort} onValueChange={onSortChange}>
              <SelectTrigger className="h-10 w-full border-border/70 bg-muted/35 dark:bg-muted/25 sm:w-44">
                <span className="truncate">{sortLabel}</span>
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <Button
            type="button"
            size="sm"
            variant={category ? "outline" : "default"}
            className={cn(
              "shrink-0 rounded-full tracking-wide uppercase",
              !category && "bg-foreground text-background hover:bg-foreground/90",
            )}
            onClick={() => onCategoryChange(undefined)}
          >
            {allCategoriesLabel}
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              type="button"
              size="sm"
              variant={category === cat ? "default" : "outline"}
              className={cn(
                "shrink-0 rounded-full tracking-wide uppercase",
                category === cat &&
                  "bg-foreground text-background hover:bg-foreground/90",
              )}
              onClick={() => onCategoryChange(cat)}
            >
              {categoryLabel(cat)}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
