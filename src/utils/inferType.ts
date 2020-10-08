export function inferType(s: string): boolean | number | string {
   if (s === 'true') return true
   if (s === 'false') return false
   const number = Number(s)
   if (Number.isNaN(number)) return s
   return number
}