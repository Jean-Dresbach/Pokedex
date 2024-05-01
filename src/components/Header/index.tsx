import { useState } from "react"
import { Outlet } from "react-router-dom"
import { Box, Container, Typography, useTheme } from "@mui/material"
import { SearchRounded } from "@mui/icons-material"

import { useAppSelector } from "../../redux"
import { ToggleThemeButton } from "./ToggleThemeButton"
import { Nav } from "./Nav"
import pokeball from "../../assets/pokeball.png"

export function Header() {
  const themeMui = useTheme()
  const theme = useAppSelector(state => state.theme)

  const [searchColor, setSearchColor] = useState("transparent")

  const handleFocus = () => {
    setSearchColor(themeMui.palette.primary.main)
  }

  const handleBlur = () => {
    setSearchColor("transparent")
  }

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        zIndex: 3
      }}>
      <Container
        maxWidth="md"
        sx={{
          padding: "0 !important",
          overflow: "hidden",
          overflowY: "auto",
          backgroundColor: themeMui.palette.background.default,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          "&::-webkit-scrollbar": {
            width: "8px"
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: themeMui.palette.text.secondary
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: themeMui.palette.error.light
          }
        }}>
        <Box
          component="header"
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            maxHeight: "max-content",
            borderRadius: "0 0 32px 32px",
            backgroundColor:
              theme === "light"
                ? themeMui.palette.grey[400]
                : themeMui.palette.grey[900],
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
            Qual pokemon
            <br />
            você esta procurando?
          </Typography>

          <Box sx={{ position: "absolute", top: "39px", right: "24px" }}>
            <ToggleThemeButton />
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              borderRadius: 100,
              maxWidth: "500px",
              padding: "8px 16px",
              border: `2px solid ${searchColor}`,
              zIndex: 3,
              backgroundColor: theme === "light" ? "#efefef" : "rgba(0,0,0,0.2)"
            }}>
            <SearchRounded />
            <input
              type="text"
              onClick={handleFocus}
              onBlur={handleBlur}
              placeholder="Pesquise por nome ou id..."
              style={{
                outline: "none",
                border: "none",
                background: "none",
                fontFamily: "roboto",
                fontSize: "15px",
                width: "100%",
                color: theme === "light" ? "" : "white"
              }}
            />
          </Box>

          <img
            src={pokeball}
            style={{
              height: "250px",
              width: "250px",
              opacity: 0.3,
              position: "absolute",
              top: "-79px",
              right: "-89px"
            }}
          />
        </Box>

        <Nav />

        <Box sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>
      </Container>
    </Box>
  )
}
