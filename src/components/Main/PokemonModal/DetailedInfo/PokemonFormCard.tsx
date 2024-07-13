import { useEffect, useState } from "react"
import { Box, CircularProgress, Tooltip, useTheme } from "@mui/material"

import { openPokemonModal, useAppDispatch } from "../../../../redux"
import { fetchPokemonData } from "../../../../services/api"
import { Pokemon } from "../../../../types/pokemon"
import { HideImage } from "@mui/icons-material"
import pokeballImg from "../../../../assets/pokeball-primary.png"
import { capitalizeWord } from "../../../../utilities/captalizeWord"

interface PokemonVarietyCardProps {
  url: string
  showShiny: boolean
  pokemonOnDisplay: Pokemon
}

export function PokemonFormCard({
  url,
  showShiny,
  pokemonOnDisplay
}: PokemonVarietyCardProps) {
  const theme = useTheme()
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
          filter: "grayscale(100%)",
          transition: "all .3s linear"
        }
      }
    } else {
      return {
        cursor: "pointer",
        "&:hover .pokemon": {
          transform: "scale(1.1)",
          filter: `drop-shadow(8px 8px 0 ${
            theme.palette.mode === "light"
              ? "rgba(0, 0, 0, .5)"
              : "rgba(255,255,255,0.3)"
          })`,
          transition: "all .3s linear"
        }
      }
    }
  }

  return (
    <Box
      onClick={handleOpenPokemonModal}
      sx={{
        position: "relative",
        zIndex: 1,
        width: "max-content",
        ...handleIsChosen()
      }}>
      <Tooltip
        title={
          pokemonOnDisplay.id === pokemonData.id
            ? ""
            : capitalizeWord(pokemonData.name)
        }
        placement="bottom"
        arrow>
        {pokemonData.sprites.other["official-artwork"].front_default ? (
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
        ) : (
          <HideImage sx={{ fontSize: 100, m: 3 }} />
        )}
      </Tooltip>

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
    </Box>
  )
}
