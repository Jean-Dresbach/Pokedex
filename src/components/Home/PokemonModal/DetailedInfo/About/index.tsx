import { useEffect, useState } from "react"
import { Box, CircularProgress, Typography, useTheme } from "@mui/material"
import { FemaleRounded, MaleRounded } from "@mui/icons-material"
import { Pokemon, PokemonSpecie } from "../../../../../types/pokemon"
import { fetchPokemonData } from "../../../../../services/api"
import { InfoCards } from "./InfoCards"
import { capitalizeWord } from "../../../../../utilities/captalizeWord"
import { PokemonVarietyCard } from "./PokemonVarietyCard"

interface AboutProps {
  showShiny: boolean
  pokemonData: Pokemon
}

export function About({ pokemonData, showShiny }: AboutProps) {
  const theme = useTheme()
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
    const cleanedText = text.replace(/\f/g, " ").replace(/\n/g, " ")
    const words = cleanedText.split(" ")
    const formattedWords = words.map(word =>
      /^[A-Z]/.test(word) ? word.charAt(0) + word.slice(1).toLowerCase() : word
    )
    return formattedWords.join(" ")
  }

  const getFlavorText = (data: PokemonSpecie) => {
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

  if (!pokemonSpecieData) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
        <CircularProgress />
      </Box>
    )
  }

  const flavorText = getFlavorText(pokemonSpecieData)

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography textAlign="justify" sx={{ wordBreak: "keep-all" }}>
        <Typography component="span" sx={{ fontStyle: "italic" }}>
          "{flavorText.text}"
        </Typography>

        {` (Pokémon ${capitalizeWord(flavorText.versionName)})`}
      </Typography>

      <InfoCards pokemonData={pokemonData} />

      <Box>
        <Typography variant="h6" gutterBottom>
          Breeding:
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Typography
            sx={{ color: theme.palette.text.disabled, fontWeight: 600 }}>
            Gender
          </Typography>

          {pokemonSpecieData.gender_rate === -1 ? (
            <Typography>Genderless</Typography>
          ) : (
            <Box sx={{ display: "flex" }}>
              <MaleRounded color="info" />
              <Typography>
                {(((8 - pokemonSpecieData.gender_rate) * 100) / 8).toFixed(2)}%
              </Typography>
              <FemaleRounded sx={{ color: "pink", ml: 1 }} />
              <Typography>
                {((pokemonSpecieData.gender_rate * 100) / 8).toFixed(2)}%
              </Typography>
            </Box>
          )}
        </Box>

        <Typography
          sx={{ color: theme.palette.text.disabled, fontWeight: 600 }}>
          Egg Groups
          <Typography
            component="span"
            sx={{ ml: 2, color: theme.palette.text.primary }}>
            {pokemonSpecieData.egg_groups.map((eg, index) => {
              const name = eg.name.includes("water")
                ? "Water"
                : capitalizeWord(eg.name)
              return index === 0 ? name : ` and ${name}`
            })}
          </Typography>
        </Typography>
      </Box>

      {pokemonSpecieData.habitat && (
        <Typography variant="h6">
          Habitat:
          <Typography component="span" sx={{ ml: 2 }}>
            {capitalizeWord(pokemonSpecieData.habitat.name)}
          </Typography>
        </Typography>
      )}

      {pokemonSpecieData.varieties.length > 1 && (
        <>
          <Typography variant="h6">Forms:</Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              alignItems: "center",
              justifyContent: "space-evenly"
            }}>
            {pokemonSpecieData.varieties.map(v => (
              <PokemonVarietyCard
                key={v.pokemon.name}
                url={v.pokemon.url}
                showShiny={showShiny}
                pokemonOnDisplay={pokemonData}
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  )
}
