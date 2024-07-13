import { ChangeEvent, useEffect, useRef, useState } from "react"
import { SearchOffRounded, SearchRounded } from "@mui/icons-material"
import {
  Box,
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  useTheme
} from "@mui/material"

import { Search as S } from "../../../types/search"
import { fetchPokemonsList } from "../../../services/api"
import { generationsData } from "../../../types/filter"
import { MenuItemEl } from "./MenuItemEl"
import { useAppSelector } from "../../../redux"

export function SearchEl() {
  const theme = useTheme()

  const favorites = useAppSelector(state => state.favorites)

  const timeoutRef = useRef<number | null>(null)
  const boxRef = useRef<HTMLDivElement | null>(null)
  const [displayCount, setDisplayCount] = useState(24)
  const [search, setSearch] = useState<S>({
    value: "",
    color: "transparent",
    pokemonsList: [],
    result: [],
    isMenuOpen: false
  })

  useEffect(() => {
    const fetchPokemonsListData = async () => {
      const result = await fetchPokemonsList(
        {
          type: "all",
          generation: generationsData[0],
          onlyFavorites: false
        },
        favorites
      )

      setSearch(prev => ({ ...prev, pokemonsList: result }))
    }

    fetchPokemonsListData()
  }, [favorites])

  const handleFocus = () => {
    setSearch(prev => ({ ...prev, color: theme.palette.primary.main }))
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
      setDisplayCount(24)
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

  const handleShowMore = () => {
    setDisplayCount(prevCount => prevCount + 24)
  }

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
          backgroundColor:
            theme.palette.mode === "light" ? "#efefef" : "rgba(0,0,0,0.2)"
        }}>
        <SearchRounded />
        <input
          type="text"
          onClick={handleFocus}
          value={search.value}
          onChange={handleSearchedValueChange}
          onBlur={handleBlur}
          placeholder="Search for name or id..."
          style={{
            outline: "none",
            border: "none",
            background: "none",
            fontFamily: "roboto",
            fontSize: "15px",
            width: "100%",
            color: theme.palette.mode === "light" ? "" : "white"
          }}
        />
      </Box>
      <Menu
        open={search.isMenuOpen}
        anchorEl={boxRef.current}
        onClose={handleCloseMenu}
        sx={{
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: 500,
            maxHeight: 400
          }
        }}>
        <Box
          sx={{
            width: "100%",
            "&::-webkit-scrollbar": {
              width: "8px"
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: theme.palette.text.secondary
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: theme.palette.error.light
            }
          }}>
          {search.result.length === 0 ? (
            <MenuItem disabled>
              <ListItemIcon>
                <SearchOffRounded />
              </ListItemIcon>
              <ListItemText>Not found</ListItemText>
            </MenuItem>
          ) : (
            search.result
              .slice(0, displayCount)
              .map(i => (
                <MenuItemEl
                  key={i.name}
                  url={i.url}
                  handleCloseMenu={handleCloseMenu}
                />
              ))
          )}
          {search.result.length > displayCount && (
            <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
              <Button
                variant="outlined"
                onClick={handleShowMore}
                sx={{ borderRadius: "100vw", px: 5 }}>
                See more
              </Button>
            </Box>
          )}
        </Box>
      </Menu>
    </>
  )
}
