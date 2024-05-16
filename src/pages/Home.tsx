import { useEffect } from "react"
import { Box, Divider, useTheme } from "@mui/material"

import { Filter, Pagination, PokemonsList } from "../components/Home"
import { useAppDispatch, listPokemons, useAppSelector } from "../redux"

export function Home() {
  const dispatch = useAppDispatch()
  const filter = useAppSelector(state => state.filter)
  const theme = useTheme()

  useEffect(() => {
    dispatch(listPokemons(filter))
  }, [dispatch, filter])

  return (
    <Box
      component="main"
      sx={{
        width: "100%",
        height: "100%",
        p: 3,
        backgroundColor: theme.palette.background.default
      }}>
      <Divider sx={{ mb: 3 }} />

      <Pagination />

      <Divider sx={{ my: 3 }} />

      <Filter />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 3
        }}>
        <PokemonsList />
      </Box>
    </Box>
  )
}
