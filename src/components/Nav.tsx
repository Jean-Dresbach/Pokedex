import { useNavigate, useLocation } from "react-router-dom"
import { Box, Button, Typography } from "@mui/material"
import {
  EastRounded,
  WestRounded,
  FavoriteBorder,
  CatchingPokemon
} from "@mui/icons-material"

export function Nav() {
  const currentPage = useLocation().pathname
  const navigate = useNavigate()
  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        p: 3
      }}
    >
      {currentPage === "/" ? (
        <>
          <Typography variant="h5" component="h2">
            Pokedex
          </Typography>

          <Button
            color="error"
            sx={{ borderRadius: "100vw" }}
            onClick={() => navigate("/favorites")}
          >
            <FavoriteBorder color="error" />
            <EastRounded />
          </Button>
        </>
      ) : (
        <>
          <Button
            color="error"
            sx={{ borderRadius: "100vw" }}
            onClick={() => navigate("/")}
          >
            <WestRounded />
            <CatchingPokemon color="error" />
          </Button>

          <Typography variant="h5" component="h2">
            Favoritos
          </Typography>
        </>
      )}
    </Box>
  )
}
