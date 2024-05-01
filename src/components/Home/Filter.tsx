import { SyntheticEvent, useState } from "react"
import { TuneRounded } from "@mui/icons-material"
import {
  Box,
  Container,
  Divider,
  Fab,
  Modal,
  Paper,
  Slide,
  Tab,
  Tabs,
  Tooltip,
  Typography
} from "@mui/material"

import { generationsData, pokemonTypesData } from "../../types/filter"
import { Generations, Type, typeColor } from "../../types/pokemon"
import {
  setGeneration,
  setType,
  useAppDispatch,
  useAppSelector
} from "../../redux"
import { getTypeIcon } from "../../assets/pokemomTypeIcons"

export function Filter() {
  const dispatch = useAppDispatch()
  const filter = useAppSelector(state => state.filter)

  const [open, setOpen] = useState(false)

  const toggleDrawer = () => {
    setOpen(prev => !prev)
  }

  const handleGenChange = (
    _: SyntheticEvent<Element, Event>,
    value: Generations
  ) => {
    dispatch(setGeneration(value))
  }
  const handleTypeChange = (_: SyntheticEvent<Element, Event>, value: Type) => {
    dispatch(setType(value))
  }

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          position: "fixed",
          zIndex: 9999,
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "end"
        }}>
        <Tooltip placement="top-end" title="Filtrar">
          <Fab
            size="medium"
            color="error"
            sx={{ marginBottom: "24px", marginRight: "8px" }}
            onClick={toggleDrawer}>
            <TuneRounded />
          </Fab>
        </Tooltip>
      </Container>

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
              GERAÇÃO
            </Divider>

            <Tabs
              value={filter.generation.name}
              variant="scrollable"
              onChange={handleGenChange}
              scrollButtons
              allowScrollButtonsMobile>
              {generationsData.map(genDta => (
                <Tab
                  sx={{ width: 100 }}
                  key={genDta.name}
                  value={genDta.name}
                  label={genDta.name}
                />
              ))}
            </Tabs>

            <Divider sx={{ my: 2, fontSize: 25 }} textAlign="right">
              TIPO
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
