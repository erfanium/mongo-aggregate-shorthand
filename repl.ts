import readline from 'readline';
import { parseLine } from 'src/parseLine';

const r = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const a: unknown[] = []

r.on('line', (input) => {
   if (input === 'done') {
      console.dir(a, { depth: Infinity })
      process.exit(0)
   }

   try {
      const pipeline = parseLine(input)
      a.push(pipeline)
      console.dir(pipeline, { depth: 5 })
   } catch(e) {
      console.error('Error: Bad Syntax', e)
   }
})