import { Dispatch, SetStateAction } from "react"
import {
  Box,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent
} from "@mui/material"
import { ArrowBackRounded, ArrowForwardRounded } from "@mui/icons-material"
import { PerPage } from "../../types/pagitation"

interface PaginationProps {
  currentPage: string
  count: number
  limit: PerPage
  prevURL: string | null
  nextURL: string | null
  setURL: Dispatch<SetStateAction<string | null>>
  setLimit: Dispatch<SetStateAction<PerPage>>
  setCurrentPage: Dispatch<SetStateAction<string>>
}

export function Pagination({
  currentPage,
  count,
  limit,
  nextURL,
  prevURL,
  setURL,
  setLimit,
  setCurrentPage
}: PaginationProps) {
  // const [pages, setPages] = useState<number[]>(
  //   Array.from({
  //     length: Math.ceil(count / limit)
  //   })
  // )
  const pages: number[] = Array.from({
    length: Math.ceil(count / Number(limit))
  })

  const handleSelectPage = (e: SelectChangeEvent) => {
    setCurrentPage(e.target.value)
  }

  const handleSelectPerPage = (e: SelectChangeEvent) => {

    setLimit(Number(e.target.value) as PerPage)
  }

  const handleSetPrevURL = () => {
    setCurrentPage((prev) => (Number(prev) - 1).toString())
    setURL(prevURL)
  }
  const handleSetNextURL = () => {
    setCurrentPage((prev) => (Number(prev) + 1).toString())
    setURL(nextURL)
  }

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
            value={currentPage}
            onChange={handleSelectPage}
            className="pagination"
            MenuProps={{ PaperProps: { sx: { ...{ maxHeight: 150 } } } }}
          >
            {pages.map((_, index) => (
              <MenuItem key={index + 1} value={index + 1}>
                Página {index + 1}
              </MenuItem>
            ))}
          </Select>
        <Select
            sx={{ padding: 1, borderRadius: "100vw", pl: 2 }}
            value={limit.toString()}
            onChange={handleSelectPerPage}
            className="pagination"
          >
            <MenuItem disabled>Pokemons por <br /> página</MenuItem>
            <MenuItem value="6">6</MenuItem>
            <MenuItem value="10">10</MenuItem>
            <MenuItem value="20">20</MenuItem>
            <MenuItem value="50">50</MenuItem>
          </Select>
      </Box>

      <Box sx={{ minWidth: "80px", display: "flex", alignItems: "center" }}>
        <IconButton disabled={!prevURL} onClick={handleSetPrevURL}>
          <ArrowBackRounded />
        </IconButton>
        <IconButton disabled={!nextURL} onClick={handleSetNextURL}>
          <ArrowForwardRounded />
        </IconButton>
      </Box>
    </Box>
  )
}
