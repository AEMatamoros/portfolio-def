import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  /** Seconds per sweep. */
  speed?: number;
  className?: string;
}

type ShinyStyle = CSSProperties & { "--shine-duration": string };

/**
 * Text with a light sweep. A span, so it is valid inside `<a>` and `<button>`. The sweep
 * color is `--shine`, the primary foreground by default, so it suits a `bg-primary` surface.
 */
export function ShinyText({
  text,
  disabled = false,
  speed = 5,
  className,
}: ShinyTextProps) {
  const style: ShinyStyle = { "--shine-duration": `${speed}s` };

  return (
    <span
      className={cn("shiny-text", disabled && "disabled", className)}
      style={style}
    >
      {text}
    </span>
  );
}
