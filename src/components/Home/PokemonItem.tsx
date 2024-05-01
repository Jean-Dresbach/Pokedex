import { Box, Card, Skeleton, Typography } from "@mui/material"

import { Pokemon, Type, typeColor } from "../../types/pokemon"
import pokeballPng from "../../assets/pokeball.png"
import { getTypeIcon } from "../../assets/pokemomTypeIcons"
import { useEffect, useState } from "react"
import { fetchPokemonData } from "../../services/api"
import { useAppSelector } from "../../redux"
import { LoadingPokemonCard } from "./LoadingPokemonCard"

interface PokemonItemProps {
  url: string
}

export function PokemonItem({ url }: PokemonItemProps) {
  const theme = useAppSelector(state => state.theme)
  const [pokemonData, setPokemonData] = useState<Pokemon | null>()

  useEffect(() => {
    const handleGetPokemonData = async () => {
      const result = await fetchPokemonData(url)

      setPokemonData(result)
    }

    handleGetPokemonData()
  }, [url])

  const handleBgColor = (): string => {
    if (pokemonData!.types.length === 1) {
      return typeColor[pokemonData!.types[0].type.name as Type]
    } else {
      return `linear-gradient(to right, ${
        typeColor[pokemonData!.types[0].type.name as Type]
      }, ${typeColor[pokemonData!.types[0].type.name as Type]} 50%, ${
        typeColor[pokemonData!.types[1].type.name as Type]
      } 50%, ${typeColor[pokemonData!.types[1].type.name as Type]} 100%)`
    }
  }

  function capitalizeName(name: string) {
    return name.replace(/(?:^|\s)\S/g, function (firstLetter) {
      return firstLetter.toUpperCase()
    })
  }

  return (
    <>
      {!pokemonData && <LoadingPokemonCard />}

      {pokemonData && (
        <Box
          sx={{
            width: "100%",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            gap: 1,
            height: 140,
            borderRadius: 6,
            p: 1.5,
            background: pokemonData && handleBgColor()
          }}>
          <Typography
            fontWeight={600}
            textAlign={"center"}
            sx={{ color: theme === "dark" ? "black" : "white" }}>
            {capitalizeName(pokemonData?.species.name as string)}
          </Typography>

          <Box sx={{ display: "flex", gap: 1, flexGrow: 1 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}>
              {pokemonData?.types.map(t => (
                <Box
                  key={t.type.name}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 0.5,
                    bgcolor: theme === "dark" ? "black" : "white",
                    borderRadius: "100vw",
                    px: 1,
                    py: 0.5
                  }}>
                  <Typography
                    fontSize={12}
                    fontWeight={900}
                    sx={{ color: typeColor[t.type.name as Type] }}>
                    {t.type.name}
                  </Typography>
                  {getTypeIcon(t.type.name as Type)({
                    color: typeColor[t.type.name as Type],
                    size: "10px"
                  })}
                </Box>
              ))}

              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: 18,
                  fontStyle: "italic",
                  opacity: 0.3,
                  color: theme === "dark" ? "black" : "white"
                }}>
                #{String(pokemonData?.id).padStart(4, "0")}
              </Typography>
            </Box>

            <Box
              sx={{
                width: "100%",
                height: "100%",
                maxHeight: "100%",
                display: "flex",
                justifyContent: "end"
              }}>
              <img
                src={
                  pokemonData?.sprites.other["official-artwork"].front_default
                }
                style={{
                  zIndex: 1,
                  aspectRatio: 1 / 1,
                  height: "84px",
                  objectFit: "fill"
                }}
              />
            </Box>
          </Box>

          <img
            src={pokeballPng}
            style={{
              width: "100px",
              opacity: 0.5,
              position: "absolute",
              bottom: -10,
              right: -20
            }}
          />
        </Box>
      )}
    </>
  )
}
