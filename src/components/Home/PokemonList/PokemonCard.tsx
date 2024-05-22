import { useEffect, useState } from "react"
import { Box, CircularProgress, Typography, useTheme } from "@mui/material"

import { fetchPokemonData } from "../../../services/api"
import { useAppDispatch, openPokemonModal } from "../../../redux"
import { getTypeIcon } from "../../../assets/pokemomTypeIcons"
import { Pokemon, Type, typeColor } from "../../../types/pokemon"
import { capitalizeWord } from "../../../utilities/captalizeWord"
import pokeballPng from "../../../assets/pokeball.png"

interface PokemonCardProps {
  url: string
}

export function PokemonCard({ url }: PokemonCardProps) {
  const theme = useTheme()
  const dispatch = useAppDispatch()

  const [pokemonData, setPokemonData] = useState<Pokemon | null>()

  useEffect(() => {
    const handleGetPokemonData = async () => {
      const result = await fetchPokemonData(url)

      setPokemonData({
        ...result,
        species: {
          ...result.species,
          name: capitalizeWord(result.species.name)
        }
      })
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
      } 51%, ${typeColor[pokemonData!.types[1].type.name as Type]} 100%)`
    }
  }

  const handleOpenPokemonModal = () => {
    dispatch(openPokemonModal(url))
  }

  return (
    <>
      {!pokemonData && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: 140
          }}>
          <CircularProgress sx={{ margin: "auto" }} />
        </Box>
      )}

      {pokemonData && (
        <Box
          onClick={handleOpenPokemonModal}
          sx={{
            width: "100%",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            border: `2px solid ${
              theme.palette.mode === "light" ? "white" : "black"
            }`,
            flexDirection: "column",
            cursor: "pointer",
            gap: 1,
            height: 140,
            borderRadius: 6,
            p: 1.5,
            background: pokemonData && handleBgColor(),
            "&:hover": {
              borderColor: theme.palette.primary.main
            }
          }}>
          <Typography
            fontWeight={600}
            textAlign={"center"}
            sx={{ color: theme.palette.mode === "dark" ? "black" : "white" }}>
            {pokemonData?.species.name}
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
                    bgcolor: theme.palette.mode === "dark" ? "black" : "white",
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
                  color: theme.palette.mode === "dark" ? "black" : "white"
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
