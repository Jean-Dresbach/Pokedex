import { ChangeEvent, useEffect, useRef, useState } from "react"
import { SearchOffRounded, SearchRounded } from "@mui/icons-material"
import {
  Box,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  useTheme
} from "@mui/material"

import { useAppSelector } from "../../redux"
import { Search as S } from "../../types/search"
import { fetchPokemonsList } from "../../services/api"
import { generationsData } from "../../types/filter"
import { MenuItemEl } from "./MenuItemEl"

export function Search() {
  const themeMui = useTheme()
  const theme = useAppSelector(state => state.theme)

  const timeoutRef = useRef<number | null>(null)
  const boxRef = useRef<HTMLDivElement | null>(null)
  const [search, setSearch] = useState<S>({
    value: "",
    color: "transparent",
    pokemonsList: [],
    result: [],
    isMenuOpen: false
  })

  useEffect(() => {
    const fetchPokemonList = async () => {
      const result = await fetchPokemonsList({
        type: "all",
        generation: generationsData[0]
      })

      setSearch(prev => ({ ...prev, pokemonsList: result }))
    }

    fetchPokemonList()
  }, [])

  const handleFocus = () => {
    setSearch(prev => ({ ...prev, color: themeMui.palette.primary.main }))
  }

  const handleBlur = () => {
    setSearch(prev => ({ ...prev, color: "transparent" }))
  }

  const handleSearch = (searchedValueLowerCase: string) => {
    if (searchedValueLowerCase !== "") {
      setSearch(prev => ({ ...prev, isMenuOpen: true }))

      const searchMatches = search.pokemonsList.filter(obj => {
        return (
          obj.name.includes(searchedValueLowerCase) ||
          obj.url.includes("pokemon/" + searchedValueLowerCase + "/")
        )
      })

      setSearch(prev => ({ ...prev, result: searchMatches }))
    } else {
      setSearch(prev => ({ ...prev, result: [], isMenuOpen: false }))
    }
  }

  const handleSearchedValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(prev => ({ ...prev, value: e.target.value }))

    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      handleSearch(e.target.value.toLowerCase())
    }, 1500)
  }

  const handleCloseMenu = () => {
    setSearch(prev => ({ ...prev, isMenuOpen: false }))
  }

  // se o input for diferente de "" abro o menu e se o searchResult.length !== 0 eu mostro os resultados se nao o not found
  return (
    <>
      <Box
        ref={boxRef}
        sx={{
          display: "flex",
          gap: 2,
          borderRadius: 100,
          maxWidth: "500px",
          padding: "8px 16px",
          border: `2px solid ${search.color}`,
          zIndex: 3,
          backgroundColor: theme === "light" ? "#efefef" : "rgba(0,0,0,0.2)"
        }}>
        <SearchRounded />
        <input
          type="text"
          onClick={handleFocus}
          value={search.value}
          onChange={handleSearchedValueChange}
          onBlur={handleBlur}
          placeholder="Pesquise por nome ou id..."
          style={{
            outline: "none",
            border: "none",
            background: "none",
            fontFamily: "roboto",
            fontSize: "15px",
            width: "100%",
            color: theme === "light" ? "" : "white"
          }}
        />
      </Box>
      <Menu
        open={search.isMenuOpen}
        anchorEl={boxRef.current}
        onClose={handleCloseMenu}>
        <Box
          sx={{
            minWidth: "100%",
            width: 500,
            maxHeight: 400,
            "&::-webkit-scrollbar": {
              width: "8px"
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: themeMui.palette.text.secondary
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: themeMui.palette.error.light
            }
          }}>
          {search.result.length === 0 ? (
            <MenuItem disabled>
              <ListItemIcon>
                <SearchOffRounded />
              </ListItemIcon>
              <ListItemText>Não econtrado</ListItemText>
            </MenuItem>
          ) : (
            search.result.map(i => <MenuItemEl key={i.name} url={i.url} />)
          )}
        </Box>
      </Menu>
    </>
  )
}
