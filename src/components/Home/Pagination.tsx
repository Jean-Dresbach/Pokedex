import { useEffect } from "react"
import {
  Box,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  useTheme
} from "@mui/material"
import { ArrowBackRounded, ArrowForwardRounded } from "@mui/icons-material"

import {
  useAppSelector,
  useAppDispatch,
  setTotalPages,
  setCurrentPage
} from "../../redux"

export function Pagination() {
  const theme = useTheme()

  const dispatch = useAppDispatch()
  const pagination = useAppSelector(state => state.pagination)
  const pokemons = useAppSelector(state => state.pokemons)

  useEffect(() => {
    const totalPages = Math.ceil(pokemons.length / pagination.perPage)

    dispatch(setTotalPages(totalPages))
  }, [dispatch, pagination.perPage, pokemons.length])

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
            sx: {
              ...{ maxHeight: 250 },
              "&::-webkit-scrollbar": {
                width: "8px"
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: theme.palette.text.secondary
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: theme.palette.error.light
              }
            }
          }
        }}>
        <MenuItem disabled>Páginas</MenuItem>
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
          <ArrowBackRounded />
        </IconButton>
        <IconButton
          disabled={
            pagination.currentPage ===
            Math.ceil(pokemons.length / pagination.perPage)
          }
          onClick={handleNext}>
          <ArrowForwardRounded />
        </IconButton>
      </Box>
    </Box>
  )
}
