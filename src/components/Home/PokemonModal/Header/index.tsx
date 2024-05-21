import { useState } from "react"
import { FavoriteBorder, WestRounded } from "@mui/icons-material"
import { Box, IconButton, useTheme } from "@mui/material"

import { Pokemon } from "../../../../types/pokemon"
import { PokemonBasicInfo } from "./PokemonBasicInfo"
import { PokemonNav } from "./PokemonNav"

interface HeaderProps {
  url: string
  pokemonData: Pokemon
  handleClose: () => void
}

export function Header({ url, pokemonData, handleClose }: HeaderProps) {
  const theme = useTheme()

  const [showShiny, setShowShiny] = useState(false)

  const toggleShowShiny = () => {
    setShowShiny(prev => !prev)
  }

  const colorOnTheme = theme.palette.mode === "light" ? "white" : "black"

  return (
    <Box sx={{ p: 3 }}>
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

      <PokemonBasicInfo
        toggleShowShiny={toggleShowShiny}
        colorOnTheme={colorOnTheme}
        pokemonData={pokemonData}
        showShiny={showShiny}
      />

      <PokemonNav pokemonData={pokemonData} showShiny={showShiny} url={url} />
    </Box>
  )
}
