import { Box, Typography } from "@mui/material"

interface GenElementProps {
  label: string
  grass: string
  fire: string
  water: string
}

export function GenElement({ grass, fire, water, label }: GenElementProps) {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Box sx={{ display: "flex", alignItems: "end" }}>
        <img src={grass} style={{ width: "50px" }} />
        <img src={fire} style={{ width: "50px", marginBottom: "8px" }} />
        <img src={water} style={{ width: "50px" }} />
      </Box>
      <Typography>{label}</Typography>
    </Box>
  )
}
