import { Pipeline } from 'src/parseLine'
type UnknownObj = Record<string, unknown>

function handler(line: string, o: UnknownObj): UnknownObj {
   const [key, d] = line.split(' ').filter((c) => c != '')
   if (d === '-1') return { [key]: -1 }
   return { [key]: 1 }
}

export function sort(line: string): Pipeline {
   const o = {}
   return { $sort: handler(line, o) }
}
