import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { Filter, GenerationsData } from "../../types/filter"
import { Type, Generations } from "../../types/pokemon"

const initialState: Filter = {
  type: "all",
  generation: GenerationsData["All"]
}

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setType(state, action: PayloadAction<Type>) {
      return { ...state, type: action.payload }
    },
    setGeneration(state, action: PayloadAction<Generations>) {
      return { ...state, generation: GenerationsData[action.payload] }
    }
  }
})

export const { setType, setGeneration } = filterSlice.actions
export default filterSlice.reducer
