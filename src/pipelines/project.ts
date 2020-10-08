import { Pipeline } from 'src/parseLine'
type UnknownObj = Record<string, unknown>

function handler(line: string, o: UnknownObj): UnknownObj {
   const keys = line.split(' ').filter((c) => c != '')
   keys.forEach((k) => {
      if (k.startsWith('-')) return o[k.slice(1)] = -1
      return o[k] = 1
   })

   return o
}

export function project(line: string): Pipeline {
   const o = {}
   return { $sort: handler(line, o) }
}
