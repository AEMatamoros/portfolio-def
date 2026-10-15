export interface IconPath {
  readonly d: string;
  /** Subtracted from the base shape, so the hole is transparent on any surface. */
  readonly knockout?: true;
}

export interface IconDef {
  readonly viewBox: string;
  readonly paths: readonly IconPath[];
}
