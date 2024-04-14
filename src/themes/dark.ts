import { createTheme } from "@mui/material"
import { red } from "@mui/material/colors"

export const dark = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: red[400]
    }
  }
})
