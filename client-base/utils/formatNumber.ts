export function formatNumber(num: number | undefined) {
  if (!num) return '-';
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
