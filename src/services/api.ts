/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"

import {
  FetchPokemons,
  NamedAPIResource,
  filterArrayByAnother
} from "../types/pokemon"
import { Filter } from "../types/filter"

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2"
})

export const fetchPokemonsList = async (
  filter: Filter,
  favorites: NamedAPIResource[]
): Promise<NamedAPIResource[]> => {
  try {
    let typeObj: NamedAPIResource | undefined

    if (filter.type === "all") {
      const response = (
        await api.get(
          `/pokemon?offset=${filter.generation.offset}&limit=${filter.generation.count}`
        )
      ).data as FetchPokemons

      if (filter.onlyFavorites) {
        const filteredByFavorites = filterArrayByAnother(
          response.results,
          favorites
        )

        console.log(filteredByFavorites)

        return filteredByFavorites
      } else {
        return response.results
      }
    } else {
      const resultGetTypesInfoList = await api.get("/type")

      const typesInfoList = resultGetTypesInfoList.data as FetchPokemons

      typeObj = typesInfoList.results.find(
        obj => obj.name === filter.type
      ) as NamedAPIResource

      const response = await api.get(typeObj.url)

      const transformedArray: NamedAPIResource[] = response.data.pokemon.map(
        (item: any) => ({
          name: item.pokemon.name,
          url: item.pokemon.url
        })
      ) // Transforms the response into NamedAPIResource[] format

      const extractIdFromUrl = (url: string) => {
        const idMatch = url.match(/\/(\d+)\/$/) // Finds the number after the last slash in the URL
        return idMatch ? Number(idMatch[1]) : null // Returns the found number as an integer, or null if there is no match
      }

      const filteredArray = transformedArray.filter(item => {
        const id = extractIdFromUrl(item.url) // Extract ID from URL
        return (
          id &&
          id > filter.generation.offset &&
          id <= filter.generation.offset + filter.generation.count
        ) // Returns true if the ID is within the desired range
      })

      if (filter.onlyFavorites) {
        const filteredBFavorites = filterArrayByAnother(
          filteredArray,
          favorites
        )
        return filteredBFavorites
      } else {
        return filteredArray
      }
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data)
    }
    throw new Error("Failed to fetch Pokemon list")
  }
}

export const fetchPokemonData = async (url: string): Promise<any> => {
  try {
    const response = await api.get(url)

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data)
    }
    throw new Error("Failed to fetch Pokemon list")
  }
}
