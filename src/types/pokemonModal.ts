import { Pokemon } from "./pokemon"

export interface PokemonModal {
  isOpen: boolean
  url: string
}

export interface PrevNextPokemon {
  url: string
  data: Pokemon | null
}

export const getPokemonIdFromUrl = (url: string): number => {
  // Expressão regular para capturar o número no final da URL
  const regex = /\/pokemon\/(\d+)\/$/
  const match = url.match(regex)

  if (match && match[1]) {
    return parseInt(match[1], 10)
  }

  return -1
}

export const isPokemonIdValid = (id: number): boolean => {
  return id >= 1 && id <= 1025
}
