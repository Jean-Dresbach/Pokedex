import { SyntheticEvent, useEffect, useState } from "react"
import { Box, Fade, Tab, Tabs, Typography, useTheme } from "@mui/material"

import { Pokemon } from "../../../../types/pokemon"
import { About } from "./About"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
  bgColor: string
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, bgColor, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ p: 3, bgcolor: bgColor }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  }
}

interface DetailedInfoProps {
  pokemonData: Pokemon
}

export function DetailedInfo({ pokemonData }: DetailedInfoProps) {
  const theme = useTheme()

  const [value, setValue] = useState(0)
  const [renderKey, setRenderKey] = useState(0)

  useEffect(() => {
    setRenderKey(prevKey => prevKey + 1)
  }, [pokemonData])

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
        p: 3,
        pt: 6,
        borderRadius: "32px 32px 0 0"
      }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="About" {...a11yProps(0)} />
        <Tab label="Base Stats" {...a11yProps(1)} />
        <Tab label="Evolution" {...a11yProps(2)} />
      </Tabs>

      <CustomTabPanel
        value={value}
        index={0}
        bgColor={theme.palette.background.default}
        key={renderKey}>
        <Fade in={value === 0} timeout={1000}>
          <Box sx={{ height: "100%" }}>
            <About pokemonData={pokemonData} />
          </Box>
        </Fade>
      </CustomTabPanel>

      <CustomTabPanel
        value={value}
        index={1}
        bgColor={theme.palette.background.default}
        key={renderKey + 1}>
        <Fade in={value === 1} timeout={1000}>
          <Typography> Item Two</Typography>
        </Fade>
      </CustomTabPanel>
      <CustomTabPanel
        value={value}
        index={2}
        bgColor={theme.palette.background.default}
        key={renderKey + 2}>
        <Fade in={value === 2} timeout={1000}>
          <Typography> Item Three</Typography>
        </Fade>
      </CustomTabPanel>
    </Box>
  )
}
