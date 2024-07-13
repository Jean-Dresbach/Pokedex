import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { IPagination } from "../../types/pagitation"

const initialState: IPagination = {
  currentPage: 1,
  perPage: 24,
  totalOfPage: 0
}

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      return { ...state, currentPage: action.payload }
    },
    setTotalPages(state, action: PayloadAction<number>) {
      return { ...state, totalOfPage: action.payload }
    }
  }
})

export const { setCurrentPage, setTotalPages } = paginationSlice.actions
export default paginationSlice.reducer
