export function formatNumber(num: number, decimal = 0): string {
  return new Intl.NumberFormat(undefined, {
    minimumFractionDigits: decimal,
    maximumFractionDigits: decimal,
  }).format(num)
}

export function formatNumberSig(num: number, sigDigits = 6): string {
  return new Intl.NumberFormat(undefined, {
    maximumSignificantDigits: sigDigits,
  }).format(num)
}

export function formatNumberCompact(num: number, decimal = 0, lower = true): string {
  const numStr = Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: decimal,
  }).format(num)
  return lower ? numStr.toLowerCase() : numStr
}
