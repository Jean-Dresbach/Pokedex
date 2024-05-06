import { persistReducer } from "redux-persist"
import { combineReducers } from "@reduxjs/toolkit"

import storage from "redux-persist/lib/storage"
import themeSlice from "./slices/themeSlice"
import paginationSlice from "./slices/paginationSlice"
import filterSlice from "./slices/filterSlice"
import pokemonsSlice from "./slices/pokemonsSlice"

const rootReducer = combineReducers({
  theme: themeSlice,
  pagination: paginationSlice,
  filter: filterSlice,
  pokemons: pokemonsSlice
})

export const persistedReducer = persistReducer(
  {
    key: "pokedex",
    storage
  },
  rootReducer
)
