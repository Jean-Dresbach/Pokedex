/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"

import { FetchPokemons, NamedAPIResource, Pokemon } from "../types/pokemon"
import { Filter } from "../types/filter"

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2"
})

export const fetchPokemonsList = async (
  filter: Filter
): Promise<NamedAPIResource[]> => {
  try {
    let typeObj: NamedAPIResource | undefined

    if (filter.type === "all") {
      const response = (
        await api.get(
          `/pokemon?offset=${filter.generation.offset}&limit=${filter.generation.count}`
        )
      ).data as FetchPokemons
      return response.results
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
      ) // Transforma a response no formato NamedAPIResource[]

      const extractIdFromUrl = (url: string) => {
        const idMatch = url.match(/\/(\d+)\/$/) // Encontra o número após a última barra na URL
        return idMatch ? Number(idMatch[1]) : null // Retorna o número encontrado como um inteiro, ou null se não houver correspondência
      }

      const filteredArray = transformedArray.filter(item => {
        const id = extractIdFromUrl(item.url) // Extrai o ID da URL
        return (
          id &&
          id > filter.generation.offset &&
          id <= filter.generation.offset + filter.generation.count
        ) // Retorna true se o ID estiver dentro do intervalo desejado
      })

      return filteredArray
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data)
    }
    throw new Error("Failed to fetch Pokemon list")
  }
}

export const fetchPokemonData = async (url: string): Promise<Pokemon> => {
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
