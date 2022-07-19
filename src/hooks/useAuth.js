import {useState} from 'react'
import axios from 'axios'
import timeOutCallback from '../helpers/timeOutCallback'

const global_url_api = process.env.REACT_APP_API_URL

const useAuth = (endpoint) => {
  const url = global_url_api + endpoint

  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)


  const sign_in = async (user) => {
    try {
      const data = await axios.post(url, 
        {
          user: {
            email: user.email,
            password: user.password,
          },
          // user: user,
        }
      )
      if (data.data.status === "ok") {
        localStorage.setItem("token", data.headers.authorization)
        localStorage.setItem("user", JSON.stringify(data.data.user))
        setUser(data.data.user)
        setToken(data.headers.authorization)
        setLoading(false)
        timeOutCallback()
      } else {
        console.log("error")
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const sign_out = async () => {
    try {
      await axios.delete(url, {
        headers: {
          authorization: token
        }
      })
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setUser(null)
      setToken(null)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  return { user, token, loading, sign_in, sign_out }
}

export default useAuth