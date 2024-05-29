import { Box, Typography, useTheme } from "@mui/material"
import { Pokemon, PokemonSpecie } from "../../../../types/pokemon"
import { capitalizeWord } from "../../../../utilities/captalizeWord"

interface BreedingProps {
  pokemonData: Pokemon
  pokemonSpecieData: PokemonSpecie
}

export function Training({ pokemonSpecieData, pokemonData }: BreedingProps) {
  const theme = useTheme()
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Training:
      </Typography>

      <Typography
        sx={{ color: theme.palette.text.disabled, fontWeight: 600, mr: 2 }}>
        Catch Rate
        <Typography
          component="span"
          sx={{ ml: 2, color: theme.palette.text.primary }}>
          {pokemonSpecieData.capture_rate}
        </Typography>
      </Typography>

      <Typography sx={{ color: theme.palette.text.disabled, fontWeight: 600 }}>
        Base Happiness
        <Typography
          component="span"
          sx={{ ml: 2, color: theme.palette.text.primary }}>
          {pokemonSpecieData.base_happiness}
        </Typography>
      </Typography>

      <Typography sx={{ color: theme.palette.text.disabled, fontWeight: 600 }}>
        Base Experience
        <Typography
          component="span"
          sx={{ ml: 2, color: theme.palette.text.primary }}>
          {pokemonData.base_experience}
        </Typography>
      </Typography>

      <Typography sx={{ color: theme.palette.text.disabled, fontWeight: 600 }}>
        Growth Rate
        <Typography
          component="span"
          sx={{ ml: 2, color: theme.palette.text.primary }}>
          {capitalizeWord(pokemonSpecieData.growth_rate.name)}
        </Typography>
      </Typography>
    </Box>
  )
}
