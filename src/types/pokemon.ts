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

export interface FetchPokemons {
  count: number
  next: string | null
  previous: string | null
  results: NamedAPIResource[]
}

export interface Pokemon {
  id: number
  name: string
  base_experience: number
  height: number
  is_default: boolean
  order: number
  weight: number
  abilities: Ability[]
  forms: NamedAPIResource[]
  game_indices: VersionGameIndex[]
  held_items: PokemonHeldItem[]
  location_area_encounters: string
  moves: PokemonMove[]
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

export interface VersionGameIndex {
  game_index: number
  version: NamedAPIResource
}

export interface PokemonHeldItem {
  item: NamedAPIResource
  version_details: PokemonHeldItemVersion[]
}

export interface PokemonHeldItemVersion {
  version: NamedAPIResource
  rarity: number
}

export interface PokemonMove {
  move: NamedAPIResource
  version_group_details: PokemonMoveVersion[]
}

export interface PokemonMoveVersion {
  move_learn_method: NamedAPIResource
  version_group: NamedAPIResource
  level_learned_at: number
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
