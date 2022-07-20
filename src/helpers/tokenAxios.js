export default function setAuthToken(axios, token) {
  console.log(typeof(token))
  axios.defaults.headers.common['Authorization'] = token
}