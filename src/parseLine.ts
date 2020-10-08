import { match } from './pipelines/match'
import { sort } from './pipelines/sort'
import { project } from './pipelines/project'

export type Pipeline = Record<string, unknown>

interface PipelineGenerator {
   (line: string): Pipeline
}

const pipelines: Record<string, PipelineGenerator> = {
   match,
   sort,
   project
}

function firstSpaceIndex(string: string): number {
   for (let i = 0; i < string.length; i++) {
      if (string[i] === ' ') return i
   }
   return string.length
}

export function parseLine(line: string) {
   const spaceIndex = firstSpaceIndex(line)
   const pipelineName = line.substring(0, spaceIndex).toLowerCase()
   const pipeline = pipelines[pipelineName]
   if (!pipeline) throw new Error('Pipeline not found')

   return pipeline(line.substring(spaceIndex + 1).trim())
}
