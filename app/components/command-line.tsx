import type React from "react";
import { cn } from "~/lib/utils";
import { type TextProps } from "./ui/text";
import type { ElementType } from "react";

const defaultElement = "h2";

export function CommandLine<E extends ElementType = typeof defaultElement>({
  command,
  ariaLabel,
  location = "~",
  variant = "default",
  className,
  as,
  ...props
}: {
  command?: string;
  ariaLabel?: string;
  location?: string;
  ariaHidden?: boolean;
  variant?: "default" | "danger";
} & TextProps<E>) {
  const Component = as || defaultElement;

  return (
    <Component
      className={cn("relative", className)}
      aria-label={ariaLabel}
      {...props}
    >
      <span
        className={`absolute ${variant !== "danger" ? "text-green-400" : "text-red-400"} text-2xl leading-none -left-14`}
        aria-hidden
      >
        {`•`}
      </span>
      <span className="font-semibold text-violet-400" aria-hidden>
        {`me@sronnaim:`}
      </span>
      <span className="font-semibold text-indigo-500" aria-hidden>
        {location}
      </span>
      {variant === "default" && <span aria-hidden>{`$ ${command}`}</span>}
      {variant === "default" && (
        <span aria-hidden className="whitespace-pre-wrap text-foreground/70">
          {`\t# ${ariaLabel}`}
        </span>
      )}
    </Component>
  );
}
