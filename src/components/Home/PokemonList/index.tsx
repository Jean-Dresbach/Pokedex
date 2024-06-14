import { Grid, useMediaQuery } from "@mui/material"

import { useAppSelector } from "../../../redux"
import { PokemonCard } from "./PokemonCard"
import { PokemonModal } from "../PokemonModal"

export function PokemonsList() {
  const viewWidth = useMediaQuery("(min-width:445px)")
  const pokemons = useAppSelector(state => state.pokemons)
  const pagination = useAppSelector(state => state.pagination)
  const favorites = useAppSelector(state => state.favorites)
  const filter = useAppSelector(state => state.filter)

  const handleSeeOnlyFavorites = () => {
    if (filter.onlyFavorites) {
      return favorites
    }

    return pokemons
  }

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{ height: "max-content", maxWidth: viewWidth ? "auto" : 250 }}>
        {handleSeeOnlyFavorites()
          .slice(
            (pagination.currentPage - 1) * pagination.perPage,
            pagination.currentPage * pagination.perPage
          )
          .map(pokemon => (
            <Grid item key={pokemon.name} xs={viewWidth ? 6 : 12} sm={4} md={3}>
              <PokemonCard url={pokemon.url} />
            </Grid>
          ))}
      </Grid>

      <PokemonModal />
    </>
  )
}
