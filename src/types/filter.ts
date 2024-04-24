import { Type, Generations } from "./pokemon"

export const GenerationsData = {
  All: {
    name: "All",
    count: 1025,
    offset: 0
  },
  "Gen-I": {
    name: "Gen-I",
    count: 151,
    offset: 0
  },
  "Gen-II": {
    name: "Gen-II",
    count: 100,
    offset: 151
  },
  "Gen-III": {
    name: "Gen-III",
    count: 135,
    offset: 251
  },
  "Gen-IV": {
    name: "Gen-IV",
    count: 107,
    offset: 386
  },
  "Gen-V": {
    name: "Gen-V",
    count: 156,
    offset: 493
  },
  "Gen-VI": {
    name: "Gen-VI",
    count: 72,
    offset: 649
  },
  "Gen-VII": {
    name: "Gen-VII",
    count: 88,
    offset: 721
  },
  "Gen-VIII": {
    name: "Gen-VIII",
    count: 96,
    offset: 809
  },
  "Gen-IX": {
    name: "Gen-IX",
    count: 120,
    offset: 905
  }
}

interface GenerationInfo {
  name: string
  count: number
  offset: number
}

type GenerationsDataAndInfo = {
  [Key in Generations]: GenerationInfo
}

export interface Filter {
  generation: GenerationsDataAndInfo[Generations]
  type: Type
}
