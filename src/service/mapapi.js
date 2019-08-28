import axios from 'axios'
const API_KEY = '1775fe030d91979c3d21d1536240d95c'

export default function searchLocation (locationString) {

  const config= {
    params: {
      query: locationString
    },
    headers: {
      Authorization: 'KakaoAK ' + API_KEY
    }
  }

  return axios.get(
    'https://dapi.kakao.com/v2/local/search/keyword.json',
      config
    ).then(
      value => {
        for(let i = 0; i < value.data.documents.length; i++) {
          if(value.data.documents[i]['place_name'] === locationString)
            return value.data.documents[i]
        }
      }
    )
}