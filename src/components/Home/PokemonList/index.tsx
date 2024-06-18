import { Grid, Typography, useMediaQuery } from "@mui/material"

import { useAppSelector } from "../../../redux"
import { PokemonCard } from "./PokemonCard"
import { PokemonModal } from "../PokemonModal"

export function PokemonsList() {
  const viewWidth = useMediaQuery("(min-width:445px)")
  const pokemons = useAppSelector(state => state.pokemons)
  const pagination = useAppSelector(state => state.pagination)

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          height: "max-content",
          maxWidth: viewWidth ? "auto" : 250,
          mt: 3
        }}>
        {pokemons.length > 0 ? (
          pokemons
            .slice(
              (pagination.currentPage - 1) * pagination.perPage,
              pagination.currentPage * pagination.perPage
            )
            .map(pokemon => (
              <Grid
                item
                key={pokemon.name}
                xs={viewWidth ? 6 : 12}
                sm={4}
                md={3}>
                <PokemonCard url={pokemon.url} />
              </Grid>
            ))
        ) : (
          <Grid item>
            <Typography textAlign={"justify"}>
              No favorites of this specific generation or type found. Try adding
              some to your list!
            </Typography>
          </Grid>
        )}
      </Grid>

      <PokemonModal />
    </>
  )
}
