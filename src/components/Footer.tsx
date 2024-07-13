import { Box, Divider, IconButton, Tooltip, useTheme } from "@mui/material"
import { GitHub, LinkedIn } from "@mui/icons-material"

export function Footer() {
  const theme = useTheme()

  const redirectToGitHub = () => {
    window.open("https://github.com/Jean-Dresbach", "_blank")
  }
  const redirectToLinkedin = () => {
    window.open("https://www.linkedin.com/in/jean-rafael-dresbach", "_blank")
  }

  const iconColor =
    theme.palette.mode === "light" ? theme.palette.text.disabled : "white"

  return (
    <Box
      sx={{
        p: 3
      }}>
      <Divider>
        <Tooltip title="GitHub" placement="top" arrow>
          <IconButton onClick={redirectToGitHub}>
            <GitHub fontSize="large" sx={{ fill: iconColor }} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Linkedin" placement="top" arrow>
          <IconButton onClick={redirectToLinkedin}>
            <LinkedIn fontSize="large" sx={{ fill: iconColor }} />
          </IconButton>
        </Tooltip>
      </Divider>
    </Box>
  )
}
