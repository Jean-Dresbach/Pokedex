import { Box, Button, Typography, useTheme } from "@mui/material"
import { Visibility } from "@mui/icons-material"

import { Pokemon, Type, typeColor } from "../../../../types/pokemon"
import { getTypeIcon } from "../../../../assets/pokemomTypeIcons"
import { capitalizeWord } from "../../../../utilities/captalizeWord"
import { getPokemonIdFromUrl } from "../../../../types/pokemonModal"

interface PokemonBasicInfo {
  pokemonData: Pokemon
  toggleShowShiny: () => void
  colorOnTheme: string
  showShiny: boolean
}

export function PokemonBasicInfo({
  pokemonData,
  toggleShowShiny,
  colorOnTheme,
  showShiny
}: PokemonBasicInfo) {
  const theme = useTheme()
  const id = getPokemonIdFromUrl(pokemonData.species.url)

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 4
        }}>
        <Typography
          variant="h4"
          sx={{ color: colorOnTheme, fontWeight: 600, zIndex: 1 }}>
          {capitalizeWord(pokemonData.name)}
        </Typography>

        <Typography
          variant="h6"
          sx={{ color: colorOnTheme, fontWeight: 600, zIndex: 1 }}>
          #{String(id).padStart(4, "0")}
        </Typography>
      </Box>

      <Box
        sx={{
          my: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1
        }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            zIndex: 1
          }}>
          {pokemonData.types.map(t => (
            <Box
              key={t.type.name}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 0.5,
                bgcolor: theme.palette.mode === "dark" ? "black" : "white",
                borderRadius: "100vw",
                px: 2,
                py: 0.5
              }}>
              <Typography
                fontWeight={900}
                sx={{ color: typeColor[t.type.name as Type] }}>
                {t.type.name}
              </Typography>

              {getTypeIcon(t.type.name as Type)({
                color: typeColor[t.type.name as Type],
                size: "20px"
              })}
            </Box>
          ))}
        </Box>

        <Button
          onClick={toggleShowShiny}
          variant="contained"
          sx={{
            borderRadius: "100vw",
            minWidth: 110,
            color: !showShiny ? "orange" : "GrayText",
            height: 32,
            fontSize: 12,
            fontWeight: 600,
            zIndex: 1,
            bgcolor: colorOnTheme,
            "&:hover": {
              bgcolor: colorOnTheme
            }
          }}
          startIcon={
            <Visibility
              fontSize="small"
              sx={{ color: !showShiny ? "orange" : "GrayText" }}
            />
          }>
          {!showShiny ? "shiny" : "default"}
        </Button>
      </Box>
    </>
  )
}
