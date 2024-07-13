import { Pokemon, PokemonSpecie } from "./pokemon"

export interface PokemonModal {
  isOpen: boolean
  url: string
}

export interface PrevNextPokemon {
  url: string
  data: Pokemon | null
  isToolTipOpen: boolean
}

export const getPokemonIdFromUrl = (url: string): number => {
  // Expressão regular para capturar o número no final da URL
  const regex = /\/(?:pokemon|pokemon-species)\/(\d+)\/?$/
  const match = url.match(regex)

  if (match && match[1]) {
    return parseInt(match[1], 10)
  }

  return -1
}

export const isPokemonIdValid = (id: number): boolean => {
  return id >= 1 && id <= 1025
}

export const formatFlavorText = (text: string) => {
  const cleanedText = text.replace(/\f/g, " ").replace(/\n/g, " ")
  const words = cleanedText.split(" ")
  const formattedWords = words.map(word =>
    /^[A-Z]/.test(word) ? word.charAt(0) + word.slice(1).toLowerCase() : word
  )
  return formattedWords.join(" ")
}

export const getFlavorText = (data: PokemonSpecie) => {
  const entries = data.flavor_text_entries.filter(
    fte => fte.language.name === "en"
  )
  if (entries.length === 0) {
    return { text: "No description available.", versionName: "" }
  }
  const randomEntry = entries[Math.floor(Math.random() * entries.length)]
  return {
    text: formatFlavorText(randomEntry.flavor_text),
    versionName: randomEntry.version.name
  }
}
