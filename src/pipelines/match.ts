import { Pipeline } from 'src/parseLine'
import { inferType } from 'src/utils/inferType'

type UnknownObj = Record<string, unknown>

const key = (s: string, i: number) => s.substring(0, i)
const value = (s: string, i: number) => inferType(s.substring(i + 1))

function parseSingle(s: string, o: UnknownObj): unknown | void {
   s = s.replace(/\s/g, '')

   for (let i = 0; i < s.length; i++) {
      const char = s[i]
      const nextChar = s[i + 1]
      if (char === '=') {
         if (nextChar === '>') return (o[key(s, i)] = { $gte: value(s, i + 1) })
         if (nextChar === '<') return (o[key(s, i)] = { $lte: value(s, i + 1) })
         return (o[key(s, i)] = value(s, i))
      }

      if (char === '>') {
         return (o[key(s, i)] = { $gt: value(s, i) })
      }

      if (char === '<') {
         return (o[key(s, i)] = { $lt: value(s, i) })
      }
   }

   return
}

function handler(line: string, o: UnknownObj): UnknownObj {
   if (line.includes('||')) {
      const expressions = line.split('||')
      const or = expressions.map((e) => handler(e, {}))
      o['$or'] = or
   } else if (line.includes('&&')) {
      const queries = line.split('&&')
      queries.forEach((q) => parseSingle(q, o))
   } else {
      parseSingle(line, o)
   }
   return o
}

export function match(line: string): Pipeline {
   const o = {}
   return { $match: handler(line, o) }
}
