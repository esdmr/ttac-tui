const LRI = "\u{2066}";
const RLI = "\u{2067}";
const PDI = "\u{2069}";

export function ltr(template: TemplateStringsArray, ...args: unknown[]) {
  return LRI + String.raw({ raw: template }, ...args) + PDI;
}

export function rtl(template: TemplateStringsArray, ...args: unknown[]) {
  return RLI + String.raw({ raw: template }, ...args) + PDI;
}
