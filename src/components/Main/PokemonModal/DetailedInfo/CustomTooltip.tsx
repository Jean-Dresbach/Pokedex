import { Tooltip } from "@mui/material"
import { ReactElement, useState } from "react"

interface CustomTooltipProps {
  children: ReactElement
  title: string
}

export function CustomTooltip({ children, title }: CustomTooltipProps) {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Tooltip
      open={open}
      onClose={handleClose}
      onOpen={handleOpen}
      onClick={handleOpen}
      title={title}
      placement="right"
      arrow
      PopperProps={{
        sx: {
          maxWidth: 150
        }
      }}>
      {children}
    </Tooltip>
  )
}
