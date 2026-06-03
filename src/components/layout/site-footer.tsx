import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t py-6">
      <div className="mx-auto max-w-6xl px-4 text-sm text-muted-foreground">
        <p>
          {siteConfig.name} — frontend portfolio (architecture phase)
        </p>
      </div>
    </footer>
  );
}
