"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type QuantityStepperProps = {
  value: number;
  onChange: (value: number) => void;
  label: string;
  className?: string;
};

export function QuantityStepper({
  value,
  onChange,
  label,
  className,
}: QuantityStepperProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-lg border border-border/80 bg-background",
        className,
      )}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={`${label} decrease`}
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
      >
        <Minus />
      </Button>
      <span
        className="min-w-8 text-center text-sm font-medium tabular-nums"
        aria-live="polite"
        aria-label={label}
      >
        {value}
      </span>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={`${label} increase`}
        onClick={() => onChange(value + 1)}
      >
        <Plus />
      </Button>
    </div>
  );
}
