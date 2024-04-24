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

import { PerPage } from "../../types/pagitation"
import {
  useAppSelector,
  useAppDispatch,
  setTotalPages,
  setCurrentPage,
  setPerPage
} from "../../redux"

export function Pagination() {
  const theme = useTheme()

  const dispatch = useAppDispatch()
  const pagination = useAppSelector(state => state.pagination)
  const filter = useAppSelector(state => state.filter)

  useEffect(() => {
    const totalPages = Math.ceil(filter.generation.count / pagination.perPage)

    dispatch(setTotalPages(totalPages))
  }, [dispatch, filter.generation.count, pagination.perPage])

  const handleSelectPage = (e: SelectChangeEvent) => {
    const value = Number(e.target.value)

    dispatch(setCurrentPage(value))
  }

  const handleSelectPerPage = (e: SelectChangeEvent) => {
    const value = Number(e.target.value)

    dispatch(setPerPage(value as PerPage))
  }

  const handlePrev = () => dispatch(setCurrentPage(pagination.currentPage - 1))
  const handleNext = () => dispatch(setCurrentPage(pagination.currentPage + 1))

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box sx={{ display: "flex", gap: 1 }}>
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
        <Select
          sx={{ padding: 1, borderRadius: "100vw", pl: 2 }}
          value={pagination.perPage.toString()}
          onChange={handleSelectPerPage}
          className="pagination"
          MenuProps={{ PaperProps: { sx: { ...{ maxHeight: 250 } } } }}>
          <MenuItem disabled>
            Pokemons por <br /> página
          </MenuItem>
          <MenuItem value="6">6</MenuItem>
          <MenuItem value="10">10</MenuItem>
          <MenuItem value="20">20</MenuItem>
          <MenuItem value="50">50</MenuItem>
        </Select>
      </Box>

      <Box sx={{ minWidth: "80px", display: "flex", alignItems: "center" }}>
        <IconButton
          disabled={pagination.currentPage === 1}
          onClick={handlePrev}>
          <ArrowBackRounded />
        </IconButton>
        <IconButton
          disabled={
            pagination.currentPage ===
            Math.ceil(filter.generation.count / pagination.perPage)
          }
          onClick={handleNext}>
          <ArrowForwardRounded />
        </IconButton>
      </Box>
    </Box>
  )
}
