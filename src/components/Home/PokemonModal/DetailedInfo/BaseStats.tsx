import { Box, Typography, useTheme } from "@mui/material"
import { Pokemon, Type, typeColor } from "../../../../types/pokemon"
import { useEffect, useState } from "react"
import { capitalizeWord } from "../../../../utilities/captalizeWord"
import { grey } from "@mui/material/colors"

interface BaseStatsProps {
  pokemonData: Pokemon
}

interface statsData {
  name: string
  value: number
  maxValue: number
}

export function BaseStats({ pokemonData }: BaseStatsProps) {
  const theme = useTheme()

  const [statsValues, setStatsValues] = useState<statsData[]>([])
  const [barTransition, setBarTransition] = useState(false)

  useEffect(() => {
    setBarTransition(false)

    const values = pokemonData.stats.map(item => {
      if (item.stat.name.includes("special-")) {
        return {
          name: capitalizeWord(item.stat.name.replace("special-", "Sp. ")),
          value: item.base_stat,
          maxValue: 255
        }
      } else {
        return {
          name: capitalizeWord(item.stat.name.replace("special-", "Sp. ")),
          value: item.base_stat,
          maxValue: 255
        }
      }
    })

    const total = values.reduce(
      (accumulator, currentValue) => accumulator + currentValue.value,
      0
    )
    values.push({ name: "Total", value: total, maxValue: 1125 })

    setStatsValues(values)
    setTimeout(() => setBarTransition(true), 500)
  }, [pokemonData.stats])

  const getWidthPercentage = (value: number, maxValue: number) => {
    return (value * 100) / maxValue
  }

  const handleBarColor = () => {
    if (pokemonData.types.length === 1) {
      return typeColor[pokemonData.types[0].type.name as Type]
    } else {
      return `linear-gradient(to right,${
        typeColor[pokemonData.types[0].type.name as Type]
      }, ${typeColor[pokemonData.types[1].type.name as Type]})`
    }
  }

  const barColor = handleBarColor()

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Base Stats:
      </Typography>

      <table>
        {statsValues.map(sv => (
          <tr key={sv.name}>
            <th>
              <Typography
                sx={{
                  minWidth: "max-content",
                  textAlign: "start",
                  color: theme.palette.text.disabled,
                  fontWeight: 600,
                  mr: 2
                }}>
                {sv.name}
              </Typography>
            </th>

            <th
              style={{
                textAlign: "end",
                fontWeight: "normal",
                paddingRight: "16px"
              }}>
              {sv.value}
            </th>

            <th style={{ width: "100%" }}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  borderRadius: "100vw",
                  height: 5,
                  bgcolor: grey[300]
                }}>
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    borderRadius: "100vw",
                    background: barColor,
                    width: barTransition
                      ? `${getWidthPercentage(sv.value, sv.maxValue)}%`
                      : 0,
                    transition: barTransition ? "width 1s ease" : ""
                  }}
                />
              </Box>
            </th>
          </tr>
        ))}
      </table>
    </>
  )
}
