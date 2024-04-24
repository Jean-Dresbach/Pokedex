import axios, { AxiosError } from "axios"

import { FetchPokemons } from "../types/pokemon"

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2"
})

export const fetchPokemonsList = async (
  endPoint: string
): Promise<FetchPokemons> => {
  try {
    const response = await api.get(endPoint)

    return response.data as FetchPokemons
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data)
    }
    throw new Error("Failed to fetch Pokemon data")
  }
}
