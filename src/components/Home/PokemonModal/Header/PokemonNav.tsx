import { useEffect, useState } from "react"
import { Box, Slide, Tooltip, useTheme } from "@mui/material"

import { openPokemonModal, useAppDispatch } from "../../../../redux"
import { fetchPokemonData } from "../../../../services/api"
import {
  PrevNextPokemon,
  getPokemonIdFromUrl,
  isPokemonIdValid
} from "../../../../types/pokemonModal"
import { Pokemon } from "../../../../types/pokemon"
import pokeballWhite from "../../../../assets/pokeball-white.png"
import pokeballBlack from "../../../../assets/pokeball-black.png"
import { HideImage } from "@mui/icons-material"
import { capitalizeWord } from "../../../../utilities/captalizeWord"

interface PokemonNavProps {
  url: string
  showShiny: boolean
  pokemonData: Pokemon
}

const prevNextInitialState: PrevNextPokemon = {
  url: "",
  data: null
}

export function PokemonNav({ url, showShiny, pokemonData }: PokemonNavProps) {
  const theme = useTheme()
  const dispatch = useAppDispatch()

  const [transition, setTrasition] = useState(false)
  const [prevPokemon, setPrevPokemon] =
    useState<PrevNextPokemon>(prevNextInitialState)
  const [nextPokemon, setNextPokemon] =
    useState<PrevNextPokemon>(prevNextInitialState)

  useEffect(() => {
    setTrasition(true)
    setPrevPokemon(prevNextInitialState)
    setNextPokemon(prevNextInitialState)

    const handleGetPokemonData = async (isPrev: boolean, url: string) => {
      const result = (await fetchPokemonData(url)) as Pokemon
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

    let prevId = 0
    let nextId = 0
    if (!isPokemonIdValid(pokemonData.id)) {
      prevId = getPokemonIdFromUrl(pokemonData.species.url) - 1
      nextId = getPokemonIdFromUrl(pokemonData.species.url) + 1
    } else {
      prevId = getPokemonIdFromUrl(url) - 1
      nextId = getPokemonIdFromUrl(url) + 1
    }

    if (isPokemonIdValid(prevId)) {
      handleGetPokemonData(true, `https://pokeapi.co/api/v2/pokemon/${prevId}/`)
    }

    if (isPokemonIdValid(nextId)) {
      handleGetPokemonData(
        false,
        `https://pokeapi.co/api/v2/pokemon/${nextId}/`
      )
    }
  }, [pokemonData.id, pokemonData.species.url, url])

  const handleClicPrevNextPokemon = (url: string) => {
    setTrasition(false)
    setTimeout(() => {
      dispatch(openPokemonModal(url))
      setTrasition(true)
    }, 300)
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
          mt: 5,
          zIndex: 1
        }}>
        <Slide direction="down" in={transition}>
          {pokemonData.sprites.other["official-artwork"].front_default ? (
            <img
              src={
                showShiny
                  ? pokemonData.sprites.other["official-artwork"].front_shiny
                    ? pokemonData.sprites.other["official-artwork"].front_shiny
                    : pokemonData.sprites.other["official-artwork"]
                        .front_default
                  : pokemonData.sprites.other["official-artwork"].front_default
              }
              style={{ width: 200, zIndex: 1 }}
            />
          ) : (
            <HideImage sx={{ fontSize: 100, m: 6, zIndex: 1 }} />
          )}
        </Slide>

        <img
          src={theme.palette.mode === "light" ? pokeballWhite : pokeballBlack}
          style={{
            position: "absolute",
            animation: "rotate 7s linear infinite",
            width: 200,
            rotate: "-45deg",
            opacity: 0.3
          }}
        />

        {prevPokemon.data && (
          <Slide direction="right" in={transition}>
            <Tooltip
              title={capitalizeWord(prevPokemon.data.name)}
              placement="top"
              arrow>
              <img
                onClick={() => handleClicPrevNextPokemon(prevPokemon.url)}
                src={
                  !showShiny
                    ? prevPokemon.data.sprites.other["official-artwork"]
                        .front_default
                    : prevPokemon.data.sprites.other["official-artwork"]
                        .front_shiny
                }
                className="pokemon-image prev"
              />
            </Tooltip>
          </Slide>
        )}

        {nextPokemon.data && (
          <Slide direction="left" in={transition}>
            <Tooltip
              title={capitalizeWord(nextPokemon.data.name)}
              placement="top"
              arrow>
              <img
                onClick={() => handleClicPrevNextPokemon(nextPokemon.url)}
                src={
                  !showShiny
                    ? nextPokemon.data.sprites.other["official-artwork"]
                        .front_default
                    : nextPokemon.data.sprites.other["official-artwork"]
                        .front_shiny
                }
                className="pokemon-image next"
              />
            </Tooltip>
          </Slide>
        )}
      </Box>
    </>
  )
}
