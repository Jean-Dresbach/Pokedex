import { useEffect } from "react"
import { Box, Divider } from "@mui/material"

import { Filter, Pagination, PokemonsList } from "../components/Home"
import { useAppDispatch, listPokemons, useAppSelector } from "../redux"

export function Home() {
  const dispatch = useAppDispatch()
  const filter = useAppSelector(state => state.filter)
  const favorites = useAppSelector(state => state.favorites)

  useEffect(() => {
    dispatch(listPokemons({ filter, favorites }))
  }, [dispatch, favorites, filter])

  return (
    <Box
      component="main"
      sx={{
        width: "100%",
        height: "100%",
        p: 3
      }}>
      <Pagination />

      <Divider sx={{ my: 3 }} />

      <Filter />

      <PokemonsList />
    </Box>
  )
}
