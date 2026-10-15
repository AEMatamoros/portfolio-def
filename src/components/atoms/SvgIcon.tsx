import { useId, type ComponentProps } from "react";
import type { IconDef } from "@/types/icon";

type SvgIconProps = {
  icon: IconDef;
  /** Accessible name. Without it the icon is decorative and hidden from assistive technology. */
  title?: string;
} & Omit<ComponentProps<"svg">, "children">;

/**
 * Renders icon path data with `fill="currentColor"`, so the parent text color
 * drives it. Knockout paths are cut out through a mask instead of painted white.
 */
export function SvgIcon({ icon, title, ...svgProps }: SvgIconProps) {
  const maskId = useId();
  const knockouts = icon.paths.filter((path) => path.knockout);
  const shapes = icon.paths.filter((path) => !path.knockout);
  const [x, y, width, height] = icon.viewBox.split(/\s+/);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={icon.viewBox}
      fill="currentColor"
      focusable="false"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      {...svgProps}
    >
      {title && <title>{title}</title>}
      {knockouts.length > 0 ? (
        <>
          <mask
            id={maskId}
            maskUnits="userSpaceOnUse"
            x={x}
            y={y}
            width={width}
            height={height}
          >
            <rect x={x} y={y} width={width} height={height} fill="#fff" />
            {knockouts.map((path) => (
              <path key={path.d} d={path.d} fill="#000" />
            ))}
          </mask>
          <g mask={`url(#${maskId})`}>
            {shapes.map((path) => (
              <path key={path.d} d={path.d} />
            ))}
          </g>
        </>
      ) : (
        shapes.map((path) => <path key={path.d} d={path.d} />)
      )}
    </svg>
  );
}
