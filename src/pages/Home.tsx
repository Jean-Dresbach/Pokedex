import { Box, Divider, useTheme } from "@mui/material"

import { Pagination } from "../components/Home/Pagination"

export function Home() {
  const theme = useTheme()

  return (
    <Box
      component="main"
      sx={{
        width: "100%",
        height: "100%",
        p: 3,
        backgroundColor: theme.palette.background.default
      }}>
      <Divider sx={{ mb: 3 }} />

      <Pagination />

      <Divider sx={{ my: 3 }} />
    </Box>
  )
}
