import {
  Fragment,
  useEffect,
  useRef,
  type AnimationEvent,
  type CSSProperties,
} from "react";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

type SplitTag = "h1" | "h2" | "p" | "span" | "div";

interface SplitTextFrame {
  opacity?: number;
  transform?: string;
}

export interface SplitTextProps {
  text: string;
  /** Element rendered as the root (default `p`). */
  as?: SplitTag;
  id?: string;
  className?: string;
  /** Milliseconds between consecutive letters. */
  delay?: number;
  /** Milliseconds each letter takes to animate. */
  duration?: number;
  /** CSS easing function. */
  easing?: string;
  animationFrom?: SplitTextFrame;
  animationTo?: SplitTextFrame;
  threshold?: number;
  rootMargin?: string;
  textAlign?: CSSProperties["textAlign"];
  /** Runs when the last letter finishes, or right away under reduced motion. */
  onLetterAnimationComplete?: () => void;
}

type SplitStyle = CSSProperties & Record<`--${string}`, string | number>;

const DEFAULT_FROM: SplitTextFrame = {
  opacity: 0,
  transform: "translate3d(0,40px,0)",
};
const DEFAULT_TO: SplitTextFrame = { opacity: 1, transform: "none" };
const DEFAULT_EASING = "cubic-bezier(0.215, 0.61, 0.355, 1)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function SplitText({
  text,
  as: Tag = "p",
  id,
  className,
  delay = 100,
  duration = 700,
  easing = DEFAULT_EASING,
  animationFrom,
  animationTo,
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  onLetterAnimationComplete,
}: SplitTextProps) {
  const [inViewRef, inView] = useInView({ threshold, rootMargin, once: true });
  const completeRef = useRef(onLetterAnimationComplete);

  useEffect(() => {
    completeRef.current = onLetterAnimationComplete;
  });

  useEffect(() => {
    if (inView && window.matchMedia(REDUCED_MOTION_QUERY).matches) {
      completeRef.current?.();
    }
  }, [inView]);

  const from = { ...DEFAULT_FROM, ...animationFrom };
  const to = { ...DEFAULT_TO, ...animationTo };
  const words = text
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => Array.from(word));
  const wordStarts = words.reduce<number[]>((starts, _word, index) => {
    starts.push(index === 0 ? 0 : starts[index - 1] + words[index - 1].length);
    return starts;
  }, []);
  const lastIndex = words.reduce((count, word) => count + word.length, 0) - 1;

  const style: SplitStyle = {
    textAlign,
    "--split-delay": `${delay}ms`,
    "--split-duration": `${duration}ms`,
    "--split-easing": easing,
    "--split-from-opacity": from.opacity ?? 0,
    "--split-from-transform": from.transform ?? "none",
    "--split-to-opacity": to.opacity ?? 1,
    "--split-to-transform": to.transform ?? "none",
  };

  const handleAnimationEnd = (event: AnimationEvent<HTMLElement>) => {
    const target = event.target;
    if (target instanceof HTMLElement && "last" in target.dataset) {
      onLetterAnimationComplete?.();
    }
  };

  return (
    <Tag
      id={id}
      ref={inViewRef}
      className={cn("split-text", className)}
      data-inview={inView || undefined}
      style={style}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" key={text} onAnimationEnd={handleAnimationEnd}>
        {words.map((word, wordIndex) => (
          <Fragment key={wordIndex}>
            {wordIndex > 0 && " "}
            <span className="inline-block whitespace-nowrap">
              {word.map((letter, letterIndex) => {
                const index = wordStarts[wordIndex] + letterIndex;
                const letterStyle: SplitStyle = { "--i": index };
                return (
                  <span
                    key={index}
                    className="split-char"
                    style={letterStyle}
                    data-last={index === lastIndex || undefined}
                  >
                    {letter}
                  </span>
                );
              })}
            </span>
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}
