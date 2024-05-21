import { useEffect, useState } from "react"
import { Box, Slide } from "@mui/material"

import { openPokemonModal, useAppDispatch } from "../../../../redux"
import { fetchPokemonData } from "../../../../services/api"
import {
  PrevNextPokemon,
  getPokemonIdFromUrl,
  isPokemonIdValid
} from "../../../../types/pokemonModal"
import { Pokemon } from "../../../../types/pokemon"
import pokeballImg from "../../../../assets/pokeball.png"

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
          mt: 5
        }}>
        <Slide direction="down" in={transition}>
          <img
            src={
              !showShiny
                ? pokemonData.sprites.other["official-artwork"].front_default
                : pokemonData.sprites.other["official-artwork"].front_shiny
            }
            style={{
              width: 200,
              zIndex: 1
            }}
          />
        </Slide>

        <img
          src={pokeballImg}
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
          </Slide>
        )}

        {nextPokemon.data && (
          <Slide direction="left" in={transition}>
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
          </Slide>
        )}
      </Box>
    </>
  )
}
