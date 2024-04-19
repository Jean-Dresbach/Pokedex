import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { Pagination, PerPage } from "../../types/pagitation"

const initialState: Pagination = {
  currentPage: {
    number: 1,
    url: "https://pokeapi.co/api/v2/pokemon?limit=6&offset=0"
  },
  prevPage: null,
  nextPage: null,
  perPage: 6
}

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setCurrentPageNumber(state, action: PayloadAction<number>) {
      return {
        ...state,
        currentPage: { ...state.currentPage, number: action.payload }
      }
    },
    setCurrentPageUrl(state, action: PayloadAction<string>) {
      return {
        ...state,
        currentPage: { ...state.currentPage, url: action.payload }
      }
    },
    setPrevPage(state, action: PayloadAction<null | string>) {
      return { ...state, prevPage: action.payload }
    },
    setNextPage(state, action: PayloadAction<null | string>) {
      return { ...state, nextPage: action.payload }
    },
    setPerPage(state, action: PayloadAction<PerPage>) {
      return {
        ...state,
        currentPage: {
          ...state.currentPage,
          url: state.currentPage.url
            .replace(/limit=\d+/, `limit=${action.payload}`)
            .replace(
              /offset=\d+/,
              `offset=${
                (Number(state.currentPage.number) - 1) * action.payload
              }`
            )
        },
        perPage: action.payload
      }
    }
  }
})

// fazer isto no async thunk reducer

export const {
  setCurrentPageNumber,
  setCurrentPageUrl,
  setNextPage,
  setPerPage,
  setPrevPage
} = paginationSlice.actions
export default paginationSlice.reducer
