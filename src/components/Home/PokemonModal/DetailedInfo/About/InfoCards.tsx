import { ScaleRounded, StraightenRounded } from "@mui/icons-material"
import { Box, Card, CardContent, Typography, useTheme } from "@mui/material"

import { Pokemon } from "../../../../../types/pokemon"
import batleDarkIcon from "../../../../../assets/battleDarkIcon.png"
import batleLightIcon from "../../../../../assets/battleLightIcon.png"
import { capitalizeWord } from "../../../../../utilities/captalizeWord"

interface InfoCardProps {
  pokemonData: Pokemon
}

export function InfoCards({ pokemonData }: InfoCardProps) {
  const theme = useTheme()
  const convertHeightWeight = (n: number, isHeight: boolean) => {
    return (n / 10).toFixed(2) + (isHeight ? " m" : " kg")
  }

  return (
    <Card sx={{ boxShadow: 10, maxWidth: "max-content", margin: "auto" }}>
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 5,
          padding: "24px 40px !important"
        }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}>
          <StraightenRounded fontSize="large" sx={{ rotate: "90deg" }} />

          <Typography fontWeight={500} gutterBottom>
            Height
          </Typography>

          <Typography>
            {convertHeightWeight(pokemonData.height, true)}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}>
          <ScaleRounded fontSize="large" />

          <Typography fontWeight={500} gutterBottom>
            Weight
          </Typography>

          <Typography>
            {convertHeightWeight(pokemonData.weight, false)}
          </Typography>
        </Box>

        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}>
          <img
            src={
              theme.palette.mode === "light" ? batleLightIcon : batleDarkIcon
            }
            style={{ width: 35 }}
          />

          <Typography fontWeight={500} gutterBottom>
            Abilities
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column"
            }}>
            {pokemonData.abilities.map(ability => {
              if (ability.is_hidden) {
                return (
                  <Typography
                    key={ability.ability.name + " (Hidden)"}
                    textAlign={"center"}>
                    {capitalizeWord(ability.ability.name) + " (Hidden)"}
                  </Typography>
                )
              } else {
                return (
                  <Typography key={ability.ability.name} textAlign={"center"}>
                    {capitalizeWord(ability.ability.name)}
                  </Typography>
                )
              }
            })}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
