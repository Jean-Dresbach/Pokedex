import { NamedAPIResource } from "./pokemon"

export interface Search {
  value: string
  color: string
  pokemonsList: NamedAPIResource[]
  result: NamedAPIResource[]
  isMenuOpen: boolean
}
