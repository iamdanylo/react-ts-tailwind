export const formatPrice = (price: number): string => {
  if (!price) return '';
  return (price / 100).toFixed(2);
};
