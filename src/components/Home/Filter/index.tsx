import { SyntheticEvent, useState } from "react"
import {
  FavoriteRounded,
  HeartBrokenRounded,
  TuneRounded
} from "@mui/icons-material"
import {
  Box,
  Button,
  Divider,
  Modal,
  Paper,
  Slide,
  Tab,
  Tabs,
  Typography
} from "@mui/material"

import { generationsData, pokemonTypesData } from "../../../types/filter"
import { Generations, Type, typeColor } from "../../../types/pokemon"
import {
  setCurrentPage,
  setGeneration,
  toggleOnlyFavorites,
  setType,
  useAppDispatch,
  useAppSelector
} from "../../../redux"
import { getTypeIcon } from "../../../assets/pokemomTypeIcons"
import { GenElement } from "./GenElement"

export function Filter() {
  const dispatch = useAppDispatch()
  const filter = useAppSelector(state => state.filter)

  const [open, setOpen] = useState(false)

  const toggleDrawer = () => {
    setOpen(prev => !prev)
  }

  const handleChangeOnlyFavorites = () => {
    dispatch(toggleOnlyFavorites())
    dispatch(setCurrentPage(1))
  }

  const handleGenChange = (
    _: SyntheticEvent<Element, Event>,
    value: Generations
  ) => {
    dispatch(setGeneration(value))
    dispatch(setCurrentPage(1))
  }

  const handleTypeChange = (_: SyntheticEvent<Element, Event>, value: Type) => {
    dispatch(setType(value))
    dispatch(setCurrentPage(1))
  }

  return (
    <>
      <Button
        variant="outlined"
        onClick={toggleDrawer}
        endIcon={<TuneRounded />}
        sx={{ borderRadius: "100vw" }}>
        Filter
      </Button>

      <Modal open={open} onClose={toggleDrawer}>
        <Slide direction="up" in={open}>
          <Paper
            sx={{
              position: "absolute",
              inset: 0,
              maxWidth: "900px",
              height: "max-content",
              margin: "auto",
              borderRadius: "32px 32px 0 0",
              marginBottom: 0,
              elevation: 3,
              p: 3
            }}
            elevation={3}>
            <Divider sx={{ my: 2, fontSize: 25 }} textAlign="left">
              Favorites
            </Divider>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                py: 1.5
              }}>
              <Button
                variant={filter.onlyFavorites ? "outlined" : "contained"}
                endIcon={<HeartBrokenRounded />}
                onClick={() =>
                  filter.onlyFavorites ? handleChangeOnlyFavorites() : null
                }>
                See All
              </Button>

              <Button
                variant={filter.onlyFavorites ? "contained" : "outlined"}
                startIcon={<FavoriteRounded />}
                onClick={() =>
                  filter.onlyFavorites ? null : handleChangeOnlyFavorites()
                }>
                Only Favorites
              </Button>
            </Box>

            <Divider sx={{ my: 2, fontSize: 25 }} textAlign="right">
              Generation
            </Divider>

            <Tabs
              value={filter.generation.name}
              variant="scrollable"
              onChange={handleGenChange}
              scrollButtons
              allowScrollButtonsMobile>
              {generationsData.map(genDta => (
                <Tab
                  sx={{ width: 185 }}
                  key={genDta.name}
                  value={genDta.name}
                  label={
                    <GenElement
                      grass={genDta.initialsImg.grass}
                      fire={genDta.initialsImg.fire}
                      water={genDta.initialsImg.water}
                      label={genDta.name}
                    />
                  }
                />
              ))}
            </Tabs>

            <Divider sx={{ my: 2, fontSize: 25 }} textAlign="left">
              Type
            </Divider>

            <Tabs
              value={filter.type}
              variant="scrollable"
              onChange={handleTypeChange}
              sx={{ marginBottom: 2 }}
              scrollButtons
              allowScrollButtonsMobile>
              {pokemonTypesData.map(t => (
                <Tab
                  key={t}
                  value={t}
                  label={
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Typography>{t}</Typography>
                      {t !== "all" &&
                        getTypeIcon(t)({ color: typeColor[t], size: "25px" })}
                    </Box>
                  }
                />
              ))}
            </Tabs>
          </Paper>
        </Slide>
      </Modal>
    </>
  )
}
