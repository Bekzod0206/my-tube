import { Box, Button, Container } from "@mui/material"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ApiService } from "../../service/api.service"
import { ChannelCard, Loader, Videos } from '../'

function Channel() {

  const { id } = useParams()
  const [channelDetail, setChannelDetail] = useState()
  const [video, setVideo] = useState([])
  useEffect(() => {
    const getData = async () => {
      try {
        const channelData = await ApiService.userFetching(`channels?part=snippet&id=${id}`)
        setChannelDetail(channelData.items[0])
        const videoData = await ApiService.userFetching(`search?channelId=${id}&part=snippet%2Cid&order=date`)
        setVideo(videoData?.items)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [id])
  if(!channelDetail || !video) return <Loader />

  return (
    <Box minHeight={'95vh'} mt={'1vh'}>
      <Box>
        <Box
          width={'100%'}
          height={'200px'}
          zIndex={10}
          sx={{
            backgroundImage: `url(${channelDetail?.brandingSettings?.image?.bannerExternalUrl})`,
            backgroundPosition: 'cover',
            backgroundSize: 'cover',
            objectFit: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        />
        <ChannelCard video={channelDetail} marginTop={'-100px'}/>
      </Box>
      <Container maxWidth={'90%'}>
        <Videos videos={video} />
      </Container>
    </Box>
  )
}

export default Channel