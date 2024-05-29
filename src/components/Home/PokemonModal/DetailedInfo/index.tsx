import { useEffect, useState } from "react"
import { Box, CircularProgress, Typography } from "@mui/material"

import { Pokemon, PokemonSpecie } from "../../../../types/pokemon"
import { fetchPokemonData } from "../../../../services/api"
import { getFlavorText } from "../../../../types/pokemonModal"
import { capitalizeWord } from "../../../../utilities/captalizeWord"
import { InfoCards } from "./InfoCards"
import { Breeding } from "./Breeding"
import { PokemonFormCard } from "./PokemonFormCard"

interface DetailedInfoProps {
  pokemonData: Pokemon
  showShiny: boolean
}

export function DetailedInfo({ pokemonData, showShiny }: DetailedInfoProps) {
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

  if (!pokemonSpecieData) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%"
        }}>
        <CircularProgress />
      </Box>
    )
  }

  const flavorText = getFlavorText(pokemonSpecieData)

  return (
    <Box
      sx={{
        flexGrow: 1,
        zIndex: 0,
        p: 6,
        display: "flex",
        flexDirection: "column",
        gap: 3
      }}>
      <Box sx={{ wordBreak: "keep-all", textAlign: "justify" }}>
        <Typography sx={{ fontStyle: "italic", textAlign: "justify" }}>
          "{flavorText.text}"
        </Typography>

        <Typography sx={{ fontWeight: 600, textAlign: "end" }}>
          {` (Pokémon ${capitalizeWord(flavorText.versionName)})`}
        </Typography>
      </Box>

      <InfoCards
        pokemonData={pokemonData}
        pokemonSpecieData={pokemonSpecieData}
      />

      <Breeding pokemonSpecieData={pokemonSpecieData} />

      {pokemonSpecieData.varieties.length > 1 && (
        <Box>
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
              <PokemonFormCard
                key={v.pokemon.name}
                url={v.pokemon.url}
                showShiny={showShiny}
                pokemonOnDisplay={pokemonData}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  )
}
