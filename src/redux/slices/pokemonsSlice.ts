import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { toggleLoading } from "./loadingSlice"
import { NamedAPIResource } from "../../types/pokemon"
import { fetchPokemonsList } from "../../services/api"
import { Filter } from "../../types/filter"

export const listPokemons = createAsyncThunk(
  "pokemons/list",
  async (filter: Filter, { dispatch }) => {
    dispatch(toggleLoading())

    const result = await fetchPokemonsList(filter)

    dispatch(toggleLoading())

    return result
  }
)

const initialState: NamedAPIResource[] = []

export const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(listPokemons.fulfilled, (_, action) => {
      return action.payload
    })
  }
})

export default pokemonsSlice.reducer
