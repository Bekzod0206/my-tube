import axios from 'axios'

const BASE_URI = 'https://youtube-v31.p.rapidapi.com'
const options = {
  params: {
    maxResults: '50'
  },
  headers: {
    'x-rapidapi-key': '77c4278295mshb264505e5012272p1b2004jsn428e2e6259eb',
    'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
  }
};


export const ApiService = {
  async userFetching(url){
    const response = await axios.get(`${BASE_URI}/${url}`, options)
    return response.data
  },
}