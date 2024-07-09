import { Type, Generations } from "./pokemon"

interface GenerationInfo {
  name: Generations
  count: number
  offset: number
  initialsImg: {
    water: string
    fire: string
    grass: string
  }
}

export type TypeWithAll = Type | "all"

export const pokemonTypesData: TypeWithAll[] = [
  "psychic",
  "ghost",
  "flying",
  "dark",
  "fairy",
  "dragon",
  "poison",
  "fighting",
  "steel",
  "ice",
  "bug",
  "rock",
  "ground",
  "electric",
  "water",
  "fire",
  "grass",
  "normal",
  "all"
]

export const generationsData: GenerationInfo[] = [
  {
    name: "All",
    count: 1025,
    offset: 0,
    initialsImg: {
      fire: "",
      grass: "",
      water: ""
    }
  },
  {
    name: "Gen-I",
    count: 151,
    offset: 0,
    initialsImg: {
      grass:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
      fire: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
      water:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png"
    }
  },
  {
    name: "Gen-II",
    count: 100,
    offset: 151,
    initialsImg: {
      grass:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/152.png",
      fire: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/155.png",
      water:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/158.png"
    }
  },
  {
    name: "Gen-III",
    count: 135,
    offset: 251,
    initialsImg: {
      grass:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/252.png",
      fire: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/255.png",
      water:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/258.png"
    }
  },
  {
    name: "Gen-IV",
    count: 107,
    offset: 386,
    initialsImg: {
      grass:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/387.png",
      fire: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/390.png",
      water:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/393.png"
    }
  },
  {
    name: "Gen-V",
    count: 156,
    offset: 493,
    initialsImg: {
      grass:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/495.png",
      fire: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/498.png",
      water:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/501.png"
    }
  },
  {
    name: "Gen-VI",
    count: 72,
    offset: 649,
    initialsImg: {
      grass:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/650.png",
      fire: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/653.png",
      water:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/656.png"
    }
  },
  {
    name: "Gen-VII",
    count: 88,
    offset: 721,
    initialsImg: {
      grass:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/722.png",
      fire: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/725.png",
      water:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/728.png"
    }
  },
  {
    name: "Gen-VIII",
    count: 96,
    offset: 809,
    initialsImg: {
      grass:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/810.png",
      fire: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/813.png",
      water:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/816.png"
    }
  },
  {
    name: "Gen-IX",
    count: 120,
    offset: 905,
    initialsImg: {
      grass:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/906.png",
      fire: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/909.png",
      water:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/912.png"
    }
  }
]

export interface Filter {
  generation: GenerationInfo
  type: TypeWithAll
  onlyFavorites: boolean
}
