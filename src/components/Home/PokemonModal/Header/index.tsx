import { BlurOn, FavoriteBorder, WestRounded } from "@mui/icons-material"
import { Box, IconButton, useTheme } from "@mui/material"

import { Pokemon, Type, typeColor } from "../../../../types/pokemon"
import { PokemonBasicInfo } from "./PokemonBasicInfo"
import { PokemonNav } from "./PokemonNav"

interface HeaderProps {
  url: string
  pokemonData: Pokemon
  handleClose: () => void
  showShiny: boolean
  toggleShowShiny: () => void
}

export function Header({
  url,
  pokemonData,
  handleClose,
  showShiny,
  toggleShowShiny
}: HeaderProps) {
  const theme = useTheme()

  const colorOnTheme = theme.palette.mode === "light" ? "white" : "black"

  const handleBgColor = () => {
    const createVerticalGradient = (color: string) => {
      return `linear-gradient(180deg, rgba(0, 0, 0, 0.63), rgba(255, 255, 255, 0.2)), ${color}`
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
    <Box
      sx={{
        p: 3,
        position: "relative",
        "&::before, &::after": {
          content: '""',
          position: "absolute",
          top: 0,
          bottom: 0,
          width: "50%",
          backgroundSize: "100% 100%",
          transition: "background 0.5s ease"
        },
        "&::before": {
          left: 0,
          background: gradient1,
          borderRadius: "0 0 0 32px"
        },
        "&::after": {
          right: 0,
          background: gradient2,
          borderRadius: "0 0 32px 0"
        }
      }}>
      <Box
        sx={{
          width: 250,
          height: 250,
          position: "absolute",
          top: -150,
          left: -120,
          background: `linear-gradient(to bottom, ${
            theme.palette.mode === "light"
              ? "rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.01)"
              : "rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.01)"
          })`,

          borderRadius: 10,
          rotate: "350deg"
        }}
      />

      <BlurOn
        sx={{
          rotate: "180deg",
          position: "absolute",
          top: -33,
          right: "15%",
          color: theme.palette.mode === "light" ? "white" : "black",
          zIndex: 1,
          opacity: 0.2,
          fontSize: 100
        }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between"
        }}>
        <IconButton onClick={handleClose}>
          <WestRounded sx={{ color: colorOnTheme }} />
        </IconButton>

        <IconButton sx={{ zIndex: 1 }}>
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
