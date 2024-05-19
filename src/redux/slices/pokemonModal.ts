import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { PokemonModal } from "../../types/pokemonModal"
import { Pokemon } from "../../types/pokemon"

const initialState: PokemonModal = {
  isOpen: false,
  pokemonData: null
}

export const pokemonModalSlice = createSlice({
  name: "pokemonModal",
  initialState,
  reducers: {
    openPokemonModal(_, action: PayloadAction<Pokemon>) {
      return { isOpen: true, pokemonData: action.payload }
    },
    closePokemonModal() {
      return initialState
    }
  }
})

export const { openPokemonModal, closePokemonModal } = pokemonModalSlice.actions
export default pokemonModalSlice.reducer
