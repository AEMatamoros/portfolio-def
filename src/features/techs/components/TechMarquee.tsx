import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { SvgIcon } from "@/components/atoms/SvgIcon";
import { Button } from "@/components/ui/button";
import type { Tech } from "@/features/techs/techs.types";

interface TechMarqueeProps {
  techs: readonly Tech[];
  /** Fixed accessible name of the pause button; its state is `aria-pressed`. */
  pauseLabel: string;
}

function TechList({
  techs,
  hidden,
}: {
  techs: readonly Tech[];
  hidden?: boolean;
}) {
  return (
    <ul aria-hidden={hidden || undefined}>
      {techs.map((tech) => (
        <li
          key={tech.id}
          className="flex w-24 flex-col items-center gap-2 text-center text-muted-foreground transition-colors hover:text-foreground"
        >
          <SvgIcon icon={tech.icon} className="size-10" />
          <span className="text-sm font-semibold">{tech.name}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Seamless logo loop. The track holds the list twice and slides by -50%, so the
 * second copy is `aria-hidden` and each technology is announced once. Hover and
 * keyboard focus pause it, the button pauses it until pressed again, and under
 * reduced motion CSS shows a single wrapped static set instead.
 */
export function TechMarquee({ techs, pauseLabel }: TechMarqueeProps) {
  const [paused, setPaused] = useState(false);

  return (
    <div className="marquee" data-paused={paused || undefined}>
      <div className="marquee-viewport">
        <div className="marquee-track">
          <TechList techs={techs} />
          <TechList techs={techs} hidden />
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="marquee-pause mx-auto mt-8 flex"
        aria-label={pauseLabel}
        aria-pressed={paused}
        onClick={() => setPaused((value) => !value)}
      >
        {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
      </Button>
    </div>
  );
}
