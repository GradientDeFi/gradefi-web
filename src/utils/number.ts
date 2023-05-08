export function numberFormatter(num: number, decimal = 0) {
  return new Intl.NumberFormat(undefined, {
    minimumFractionDigits: decimal,
    maximumFractionDigits: decimal,
  }).format(num)
}

export function numberFormatterSig(num: number, sigDigits = 6) {
  return new Intl.NumberFormat(undefined, {
    maximumSignificantDigits: sigDigits,
  }).format(num)
}
