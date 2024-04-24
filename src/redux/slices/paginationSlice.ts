import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { IPagination, PerPage } from "../../types/pagitation"

const initialState: IPagination = {
  currentPage: 1,
  perPage: 6,
  totalOfPage: 0
}

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      return { ...state, currentPage: action.payload }
    },
    setPerPage(state, action: PayloadAction<PerPage>) {
      return { ...state, perPage: action.payload }
    },
    setTotalPages(state, action: PayloadAction<number>) {
      return { ...state, totalOfPage: action.payload }
    }
  }
})

export const { setCurrentPage, setPerPage, setTotalPages } =
  paginationSlice.actions
export default paginationSlice.reducer
