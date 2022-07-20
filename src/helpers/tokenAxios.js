export default function setAuthToken(axios, token) {
  axios.defaults.headers.common['Authorization'] = token
}