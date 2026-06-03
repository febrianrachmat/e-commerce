import { cn } from "@/lib/utils";

type FullBleedProps = {
  children: React.ReactNode;
  className?: string;
};

export function FullBleed({ children, className }: FullBleedProps) {
  return (
    <div
      className={cn(
        "relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2",
        className,
      )}
    >
      {children}
    </div>
  );
}
