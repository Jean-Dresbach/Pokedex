import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { Filter, generationsData, TypeWithAll } from "../../types/filter"
import { Generations } from "../../types/pokemon"

const initialState: Filter = {
  type: "all",
  generation: generationsData[0],
  onlyFavorites: false
}

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setType(state, action: PayloadAction<TypeWithAll>) {
      return { ...state, type: action.payload }
    },
    setGeneration(state, action: PayloadAction<Generations>) {
      const index = generationsData.findIndex(
        genDta => genDta.name === action.payload
      )
      return { ...state, generation: generationsData[index] }
    },
    toggleOnlyFavorites(state) {
      return { ...state, onlyFavorites: !state.onlyFavorites }
    }
  }
})

export const { setType, setGeneration, toggleOnlyFavorites } =
  filterSlice.actions
export default filterSlice.reducer
