import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { NamedAPIResource } from "../../types/pokemon"

const initialState: NamedAPIResource[] = []

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites(state, action: PayloadAction<NamedAPIResource>) {
      return [...state, action.payload]
    },
    removeFromFavorites(state, action: PayloadAction<string>) {
      return state.filter(fav => fav.name !== action.payload)
    }
  }
})

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer
