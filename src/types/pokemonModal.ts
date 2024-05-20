import { Pokemon } from "./pokemon"

export interface PokemonModal {
  isOpen: boolean
  url: string
}

export interface PrevNextPokemon {
  url: string
  data: Pokemon | null
}
