import { createTheme } from "@mui/material"
import { red } from "@mui/material/colors"

export const light = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: red[600]
    }
  }
})
