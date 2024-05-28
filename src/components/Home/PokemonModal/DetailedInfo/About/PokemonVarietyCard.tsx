import { useEffect, useState } from "react"
import { Box, CircularProgress } from "@mui/material"

import { openPokemonModal, useAppDispatch } from "../../../../../redux"
import { fetchPokemonData } from "../../../../../services/api"
import { Pokemon } from "../../../../../types/pokemon"
import pokeballImg from "../../../../../assets/pokeball-primary.png"
import { HideImage } from "@mui/icons-material"

interface PokemonVarietyCardProps {
  url: string
  showShiny: boolean
  pokemonOnDisplay: Pokemon
}

export function PokemonVarietyCard({
  url,
  showShiny,
  pokemonOnDisplay
}: PokemonVarietyCardProps) {
  const dispatch = useAppDispatch()

  const [pokemonData, setPokemonData] = useState<Pokemon | null>(null)

  useEffect(() => {
    const handleGetPokemonData = async () => {
      const result = (await fetchPokemonData(url)) as Pokemon

      setPokemonData(result)
    }

    handleGetPokemonData()
  }, [url])

  const handleOpenPokemonModal = () => {
    dispatch(openPokemonModal(url))
  }

  if (!pokemonData) {
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

  const handleIsChosen = () => {
    if (pokemonOnDisplay.id === pokemonData.id) {
      return {
        "& img": {
          filter: "grayscale(100%)"
        }
      }
    } else {
      return {
        cursor: "pointer",
        "&:hover .pokemon": {
          transform: "scale(1.1)",
          filter: "drop-shadow(8px 8px 0 rgba(0, 0, 0, .5))"
        }
      }
    }
  }

  return (
    <Box
      onClick={handleOpenPokemonModal}
      sx={{
        position: "relative",
        width: "max-content",
        ...handleIsChosen()
      }}>
      {pokemonData.sprites.other["official-artwork"].front_default ? (
        <>
          <img
            className="pokemon"
            src={
              showShiny
                ? pokemonData.sprites.other["official-artwork"].front_shiny
                  ? pokemonData.sprites.other["official-artwork"].front_shiny
                  : pokemonData.sprites.other["official-artwork"].front_default
                : pokemonData.sprites.other["official-artwork"].front_default
            }
            style={{ width: 150 }}
          />

          <img
            src={pokeballImg}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              opacity: 0.5,
              zIndex: -1
            }}
          />
        </>
      ) : (
        <HideImage sx={{ fontSize: 100, m: 3 }} />
      )}
    </Box>
  )
}
