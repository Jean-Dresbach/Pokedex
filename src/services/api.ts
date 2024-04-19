import axios, { AxiosError } from "axios"

import { FetchPokemons } from "../types/pokemonAPIResponse"
import { PerPage } from "../types/pagitation"

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2"
})

export const fetchPokemonsList = async (
  limit: PerPage,
  url: string | null,
  currentPage: string
): Promise<FetchPokemons | undefined> => {
  try {
    if (!url) {
      console.log(url)

      const response = await api.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${
          (Number(currentPage) - 1) * Number(limit)
        }&limit=${limit}`
      )

      return response.data
    }

    const newURL = url
      .replace(/limit=\d+/, `limit=${limit}`)
      .replace(
        /offset=\d+/,
        `offset=${(Number(currentPage) - 1) * Number(limit)}`
      )

    const response = await api.get(newURL)

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data
    }
  }
}
