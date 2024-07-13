import { useEffect } from "react"
import { Box, Container, useTheme } from "@mui/material"

import { listPokemons, useAppDispatch, useAppSelector } from "../redux"
import { BackGround, Header, Main } from "../components"
import { Footer } from "../components/Footer"

export function Home() {
  const theme = useTheme()

  const dispatch = useAppDispatch()
  const filter = useAppSelector(state => state.filter)
  const favorites = useAppSelector(state => state.favorites)

  useEffect(() => {
    dispatch(listPokemons({ filter, favorites }))
  }, [dispatch, favorites, filter])

  return (
    <BackGround>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 3
        }}>
        <Container
          maxWidth="md"
          sx={{
            padding: "0 !important",
            overflow: "hidden",
            overflowY: "auto",
            backgroundColor: theme.palette.background.default,
            display: "flex",
            flexDirection: "column",
            height: "100%"
          }}>
          <Header />

          <Main />

          <Footer />
        </Container>
      </Box>
    </BackGround>
  )
}
