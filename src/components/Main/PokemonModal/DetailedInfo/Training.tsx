import { Box, Typography, useTheme } from "@mui/material"
import { Pokemon, PokemonSpecie } from "../../../../types/pokemon"
import { capitalizeWord } from "../../../../utilities/captalizeWord"
import { HelpOutlineRounded } from "@mui/icons-material"
import { CustomTooltip } from "./CustomTooltip"

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
        sx={{
          display: "flex",
          alignItems: "center",
          color: theme.palette.text.disabled,
          fontWeight: 600,
          mr: 2
        }}>
        Catch Rate
        <CustomTooltip title="The base capture rate, up to 255. The higher the number, the easier the catch.">
          <HelpOutlineRounded sx={{ ml: 1 }} />
        </CustomTooltip>
        <Typography
          component="span"
          sx={{ ml: 2, color: theme.palette.text.primary }}>
          {pokemonSpecieData.capture_rate}
        </Typography>
      </Typography>

      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          color: theme.palette.text.disabled,
          fontWeight: 600
        }}>
        Base Happiness
        <CustomTooltip title="The happiness when caught by a normal Pokéball, up to 255. The higher the number, the happier the Pokémon.">
          <HelpOutlineRounded sx={{ ml: 1 }} />
        </CustomTooltip>
        <Typography
          component="span"
          sx={{ ml: 2, color: theme.palette.text.primary }}>
          {pokemonSpecieData.base_happiness}
        </Typography>
      </Typography>

      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          color: theme.palette.text.disabled,
          fontWeight: 600
        }}>
        Base Experience
        <CustomTooltip title="The base experience gained for defeating this Pokémon.">
          <HelpOutlineRounded sx={{ ml: 1 }} />
        </CustomTooltip>
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
