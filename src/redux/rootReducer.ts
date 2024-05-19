import { persistReducer } from "redux-persist"
import { combineReducers } from "@reduxjs/toolkit"

import storage from "redux-persist/lib/storage"
import themeSlice from "./slices/themeSlice"
import paginationSlice from "./slices/paginationSlice"
import filterSlice from "./slices/filterSlice"
import pokemonsSlice from "./slices/pokemonsSlice"
import pokemonModalSlice from "./slices/pokemonModal"

const rootReducer = combineReducers({
  theme: themeSlice,
  pagination: paginationSlice,
  filter: filterSlice,
  pokemons: pokemonsSlice,
  pokemonModal: pokemonModalSlice
})

export const persistedReducer = persistReducer(
  {
    key: "pokeWebApp",
    storage
  },
  rootReducer
)
