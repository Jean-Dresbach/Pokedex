import { SyntheticEvent, useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import {
  BottomNavigation,
  BottomNavigationAction,
  Container,
  Paper,
  useTheme
} from "@mui/material"
import { Favorite, CatchingPokemon } from "@mui/icons-material"

export function Nav() {
  const theme = useTheme()
  const navigate = useNavigate()

  const location = useLocation().pathname
  const initialState = location === "/" ? "/" : location.split("/")[1]
  const [value, setValue] = useState(initialState)

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setValue(newValue)

    navigate(newValue)
  }

  return (
    <Container maxWidth="md" sx={{ height: "100%", p: "16px !important" }}>
      <Outlet />

      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          maxWidth: "900px",
          margin: "auto",
          borderTop: ` 1px solid ${theme.palette.grey[400]}`,
          marginBottom: "-10px",
          paddingBottom: "10px",
          zIndex: 100
        }}
        elevation={0}
      >
        <BottomNavigation value={value} onChange={handleChange}>
          <BottomNavigationAction
            color="error"
            label="Pokedex"
            value={"/"}
            icon={<CatchingPokemon />}
          />

          <BottomNavigationAction
            label="Favoritos"
            value={"favorites"}
            icon={<Favorite />}
          />
        </BottomNavigation>
      </Paper>
    </Container>
  )
}
