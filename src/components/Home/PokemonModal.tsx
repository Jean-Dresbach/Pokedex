import { Box, Modal, Paper, Slide, Typography } from "@mui/material"

import { useAppSelector, useAppDispatch, closePokemonModal } from "../../redux"

export function PokemonModal() {
  const dispatch = useAppDispatch()
  const { isOpen, pokemonData } = useAppSelector(state => state.pokemonModal)

  const handleClose = () => dispatch(closePokemonModal())
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Slide direction="up" in={isOpen}>
        <Paper
          sx={{
            position: "absolute",
            inset: 0,
            maxWidth: "900px",
            margin: "auto",
            marginBottom: 0,
            elevation: 3,
            p: 3,
            outline: "none"
          }}
          elevation={3}>
          <Box></Box>
        </Paper>
      </Slide>
    </Modal>
  )
}
