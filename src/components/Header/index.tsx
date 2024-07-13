import { Box, Typography, useTheme } from "@mui/material"

import { ToggleThemeButton } from "./ToggleThemeButton"
import { SearchEl } from "./SearchEl"
import pokeballWhite from "../../assets/pokeball-white.png"
import pokeballBlack from "../../assets/pokeball-black.png"

export function Header() {
  const theme = useTheme()

  return (
    <Box
      component="header"
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        maxHeight: "max-content",
        borderRadius: "0 0 32px 32px",
        backgroundColor:
          theme.palette.mode === "light"
            ? theme.palette.grey[400]
            : theme.palette.grey[900],
        p: 3,
        py: 5
      }}>
      <Typography
        component="h1"
        sx={{
          fontWeight: 500,
          zIndex: 3,
          mb: 3,
          fontSize: "clamp(20px, 5vw, 30px)"
        }}>
        Which Pokémon
        <br />
        are you looking for?
      </Typography>

      <Box sx={{ position: "absolute", top: 39, right: 25 }}>
        <ToggleThemeButton />
      </Box>

      <SearchEl />

      <img
        src={theme.palette.mode === "light" ? pokeballWhite : pokeballBlack}
        style={{
          height: "250px",
          width: "250px",
          opacity: 0.3,
          position: "absolute",
          top: "-73px",
          right: "-88px"
        }}
      />
    </Box>
  )
}
