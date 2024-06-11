import { FavoriteBorder, FavoriteRounded } from "@mui/icons-material"
import { IconButton, useTheme } from "@mui/material"
import {
  addToFavorites,
  removeFromFavorites,
  useAppDispatch,
  useAppSelector
} from "../../redux"
import { MouseEvent } from "react"

interface FavButtonProps {
  name: string
  url: string
  havePadding: boolean
}

export function FavButton({ name, url, havePadding }: FavButtonProps) {
  const theme = useTheme()

  const dispatch = useAppDispatch()
  const favorites = useAppSelector(state => state.favorites)

  const currentPokemon = { name, url }
  const isOnFavList = favorites.some(fav => fav.name === currentPokemon.name)

  const handleToggleFavPokemon = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()

    isOnFavList
      ? dispatch(removeFromFavorites(currentPokemon.name))
      : dispatch(addToFavorites(currentPokemon))
  }

  const colorOnTheme = theme.palette.mode === "light" ? "white" : "black"

  return (
    <IconButton
      sx={{ zIndex: 1, padding: havePadding ? "" : 0 }}
      onClick={handleToggleFavPokemon}>
      {isOnFavList ? (
        <FavoriteRounded color="primary" />
      ) : (
        <FavoriteBorder sx={{ color: colorOnTheme }} />
      )}
    </IconButton>
  )
}
