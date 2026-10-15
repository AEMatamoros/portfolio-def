import type { CSSProperties } from "react";

interface HeroBackgroundProps {
  lightSrc: string;
  darkSrc: string;
}

type BackgroundStyle = CSSProperties & {
  "--hero-light": string;
  "--hero-dark": string;
};

/**
 * Decorative pattern behind the hero. Both images are custom properties and the `dark:`
 * variant picks one in CSS, so the swap follows the `.dark` class with no JavaScript and
 * the browser fetches only the pattern that is in use.
 */
export function HeroBackground({ lightSrc, darkSrc }: HeroBackgroundProps) {
  const style: BackgroundStyle = {
    "--hero-light": `url("${lightSrc}")`,
    "--hero-dark": `url("${darkSrc}")`,
  };

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div
        style={style}
        className="absolute inset-0 animate-bg-move bg-[image:var(--hero-light)] bg-cover bg-center dark:bg-[image:var(--hero-dark)]"
      />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-b from-transparent to-background to-90%" />
    </div>
  );
}
