export type Generations =
  | "All"
  | "Gen-I"
  | "Gen-II"
  | "Gen-III"
  | "Gen-IV"
  | "Gen-V"
  | "Gen-VI"
  | "Gen-VII"
  | "Gen-VIII"
  | "Gen-IX"

export type Type =
  | "normal"
  | "fighting"
  | "flying"
  | "poison"
  | "ground"
  | "rock"
  | "bug"
  | "ghost"
  | "steel"
  | "fire"
  | "water"
  | "grass"
  | "electric"
  | "ice"
  | "dragon"
  | "dark"
  | "fairy"
  | "psychic"

export const typeColor = {
  psychic: "#f9757a",
  ghost: "#5d52ac",
  flying: "#92aade",
  dark: "#5a5366",
  fairy: "#ec8fe6",
  dragon: "#096dc4",
  poison: "#ab6ac8",
  fighting: "#d3425f",
  steel: "#5a8ea1",
  ice: "#76d1c1",
  bug: "#95bd42",
  rock: "#c7b78b",
  ground: "#d97746",
  electric: "#f3d23b",
  water: "#539ddf",
  fire: "#ff9c54",
  grass: "#63bb5b",
  normal: "#9099a1"
}

export type FetchPokemonData = Pokemon | PokemonSpecie

export interface FetchPokemons {
  count: number
  next: string | null
  previous: string | null
  results: NamedAPIResource[]
}

export interface Pokemon {
  id: number
  name: string
  height: number
  weight: number
  abilities: Ability[]
  forms: NamedAPIResource[]
  location_area_encounters: string
  sprites: PokemonSprites
  species: NamedAPIResource
  stats: PokemonStat[]
  types: PokemonType[]
}

export interface Ability {
  is_hidden: boolean
  slot: number
  ability: NamedAPIResource
}

export interface NamedAPIResource {
  name: string
  url: string
}
export interface PokemonHeldItemVersion {
  version: NamedAPIResource
  rarity: number
}

export interface PokemonSprites {
  other: {
    "official-artwork": {
      front_default: string
      front_shiny: string
    }
  }
}

export interface PokemonStat {
  stat: NamedAPIResource
  effort: number
  base_stat: number
}

export interface PokemonType {
  slot: number
  type: NamedAPIResource
}

export interface PokemonSpecie {
  egg_groups: NamedAPIResource[]
  growth_rate: NamedAPIResource
  evolution_chain: {
    url: string
  }
  flavor_text_entries: FlavorTextEntrie[]
  gender_rate: number
  habitat: NamedAPIResource
  hatch_counter: number
  varieties: Varietie[]
}

export interface FlavorTextEntrie {
  flavor_text: string
  language: NamedAPIResource
  version: NamedAPIResource
}

export interface Varietie {
  is_default: boolean
  pokemon: NamedAPIResource
}
