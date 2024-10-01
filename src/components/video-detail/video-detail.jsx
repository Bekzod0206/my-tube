import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ApiService } from "../../service/api.service"
import { Avatar, Box, Chip, Stack, Typography } from "@mui/material"
import ReactPlayer from 'react-player'
import {Loader, Videos} from "../"
import { CheckCircle, FavoriteOutlined, MarkChatRead, Tag, Visibility } from "@mui/icons-material"
// import renderHTML from 'react-render-html';

function VideoDetail() {

  const { id } = useParams()
  const [videoDetail, setVideoDetail] = useState(null)
  const [relatedVideo, setRelatedVideo] = useState(null)
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await ApiService.userFetching(`videos?part=snippet,statistics&id=${id}`)
        setVideoDetail(data.items[0])
        const relatedData = await ApiService.userFetching(`search?part=snippet&relatedToVideoId=${id}&type=video`)
        setRelatedVideo(relatedData.items)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [id])

  if(!videoDetail || !relatedVideo){
    return <Loader />
  }

  const {
    snippet: {title, channelId, channelTitle, description, tags, thumbnails},
    statistics: {viewCount, likeCount, commentCount},
  } = videoDetail

  return (
    <Box minHeight={'90vh'} mb={10}>
      <Box display={'flex'} sx={{flexDirection: {xs: 'column', md: 'row'}}}>
        <Box width={{xs: '100%', md: '75%'}}>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${id}`}
            className='react-player'
            controls
          />
          {tags.map((item, idx) => (
            <Chip
              label={item}
              key={idx}
              sx={{marginTop: '10px', cursor: 'pointer', ml: '10px'}}
              deleteIcon={<Tag />}
              onDelete={() => {}}
              variant="outined"
            />
          ))}
          <Typography variant={'h5'} fontWeight={'bold'} p={2}>
            {title}
          </Typography>
          <Typography variant={'subtitle2'} p={2} sx={{opacity: '.7'}} >
            {description}
          </Typography>
          <Stack direction={'row'} gap={'20px'} alignItems={'center'} py={1} px={2}>
            <Stack sx={{opacity: 0.7}} direction={'row'} alignItems={'center'} gap={'3px'}>
              <Visibility />
              {parseInt(viewCount).toLocaleString()} views
            </Stack>
            <Stack sx={{opacity: 0.7}} direction={'row'} alignItems={'center'} gap={'3px'}>
              <FavoriteOutlined />
              {parseInt(likeCount).toLocaleString()} likes
            </Stack>
            <Stack sx={{opacity: 0.7}} direction={'row'} alignItems={'center'} gap={'3px'}>
              <MarkChatRead />
              {parseInt(commentCount).toLocaleString()} coment
            </Stack>
          </Stack>
          <Stack direction={'row'} py={1} px={2}>
            <Stack direction={'row'} alignItems={'center'} gap={'5px'} marginTop={'5px'}>
              <Avatar
                alt={channelTitle}
                src={thumbnails.default.url}
              />
              <Typography variant={'subtitle2'} color={'gray'}>
                {channelTitle}
                <CheckCircle sx={{fontSize: '12px',color: 'gray', ml: '5px'}} />
              </Typography>
            </Stack>
          </Stack>
        </Box>
        <Box
          width={{xs: '100%', md: '25%'}}
          px={2}
          py={{md: 1, xs: 5}}
          justifyContent={'center'}
          alignItems={'center'}
          overflow={'scroll'}
          maxHeight={'120vh'}
        >
          <Videos videos={relatedVideo} />
        </Box>
      </Box>
    </Box>
  )
}

export default VideoDetail