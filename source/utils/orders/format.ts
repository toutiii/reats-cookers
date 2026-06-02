export const formatCurrency = (value: number): string => `€${value.toFixed(2)}`;

export const formatTime = (isoDate: string | null | undefined): string => {
  if (!isoDate) return "—";
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
};

export const formatDate = (isoDate: string | null | undefined): string => {
  if (!isoDate) return "—";
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formatDateTime = (isoDate: string | null | undefined): string => {
  if (!isoDate) return "—";
  return `${formatDate(isoDate)} · ${formatTime(isoDate)}`;
};
