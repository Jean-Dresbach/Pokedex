import { useEffect, useState } from "react"
import { Box, CircularProgress, Modal, Slide } from "@mui/material"
import { BlurOn } from "@mui/icons-material"

import {
  useAppSelector,
  useAppDispatch,
  closePokemonModal
} from "../../../redux"
import { fetchPokemonData } from "../../../services/api"
import { Pokemon, Type, typeColor } from "../../../types/pokemon"
import { Header } from "./Header"
import { DetailedInfo } from "./DetailedInfo"

export function PokemonModal() {
  const dispatch = useAppDispatch()
  const { isOpen, url } = useAppSelector(state => state.pokemonModal)

  const [pokemonData, setPokemonData] = useState<Pokemon | null>(null)

  useEffect(() => {
    if (isOpen) {
      const handleGetPokemonData = async () => {
        const result = (await fetchPokemonData(url)) as Pokemon

        setPokemonData(result)
      }

      handleGetPokemonData()
    }
  }, [isOpen, url])

  const handleClose = () => dispatch(closePokemonModal())

  const handleBgColor = () => {
    const createVerticalGradient = (color: string) => {
      return `linear-gradient(180deg, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.63)), ${color}`
    }

    if (!pokemonData) return ["transparent", "transparent"]

    const type1Color = typeColor[pokemonData.types[0].type.name as Type]
    const type1Gradient = createVerticalGradient(type1Color)

    if (pokemonData.types.length === 1) {
      return [type1Gradient, type1Gradient]
    } else {
      const type2Color = typeColor[pokemonData.types[1].type.name as Type]
      const type2Gradient = createVerticalGradient(type2Color)
      return [type1Gradient, type2Gradient]
    }
  }

  const [gradient1, gradient2] = handleBgColor()

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
        <Box
          sx={{
            height: "100%"
          }}>
          {!pokemonData && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%"
              }}>
              <CircularProgress />
            </Box>
          )}
          {pokemonData && (
            <Box
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                maxWidth: "900px",
                margin: "auto",
                overflow: "hidden",
                overflowY: "auto",
                outline: "none",
                "&::before, &::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  width: "50%",
                  backgroundSize: "100% 100%",
                  zIndex: -1,
                  transition: "background 0.5s ease"
                },
                "&::before": {
                  left: 0,
                  background: gradient1
                },
                "&::after": {
                  right: 0,
                  background: gradient2
                }
              }}>
              <Box
                sx={{
                  width: 250,
                  height: 250,
                  position: "absolute",
                  top: -150,
                  left: -120,
                  background:
                    "linear-gradient(to bottom,rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.05))",
                  borderRadius: 10,
                  rotate: "350deg"
                }}></Box>

              <BlurOn
                sx={{
                  rotate: "180deg",
                  position: "absolute",
                  top: -33,
                  right: "15%",
                  color: "white",
                  opacity: 0.3,
                  fontSize: 100
                }}
              />

              <Header
                handleClose={handleClose}
                pokemonData={pokemonData}
                url={url}
              />

              <DetailedInfo pokemonData={pokemonData} />
            </Box>
          )}
        </Box>
      </Slide>
    </Modal>
  )
}
