import { useEffect, useState } from "react"
import { Box, CircularProgress, Modal, Slide, useTheme } from "@mui/material"

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

  const [showShiny, setShowShiny] = useState(false)

  useEffect(() => {
    if (isOpen) {
      const handleGetPokemonData = async () => {
        const result = (await fetchPokemonData(url)) as Pokemon

        setPokemonData(result)
      }

      handleGetPokemonData()
    }
  }, [isOpen, url])

  const toggleShowShiny = () => {
    setShowShiny(prev => !prev)
  }

  const handleClose = () => dispatch(closePokemonModal())

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

              <DetailedInfo pokemonData={pokemonData} showShiny={showShiny} />
            </Box>
          )}
        </Box>
      </Slide>
    </Modal>
  )
}
