export const parseBoolean = (
  value: string | undefined
): boolean | undefined => {
  if (!value) return undefined;
  const normalized = value.toLowerCase();
  return normalized === "true"
    ? true
    : normalized === "false"
    ? false
    : undefined;
};

export const parsePriority = (
  value: string | undefined
): "High" | "Medium" | "Low" | undefined => {
  if (!value) return undefined;
  const normalized = value.toLowerCase();
  return normalized === "high"
    ? "High"
    : normalized === "medium"
    ? "Medium"
    : normalized === "low"
    ? "Low"
    : undefined;
};

export function parseNumber(value: any) {
  return Number(value);
}