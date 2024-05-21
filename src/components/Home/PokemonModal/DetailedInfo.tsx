import { SyntheticEvent, useState } from "react"
import { Box, Fade, Tab, Tabs, Typography, useTheme } from "@mui/material"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  }
}

export function DetailedInfo() {
  const theme = useTheme()

  const [value, setValue] = useState(0)

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        flexGrow: 1,
        mt: -8,
        zIndex: 0,
        borderRadius: "32px 32px 0 0"
      }}>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Sobre" {...a11yProps(0)} />
        <Tab label="Status base" {...a11yProps(1)} />
        <Tab label="Evolução" {...a11yProps(2)} />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <Fade in={value === 0}>
          <Typography>Oi</Typography>
        </Fade>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <Fade in={value === 1}>
          <Typography> Item Two</Typography>
        </Fade>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Fade in={value === 2}>
          <Typography> Item Three</Typography>
        </Fade>
      </CustomTabPanel>
    </Box>
  )
}
