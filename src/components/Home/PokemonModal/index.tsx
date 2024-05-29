import { useCallback, useEffect, useState } from "react"
import {
  Box,
  CircularProgress,
  Fade,
  Modal,
  Slide,
  useTheme
} from "@mui/material"

import {
  useAppSelector,
  useAppDispatch,
  closePokemonModal
} from "../../../redux"
import { fetchPokemonData } from "../../../services/api"
import { Pokemon } from "../../../types/pokemon"
import { Header } from "./Header"
import { DetailedInfo } from "./DetailedInfo"

export function PokemonModal() {
  const theme = useTheme()

  const dispatch = useAppDispatch()
  const { isOpen, url } = useAppSelector(state => state.pokemonModal)

  const [pokemonData, setPokemonData] = useState<Pokemon | null>(null)
  const [fadeIn, setFadeIn] = useState(false)
  const [showShiny, setShowShiny] = useState(false)

  console.log("foi carregado")

  useEffect(() => {
    setFadeIn(false)
    if (isOpen) {
      const handleGetPokemonData = async () => {
        const result = (await fetchPokemonData(url)) as Pokemon

        setPokemonData(result)
        setFadeIn(true)
      }

      handleGetPokemonData()
    }
  }, [isOpen, url])

  const toggleShowShiny = useCallback(() => {
    setShowShiny(prev => !prev)
  }, [])

  const handleClose = useCallback(
    () => dispatch(closePokemonModal()),
    [dispatch]
  )

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
                bgcolor: theme.palette.background.default,
                display: "flex",
                flexDirection: "column",
                height: "100%",
                maxWidth: "900px",
                margin: "auto",
                overflow: "hidden",
                overflowY: "scroll",
                outline: "none",

                "&::-webkit-scrollbar": {
                  width: "8px"
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: theme.palette.text.secondary
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: theme.palette.error.light
                }
              }}>
              <Header
                toggleShowShiny={toggleShowShiny}
                handleClose={handleClose}
                showShiny={showShiny}
                pokemonData={pokemonData}
                url={url}
              />

              <Fade in={fadeIn}>
                <Box sx={{ flexGrow: 1 }}>
                  <DetailedInfo
                    pokemonData={pokemonData}
                    showShiny={showShiny}
                  />
                </Box>
              </Fade>
            </Box>
          )}
        </Box>
      </Slide>
    </Modal>
  )
}
