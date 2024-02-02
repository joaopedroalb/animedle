import Game from "@/components/Game";
import { getAllAnime, getDailyAnime } from "@/services/AnimeService";
import { Box, Typography } from "@mui/material";

export default async function Home() {
  const animeData = await getDailyAnime()
  const searchOptions = await getAllAnime()
  return (
    <Box sx={{display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', flex: 1}}>
      {
        animeData ? 
          <Game type='standard' animeData={animeData} searchOptions={searchOptions}/> : 
          <Typography fontSize={28}>Our server is temporarily down, please try again in a few minutes... </Typography>
      }
    </Box>
  )
}
