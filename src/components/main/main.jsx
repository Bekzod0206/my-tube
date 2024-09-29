import { useEffect, useState } from 'react'
import {Box, Stack, Typography} from '@mui/material'
import {colors} from '../../constants/colors'
import { Category, Videos } from '../'
import { ApiService } from '../../service/api.service'

function Main() {

  const [selectedCategory, setSelectedCategory] = useState('New')
  const [videos, setVideos] = useState([])

  const selectedCategoryHandler = (category) => setSelectedCategory(category)

  useEffect(() => {
    const getData = async () => {
      try{
        const data = await ApiService.userFetching(`search?part=snippet&q=${selectedCategory}`)
        setVideos(data.items)
      }catch(err){
        console.log(err)
      }
    }
    getData()
  }, [selectedCategory])

  return (
    <Stack>
      <Category selectedCategoryHandler={selectedCategoryHandler} selectedCategory={selectedCategory}/>
      <Box p={2} sx={{height: '90vh'}}>
        <Typography variant={'h4'} fontWeight={'bold'} mb={2}>
          {selectedCategory} <span style={{color: colors.secondary}}>videos</span>
        </Typography>
        <Videos videos={videos} />
      </Box>
    </Stack>
  )
}

export default Main