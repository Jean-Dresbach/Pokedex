import { SyntheticEvent, useState, useEffect } from "react"
import {
  CloseRounded,
  Favorite,
  HeartBroken,
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
  const [localOnlyFavorites, setLocalOnlyFavorites] = useState(
    filter.onlyFavorites
  )
  const [localGeneration, setLocalGeneration] = useState(filter.generation.name)
  const [localType, setLocalType] = useState(filter.type)

  const toggleDrawer = () => {
    setOpen(prev => !prev)
  }

  const handleChangeOnlyFavorites = () => {
    setLocalOnlyFavorites(prev => !prev)
  }

  const handleGenChange = (
    _: SyntheticEvent<Element, Event>,
    value: Generations
  ) => {
    setLocalGeneration(value)
  }

  const handleTypeChange = (_: SyntheticEvent<Element, Event>, value: Type) => {
    setLocalType(value)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localOnlyFavorites !== filter.onlyFavorites) {
        dispatch(toggleOnlyFavorites())
      }
      if (localGeneration !== filter.generation.name) {
        dispatch(setGeneration(localGeneration))
      }
      if (localType !== filter.type) {
        dispatch(setType(localType))
      }
      dispatch(setCurrentPage(1))
    }, 1500)

    return () => clearTimeout(timer)
  }, [
    localOnlyFavorites,
    localGeneration,
    localType,
    dispatch,
    filter.onlyFavorites,
    filter.generation.name,
    filter.type
  ])

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
                py: 2
              }}>
              <Button
                variant={localOnlyFavorites ? "outlined" : "contained"}
                endIcon={<HeartBroken />}
                onClick={handleChangeOnlyFavorites}>
                See All
              </Button>

              <Button
                variant={localOnlyFavorites ? "contained" : "outlined"}
                startIcon={<Favorite />}
                onClick={handleChangeOnlyFavorites}>
                Only Favorites
              </Button>
            </Box>

            <Divider sx={{ my: 2, fontSize: 25 }} textAlign="right">
              Generation
            </Divider>

            <Tabs
              value={localGeneration}
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
              value={localType}
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

            <Divider sx={{ mt: 4, mb: 2 }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                py: 2,
                pr: "10px"
              }}>
              <Button
                onClick={toggleDrawer}
                sx={{ px: 5 }}
                variant="contained"
                endIcon={<CloseRounded />}>
                Close
              </Button>
            </Box>
          </Paper>
        </Slide>
      </Modal>
    </>
  )
}
