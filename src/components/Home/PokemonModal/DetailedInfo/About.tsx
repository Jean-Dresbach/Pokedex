import { useEffect, useState } from "react"
import { Box, CircularProgress, Typography } from "@mui/material"

import { Pokemon, PokemonSpecie } from "../../../../types/pokemon"
import { fetchPokemonData } from "../../../../services/api"

interface AboutProps {
  pokemonData: Pokemon
}

export function About({ pokemonData }: AboutProps) {
  const [pokemonSpecieData, setPokemonSpecieData] =
    useState<PokemonSpecie | null>(null)

  useEffect(() => {
    const handleGetPokemonData = async () => {
      const result = (await fetchPokemonData(
        pokemonData.species.url
      )) as PokemonSpecie

      setPokemonSpecieData(result)
    }

    handleGetPokemonData()
  }, [pokemonData.species.url])

  const formatFlavorText = (text: string) => {
    // Replaces special formatting characters
    const cleanedText = text.replace(/\f/g, " ").replace(/\n/g, " ")

    // Splits text into words to process individually
    const words = cleanedText.split(" ")

    // Processes each word to keep the first letter capitalized if it was originally capitalized
    const formattedWords = words.map(word => {
      if (/^[A-Z]/.test(word)) {
        return word.charAt(0) + word.slice(1).toLowerCase()
      } else {
        return word
      }
    })

    // Recombine words into a complete sentence
    const formattedText = formattedWords.join(" ")

    return formattedText
  }

  const getFlavorText = (data: PokemonSpecie) => {
    const entry = data.flavor_text_entries.find(
      fte => fte.language.name === "en" && fte.version.name === "ruby"
    )

    return entry
      ? formatFlavorText(entry.flavor_text)
      : "No description available."
  }

  return (
    <>
      {!pokemonSpecieData && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
          <CircularProgress />
        </Box>
      )}
      {pokemonSpecieData && (
        <Box>
          <Typography>{getFlavorText(pokemonSpecieData)}</Typography>
        </Box>
      )}
    </>
  )
}
