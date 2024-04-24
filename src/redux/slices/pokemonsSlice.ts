import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { toggleLoading } from "./loadingSlice"
import { Pokemon } from "../../types/pokemon"
import { fetchPokemonsList } from "../../services/api"
import { IPagination } from "../../types/pagitation"
import { Filter } from "../../types/filter"

interface IListPokemons {
  pagination: IPagination
  filter: Filter
}

export const listPokemons = createAsyncThunk(
  "pokemons/list",
  async (data: IListPokemons, { dispatch }) => {
    const endPoint = `/pokemon?offset=${
      (data.filter.generation.offset + (data.pagination.currentPage - 1)) *
      data.pagination.perPage
    }&limit=${data.pagination.perPage}`

    dispatch(toggleLoading())

    const result = await fetchPokemonsList(endPoint)

    dispatch(toggleLoading())

    return result
  }
)

const initialState: Pokemon[] = []

export const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {}
})
// fazer isto no async thunk reducer

export default pokemonsSlice.reducer
