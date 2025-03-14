import { Box } from '@mui/material'
import React from 'react'

type Props = {
  title: string
  number: number
}

const DataCard = ({title, number}: Props) => {
  return (
    <Box
      sx={{ bgcolor: "#1E1E1E", color: "white", textTransform: "none", "&:hover": { bgcolor: "#333" }, borderRadius: 2, p: 4, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", width: "300px" }}
      >
    <h1 className='text-white font-bold text-6xl mb-3'>{number}</h1>
    <p className='text-zinc-400'>{title}</p>
    </Box>
  )
}

export default DataCard