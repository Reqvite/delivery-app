type Mods = Record<string, boolean | string>;

export const classNames = (
  cls: string,
  mods: Mods,
  additional: (string | undefined)[]
) => {
  return [
    cls,
    ...Object.keys(mods).filter((classname) => mods[classname]),
    ...additional,
  ].join(" ");
};
