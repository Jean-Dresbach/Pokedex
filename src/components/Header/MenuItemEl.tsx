import { useEffect, useState } from "react"

import { Pokemon } from "../../types/pokemon"
import { fetchPokemonData } from "../../services/api"
import { Box, CircularProgress, MenuItem, Typography } from "@mui/material"
import { openPokemonModal, useAppDispatch } from "../../redux"

interface MenuItemElProps {
  url: string
  handleCloseMenu: () => void
}

export function MenuItemEl({ url, handleCloseMenu }: MenuItemElProps) {
  const dispatch = useAppDispatch()

  const [pokemonData, setPokemonData] = useState<Pokemon | null>(null)

  useEffect(() => {
    const handleGetPokemonData = async () => {
      const result = await fetchPokemonData(url)

      setPokemonData(result)
    }

    handleGetPokemonData()
  }, [url])

  const handleOpenPokemonModal = () => {
    dispatch(openPokemonModal(pokemonData!))
  }

  return (
    <MenuItem onClick={handleCloseMenu}>
      {!pokemonData ? (
        <CircularProgress />
      ) : (
        <Box
          onClick={handleOpenPokemonModal}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
          <Box>
            <Typography>
              {pokemonData.name
                .split(/(\s|-)/)
                .map(
                  word =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                )
                .join("")}
            </Typography>
            <Typography>#{String(pokemonData.id).padStart(4, "0")}</Typography>
          </Box>
          <img
            src={pokemonData.sprites.other["official-artwork"].front_default}
            style={{ width: "70px" }}
          />
        </Box>
      )}
    </MenuItem>
  )
}
