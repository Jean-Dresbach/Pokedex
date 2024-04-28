import { Type, Generations } from "./pokemon"

interface GenerationInfo {
  name: Generations
  count: number
  offset: number
}

export const generationsData: GenerationInfo[] = [
  {
    name: "All",
    count: 1025,
    offset: 0
  },
  {
    name: "Gen-I",
    count: 151,
    offset: 0
  },
  {
    name: "Gen-II",
    count: 100,
    offset: 151
  },
  {
    name: "Gen-III",
    count: 135,
    offset: 251
  },
  {
    name: "Gen-IV",
    count: 107,
    offset: 386
  },
  {
    name: "Gen-V",
    count: 156,
    offset: 493
  },
  {
    name: "Gen-VI",
    count: 72,
    offset: 649
  },
  {
    name: "Gen-VII",
    count: 88,
    offset: 721
  },
  {
    name: "Gen-VIII",
    count: 96,
    offset: 809
  },
  {
    name: "Gen-IX",
    count: 120,
    offset: 905
  }
]

export interface Filter {
  generation: GenerationInfo
  type: Type
}
