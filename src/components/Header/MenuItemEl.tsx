import { useEffect, useState } from "react"

import { Pokemon } from "../../types/pokemon"
import { fetchPokemonData } from "../../services/api"
import { Box, CircularProgress, MenuItem, Typography } from "@mui/material"

interface MenuItemElProps {
  url: string
}

export function MenuItemEl({ url }: MenuItemElProps) {
  const [pokemonData, setPokemonData] = useState<Pokemon | null>(null)

  useEffect(() => {
    const handleGetPokemonData = async () => {
      const result = await fetchPokemonData(url)

      setPokemonData(result)
    }

    handleGetPokemonData()
  }, [url])

  return (
    <MenuItem>
      {!pokemonData ? (
        <CircularProgress />
      ) : (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
          <Box>
            <Typography>
              {pokemonData.name.charAt(0).toUpperCase() +
                pokemonData.name.slice(1)}
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
