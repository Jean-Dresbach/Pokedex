import { Box, Typography, useTheme } from "@mui/material"
import { PokemonSpecie } from "../../../../types/pokemon"
import { FemaleRounded, MaleRounded } from "@mui/icons-material"
import { capitalizeWord } from "../../../../utilities/captalizeWord"

interface BreedingProps {
  pokemonSpecieData: PokemonSpecie
}

export function Breeding({ pokemonSpecieData }: BreedingProps) {
  const theme = useTheme()
  return (
    <>
      <Box>
        <Typography variant="h6" gutterBottom>
          Breeding:
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <Typography
            sx={{ color: theme.palette.text.disabled, fontWeight: 600, mr: 2 }}>
            Gender
          </Typography>

          {pokemonSpecieData.gender_rate === -1 ? (
            <Typography>Genderless</Typography>
          ) : (
            <Box sx={{ display: "flex", gap: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <MaleRounded color="info" />
                <Typography>
                  {(((8 - pokemonSpecieData.gender_rate) * 100) / 8).toFixed(2)}
                  %
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <FemaleRounded sx={{ color: "pink" }} />
                <Typography>
                  {((pokemonSpecieData.gender_rate * 100) / 8).toFixed(2)}%
                </Typography>
              </Box>
            </Box>
          )}
        </Box>

        <Typography
          sx={{ color: theme.palette.text.disabled, fontWeight: 600 }}>
          Egg Groups
          <Typography
            component="span"
            sx={{ ml: 2, color: theme.palette.text.primary }}>
            {pokemonSpecieData.egg_groups.map((eg, index) => {
              const name = eg.name.includes("water")
                ? "Water"
                : capitalizeWord(eg.name)
              return index === 0 ? name : ` and ${name}`
            })}
          </Typography>
        </Typography>

        <Typography
          sx={{ color: theme.palette.text.disabled, fontWeight: 600 }}>
          Hatch time
          <Typography
            component="span"
            sx={{ ml: 2, color: theme.palette.text.primary }}>
            {pokemonSpecieData.hatch_counter} cycles
          </Typography>
        </Typography>
      </Box>
    </>
  )
}
