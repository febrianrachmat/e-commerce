"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { CategoryTile } from "@/components/features/home/category-tiles";

type CategoryTilesShowcaseProps = {
  tiles: CategoryTile[];
  shopLabel: string;
};

const panelTints = [
  "bg-surface",
  "bg-muted/55",
  "bg-secondary/35",
] as const;

function CategoryPanel({
  tile,
  index,
  shopLabel,
  className,
}: {
  tile: CategoryTile;
  index: number;
  shopLabel: string;
  className?: string;
}) {
  return (
    <Link
      href={tile.href}
      className={cn(
        "group relative min-w-0 flex-1 overflow-hidden border border-border/60 transition-[flex-grow,background-color,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:z-10 hover:flex-[2.75] hover:border-transparent hover:bg-foreground hover:shadow-[0_32px_64px_-32px_rgba(0,0,0,0.55)]",
        panelTints[index % panelTints.length],
        className,
      )}
    >
      <span className="absolute left-4 top-4 z-20 font-display text-[0.625rem] font-semibold tracking-[0.32em] text-muted-foreground transition-colors duration-500 group-hover:text-background/50">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
      >
        <Image
          src={tile.image}
          alt=""
          fill
          className="scale-125 object-cover object-center opacity-25 blur-3xl saturate-150"
          sizes="40vw"
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 top-12 flex items-center justify-center px-4 pb-20 pt-2 md:top-14 md:pb-24">
        <div className="relative h-full w-full max-w-[9rem] transition-all duration-700 ease-out group-hover:max-w-[13rem] group-hover:scale-105 md:max-w-[10rem] md:group-hover:max-w-[15rem]">
          <Image
            src={tile.image}
            alt={tile.label}
            fill
            className="object-contain object-center drop-shadow-[0_20px_40px_rgba(0,0,0,0.22)] transition-all duration-700 group-hover:drop-shadow-[0_28px_56px_rgba(0,0,0,0.45)]"
            sizes="(max-width: 768px) 40vw, 20vw"
          />
        </div>
      </div>

      <p className="absolute bottom-6 left-1/2 z-20 max-h-[70%] -translate-x-1/2 truncate font-display text-[0.6875rem] font-semibold tracking-[0.38em] uppercase text-foreground/55 transition-all duration-500 group-hover:opacity-0 md:left-5 md:top-1/2 md:bottom-auto md:max-h-none md:-translate-x-0 md:-translate-y-1/2 md:[writing-mode:vertical-rl] md:rotate-180">
        {tile.label}
      </p>

      <div className="absolute inset-x-0 bottom-0 z-20 translate-y-3 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:p-6">
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0 space-y-1">
            <p className="font-heading text-3xl font-light tracking-wide text-background lg:text-4xl">
              {tile.label}
            </p>
            <p className="text-[0.625rem] font-semibold tracking-[0.22em] uppercase text-background/65">
              {shopLabel}
            </p>
          </div>
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-background/30 bg-background/10 text-background backdrop-blur-sm">
            <ArrowUpRight className="size-4" aria-hidden />
          </span>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-foreground/0 to-transparent transition-colors duration-500 group-hover:from-foreground/80" />
    </Link>
  );
}

function CategoryScrollCard({
  tile,
  index,
  shopLabel,
}: {
  tile: CategoryTile;
  index: number;
  shopLabel: string;
}) {
  return (
    <Link
      href={tile.href}
      className="group relative flex h-[17.5rem] w-[min(82vw,20rem)] shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-border/70 bg-foreground"
    >
      <Image
        src={tile.image}
        alt=""
        fill
        aria-hidden
        className="scale-110 object-cover opacity-30 blur-2xl"
        sizes="82vw"
      />

      <div className="relative z-10 flex flex-1 flex-col p-5">
        <span className="font-display text-[0.625rem] font-semibold tracking-[0.32em] text-background/45">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="relative mx-auto mt-2 h-[7.5rem] w-full flex-1">
          <Image
            src={tile.image}
            alt={tile.label}
            fill
            className="object-contain object-center drop-shadow-lg"
            sizes="82vw"
          />
        </div>

        <div className="mt-auto flex items-end justify-between gap-3">
          <div>
            <p className="font-heading text-2xl font-light text-background">
              {tile.label}
            </p>
            <p className="mt-1 text-[0.625rem] font-semibold tracking-[0.2em] uppercase text-background/60">
              {shopLabel}
            </p>
          </div>
          <ArrowUpRight className="size-4 shrink-0 text-background/70" aria-hidden />
        </div>
      </div>
    </Link>
  );
}

export function CategoryTilesShowcase({
  tiles,
  shopLabel,
}: CategoryTilesShowcaseProps) {
  return (
    <>
      <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden">
        {tiles.map((tile, index) => (
          <CategoryScrollCard
            key={tile.href}
            tile={tile}
            index={index}
            shopLabel={shopLabel}
          />
        ))}
      </div>

      <div className="hidden h-[min(44vh,26rem)] gap-1 md:flex lg:h-[min(48vh,30rem)]">
        {tiles.map((tile, index) => (
          <CategoryPanel
            key={tile.href}
            tile={tile}
            index={index}
            shopLabel={shopLabel}
          />
        ))}
      </div>
    </>
  );
}
