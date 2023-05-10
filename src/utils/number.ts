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

export function formatNumberCompact(num: number, decimal = 0, lower = true) {
  const numStr = Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: decimal,
  }).format(num)
  return lower ? numStr.toLowerCase() : numStr
}
