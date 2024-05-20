import { useEffect, useState } from "react"
import {
  AutoAwesome,
  CircleOutlined,
  FavoriteBorder,
  WestRounded
} from "@mui/icons-material"
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material"

import { Pokemon, Type, typeColor } from "../../../types/pokemon"
import { getTypeIcon } from "../../../assets/pokemomTypeIcons"
import pokeballImg from "../../../assets/pokeball.png"
import { fetchPokemonData } from "../../../services/api"
import { useAppDispatch, openPokemonModal } from "../../../redux"
import { PrevNextPokemon } from "../../../types/pokemonModal"

interface HeaderProps {
  url: string
  pokemonData: Pokemon
  handleClose: () => void
}

const prevNextInitialState: PrevNextPokemon = {
  url: "",
  data: null
}

export function Header({ url, pokemonData, handleClose }: HeaderProps) {
  const theme = useTheme()
  const dispatch = useAppDispatch()

  const [showShiny, setShowShiny] = useState(false)

  const [prevPokemon, setPrevPokemon] =
    useState<PrevNextPokemon>(prevNextInitialState)
  const [nextPokemon, setNextPokemon] =
    useState<PrevNextPokemon>(prevNextInitialState)

  useEffect(() => {
    setPrevPokemon(prevNextInitialState)
    setNextPokemon(prevNextInitialState)

    const handleGetPokemonData = async (isPrev: boolean, url: string) => {
      const result = await fetchPokemonData(url)
      isPrev
        ? setPrevPokemon({
            url: url,
            data: result
          })
        : setNextPokemon({
            url: url,
            data: result
          })
    }

    const prevId = getPokemonIdFromUrl(url) - 1
    const nextId = getPokemonIdFromUrl(url) + 1

    if (isPokemonIdValid(prevId)) {
      handleGetPokemonData(true, `https://pokeapi.co/api/v2/pokemon/${prevId}/`)
    }
    if (isPokemonIdValid(nextId)) {
      handleGetPokemonData(
        false,
        `https://pokeapi.co/api/v2/pokemon/${nextId}/`
      )
    }
  }, [url])

  function getPokemonIdFromUrl(url: string): number {
    // Expressão regular para capturar o número no final da URL
    const regex = /\/pokemon\/(\d+)\/$/
    const match = url.match(regex)

    if (match && match[1]) {
      return parseInt(match[1], 10)
    }

    return -1
  }

  function isPokemonIdValid(id: number): boolean {
    return id >= 1 && id <= 1025
  }

  const toggleShowShiny = () => {
    setShowShiny(prev => !prev)
  }

  const handleClicPrevNextPokemon = (url: string) => {
    dispatch(openPokemonModal(url))
  }

  const colorOnTheme = theme.palette.mode === "light" ? "white" : "black"

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between"
        }}>
        <IconButton onClick={handleClose}>
          <WestRounded sx={{ color: colorOnTheme }} />
        </IconButton>

        <IconButton>
          <FavoriteBorder sx={{ color: colorOnTheme }} />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 4
        }}>
        <Typography variant="h4" sx={{ color: colorOnTheme, fontWeight: 600 }}>
          {pokemonData?.species.name}
        </Typography>

        <Typography variant="h6" sx={{ color: colorOnTheme, fontWeight: 600 }}>
          #{String(pokemonData?.id).padStart(4, "0")}
        </Typography>
      </Box>

      <Box
        sx={{
          my: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1
        }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1
          }}>
          {pokemonData?.types.map(t => (
            <Box
              key={t.type.name}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 0.5,
                bgcolor: theme.palette.mode === "dark" ? "black" : "white",
                borderRadius: "100vw",
                px: 2,
                py: 0.5
              }}>
              <Typography
                fontWeight={900}
                sx={{ color: typeColor[t.type.name as Type] }}>
                {t.type.name}
              </Typography>

              {getTypeIcon(t.type.name as Type)({
                color: typeColor[t.type.name as Type],
                size: "20px"
              })}
            </Box>
          ))}
        </Box>

        <Button
          onClick={toggleShowShiny}
          variant="contained"
          sx={{
            display: "flex",
            alignItems: "center",
            minWidth: "max-content",
            borderRadius: "100vw",
            boxShadow: "none",
            color: !showShiny ? "orange" : "GrayText",
            fontSize: 12,
            lineHeight: 0,
            fontWeight: 600,
            bgcolor: colorOnTheme,
            "&:hover": {
              bgcolor: colorOnTheme
            }
          }}
          startIcon={
            !showShiny ? (
              <AutoAwesome fontSize="small" sx={{ color: "orange" }} />
            ) : (
              <CircleOutlined fontSize="small" sx={{ color: "GrayText" }} />
            )
          }>
          ver
          {!showShiny ? " shiny" : " padrão"}
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
          mt: 5
        }}>
        <img
          src={
            !showShiny
              ? pokemonData?.sprites.other["official-artwork"].front_default
              : pokemonData?.sprites.other["official-artwork"].front_shiny
          }
          style={{
            width: 200,
            zIndex: 1
          }}
        />

        <img
          src={pokeballImg}
          style={{
            position: "absolute",
            width: 200,
            rotate: "-45deg",
            opacity: 0.3
          }}
        />

        {prevPokemon.data && (
          <img
            onClick={() => handleClicPrevNextPokemon(prevPokemon.url)}
            src={
              prevPokemon.data.sprites.other["official-artwork"].front_default
            }
            className="pokemon-image prev"
          />
        )}

        {nextPokemon.data && (
          <img
            onClick={() => handleClicPrevNextPokemon(nextPokemon.url)}
            src={
              nextPokemon.data.sprites.other["official-artwork"].front_default
            }
            className="pokemon-image next"
          />
        )}
      </Box>
    </>
  )
}
