export function numberFormatter(num: number, decimal = 0) {
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: decimal,
  }).format(num)
}
