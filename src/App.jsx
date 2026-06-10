import { useState } from 'react'
import { Button, Typography, Box } from "@mui/material";

function App() {

  return (
    <>
        <Box p={4}>
            <Typography variant="h1">
                Sales Coach AI
            </Typography>

            <Button variant="contained">
                Start Visit
            </Button>
        </Box>
    </>
  )
}

export default App
