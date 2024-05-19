import { Pokemon } from "./pokemon"

export interface PokemonModal {
  isOpen: boolean
  pokemonData: Pokemon | null
}
