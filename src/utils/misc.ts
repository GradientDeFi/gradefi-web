const tuple = <T extends Array<unknown>>(...args: T): T => args

// `Object.keys` does not return the keys as string literals, only strings. Use this helper as a
// workaround. https://github.com/Microsoft/TypeScript/pull/12253#issuecomment-263132208
const objectKeys = <O extends object>(obj: O) => Object.keys(obj) as Array<keyof O>

// `Object.entries` is ES2017, so we must define our own version.
const objectEntries = <K extends string, V>(obj: Record<K, V>) => objectKeys(obj).map((key) => tuple(key, obj[key]))

// `Object.assign` is poorly typed: it returns `any` when spreading. Use cast to workaround.
const fromEntries = <K extends string, V>(arr: Array<[K, V]>) => Object.assign({}, ...arr.map(([k, v]) => ({ [k]: v }))) as Record<K, V>

// Inspired by https://stackoverflow.com/a/37616104/5932012
// Object.filter = (obj, predicate) => Object.fromEntries(Object.entries(obj).filter(predicate));
export const filterObject = <K extends string, V, Result extends V>(
  obj: Record<K, V>,
  // predicate: (key: K, value: V) => value is Result, // filter function
  predicate: (key: K, value: V) => boolean,
) => (
    fromEntries(
      objectEntries(obj).filter(
        (entry): entry is [K, Result] => {
          const [key, value] = entry
          return predicate(key, value)
        },
      ),
    )
  )

// NOTE: not a pure function
export function moveArrayItem<T = any>(arr: T[], from: number, to: number): T[] {
  if (from > arr.length - 1 || from < 0) return arr
  if (to > arr.length - 1 || to < 0) return arr
  const el = arr[from]
  arr.splice(from, 1)
  arr.splice(to, 0, el)
  return arr
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}
