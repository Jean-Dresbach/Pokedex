import { useEffect } from "react"
import { Box, Divider } from "@mui/material"

import { useAppDispatch, listPokemons, useAppSelector } from "../../redux"
import { Pagination } from "./Pagination"
import { Filter } from "./Filter"
import { PokemonsList } from "./PokemonList"

export function Main() {
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
        flexGrow: 1,
        p: 3
      }}>
      <Box sx={{ width: "100%", height: "100%" }}>
        <Pagination />

        <Divider sx={{ my: 3 }} />

        <Filter />

        <PokemonsList />
      </Box>
    </Box>
  )
}
