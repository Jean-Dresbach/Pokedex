import { Box, useTheme } from "@mui/material"
import { useEffect, useState } from "react"

import { fetchPokemonsList } from "../services/api"
import { PerPage } from "../types/pagitation"
import { Pagination } from "../components/Home/Pagination"
import { FetchPokemons } from "../types/pokemonAPIResponse"

export function Home() {
  const theme = useTheme()
  const [result, setResult] = useState<FetchPokemons>({} as FetchPokemons)
  const [limit, setLimit] = useState<PerPage>("6")
  const [url, setURL] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState("1")

  useEffect(() => {
    const fetchPokemons = async () => {
      const result = await fetchPokemonsList(limit, url, currentPage)
      if (result) {
        setResult(result)
      }
    }

    fetchPokemons()
  }, [limit, url, currentPage])

  return (
    <Box
      component="main"
      sx={{
        width: "100%",
        height: "100%",
        p: 3,
        backgroundColor: theme.palette.background.default
      }}
    >
      <Pagination
        currentPage={currentPage}
        count={result.count}
        limit={limit}
        nextURL={result.next}
        prevURL={result.previous}
        setURL={setURL}
        setLimit={setLimit}
        setCurrentPage={setCurrentPage}
      />
    </Box>
  )
}
