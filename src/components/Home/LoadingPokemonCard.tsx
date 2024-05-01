import { Box, Card, Skeleton } from "@mui/material"

export function LoadingPokemonCard() {
  return (
    <Card
      elevation={1}
      sx={{
        width: "100%",
        height: 140,
        borderRadius: 6,
        p: 1.5,
        display: "flex",
        flexDirection: "column"
      }}>
      <Skeleton
        variant="text"
        animation="wave"
        sx={{ fontSize: "1rem", mb: 1 }}
      />

      <Box sx={{ display: "flex", gap: 1, flexGrow: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}>
          <Skeleton
            variant="text"
            animation="wave"
            sx={{ fontSize: "1rem", width: 70 }}
          />
          <Skeleton
            variant="text"
            animation="wave"
            sx={{ fontSize: "1rem", width: 70 }}
          />
          <Skeleton
            variant="text"
            animation="wave"
            sx={{ fontSize: "1rem", width: 70 }}
          />
        </Box>
        <Skeleton
          variant="rounded"
          animation="wave"
          sx={{ marginLeft: "auto", aspectRatio: 1 / 1, height: "100%" }}
        />
      </Box>
    </Card>
  )
}
