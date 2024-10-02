export function formatPrice(num: number, fixed: number = 2): string {
  if (!num) return '';
  const roundedNum = num.toFixed(fixed);
  const [integerPart, decimalPart] = roundedNum.split('.');
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${formattedIntegerPart}${decimalPart ? `.${decimalPart}` : ''}`;
}
