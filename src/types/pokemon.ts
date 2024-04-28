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
  | "all"
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
  front_default: string
  front_shiny: string
  front_female: string | null
  front_shiny_female: string | null
  back_default: string
  back_shiny: string
  back_female: string | null
  back_shiny_female: string | null
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
