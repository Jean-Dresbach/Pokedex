import { persistReducer } from "redux-persist"
import { combineReducers } from "@reduxjs/toolkit"

import storage from "redux-persist/lib/storage"
import themeSlice from "./slices/themeSlice"
import loadingSlice from "./slices/loadingSlice"

const rootReducer = combineReducers({
  theme: themeSlice,
  loading: loadingSlice
})

export const persistedReducer = persistReducer(
  {
    key: "pokedex",
    storage
  },
  rootReducer
)
