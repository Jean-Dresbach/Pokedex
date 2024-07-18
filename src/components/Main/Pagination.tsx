import { useEffect, useState } from "react"
import {
  Box,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent
} from "@mui/material"
import { EastRounded, WestRounded } from "@mui/icons-material"

import {
  useAppSelector,
  useAppDispatch,
  setTotalPages,
  setCurrentPage
} from "../../redux"
import { NamedAPIResource } from "../../types/pokemon"

export function Pagination() {
  const dispatch = useAppDispatch()
  const pagination = useAppSelector(state => state.pagination)
  const pokemons = useAppSelector(state => state.pokemons)
  const filter = useAppSelector(state => state.filter)
  const favorites = useAppSelector(state => state.favorites)

  const [pokemonArray, setPokemonArray] = useState<NamedAPIResource[]>([])

  useEffect(() => {
    const pokemonArray = filter.onlyFavorites ? favorites : pokemons
    const totalPages = Math.ceil(
      pokemonArray.length === 0 ? 1 : pokemonArray.length / pagination.perPage
    )

    dispatch(setTotalPages(totalPages))
    setPokemonArray(pokemonArray)
  }, [dispatch, favorites, filter.onlyFavorites, pagination.perPage, pokemons])

  const handleSelectPage = (e: SelectChangeEvent) => {
    const value = Number(e.target.value)

    dispatch(setCurrentPage(value))
  }

  const handlePrev = () => dispatch(setCurrentPage(pagination.currentPage - 1))
  const handleNext = () => dispatch(setCurrentPage(pagination.currentPage + 1))

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Select
        sx={{
          padding: 1,
          maxHeight: "150px",
          borderRadius: "100vw",
          pl: 2
        }}
        value={pagination.currentPage.toString()}
        onChange={handleSelectPage}
        className="pagination"
        MenuProps={{
          PaperProps: {
            sx: { maxHeight: 250 }
          }
        }}>
        <MenuItem disabled>Pages</MenuItem>
        {Array.from({ length: pagination.totalOfPage }, (_, index) => (
          <MenuItem key={index + 1} value={index + 1}>
            {index + 1}
          </MenuItem>
        ))}
      </Select>

      <Box sx={{ minWidth: "80px", display: "flex", alignItems: "center" }}>
        <IconButton
          disabled={pagination.currentPage === 1}
          onClick={handlePrev}>
          <WestRounded />
        </IconButton>
        <IconButton
          disabled={
            pagination.currentPage ===
            Math.ceil(
              pokemonArray.length === 0
                ? 1
                : pokemonArray.length / pagination.perPage
            )
          }
          onClick={handleNext}>
          <EastRounded />
        </IconButton>
      </Box>
    </Box>
  )
}
