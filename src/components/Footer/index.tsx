import { Box, Divider, IconButton, Tooltip } from "@mui/material"
import { GitHub, LinkedIn } from "@mui/icons-material"

export function Footer() {
  const redirectToGitHub = () => {
    window.open("https://github.com/Jean-Dresbach", "_blank")
  }
  const redirectToLinkedin = () => {
    window.open("https://www.linkedin.com/in/jean-rafael-dresbach", "_blank")
  }

  return (
    <Box
      sx={{
        textAlign: "center",
        p: 3
      }}>
      <Divider>
        <Tooltip title="GitHub" placement="top" arrow>
          <IconButton onClick={redirectToGitHub}>
            <GitHub fontSize="large" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Linkedin" placement="top" arrow>
          <IconButton onClick={redirectToLinkedin}>
            <LinkedIn fontSize="large" />
          </IconButton>
        </Tooltip>
      </Divider>
    </Box>
  )
}
