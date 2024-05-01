import { Grid } from "@mui/material"
/* import { PokemonItem } from "./PokemonItem" */
import { useAppSelector } from "../../redux"
import { PokemonItem } from "./PokemonItem"

export function PokemonsList() {
  const pokemons = useAppSelector(state => state.pokemons)
  const pagination = useAppSelector(state => state.pagination)
  return (
    <Grid container spacing={2} sx={{ height: "max-content" }}>
      {pokemons
        .slice(
          (pagination.currentPage - 1) * pagination.perPage,
          pagination.currentPage * pagination.perPage
        )
        .map(pokemon => (
          <Grid key={pokemon.name} item xs={6} sm={4} md={3}>
            <PokemonItem url={pokemon.url} />
          </Grid>
        ))}
    </Grid>
  )
}
