"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Option = { value: string; label: string };

interface BehaviorChipProps {
  value: string | undefined;
  onChange: (next: string) => void;
  options: Option[];
  ariaLabel: string;
  className?: string;
}

const BehaviorChip: React.FC<BehaviorChipProps> = ({
  value,
  onChange,
  options,
  ariaLabel,
  className,
}) => {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex flex-wrap rounded-md border border-input p-0.5 gap-0.5",
        className,
      )}
    >
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.value)}
            className={cn(
              "min-h-9 px-3 py-1.5 text-sm rounded-[5px] transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};

export const YES_NO_OPTIONS: Option[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

export const TERNARY_OPTIONS: Option[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "sometimes", label: "Sometimes" },
];

export default BehaviorChip;
