import readline from 'readline'
import fs from 'fs'
import { parseLine } from 'src/parseLine'

const r = readline.createInterface({
   input: fs.createReadStream(process.argv[2]),
})

const a: unknown[] = []

r.on('line', (input) => {
   a.push(parseLine(input))
})

r.once('close', () => {
   console.dir(a, { depth: Infinity })
})


