import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { PokemonModal } from "../../types/pokemonModal"

const initialState: PokemonModal = {
  isOpen: false,
  url: ""
}

export const pokemonModalSlice = createSlice({
  name: "pokemonModal",
  initialState,
  reducers: {
    openPokemonModal(_, action: PayloadAction<string>) {
      return { isOpen: true, url: action.payload }
    },
    closePokemonModal() {
      return initialState
    }
  }
})

export const { openPokemonModal, closePokemonModal } = pokemonModalSlice.actions
export default pokemonModalSlice.reducer
