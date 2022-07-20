import {useState} from 'react'
import axios from 'axios'
import timeOutCallback from '../helpers/timeOutCallback'
import useNotification from './useNotification'

const global_url_api = process.env.REACT_APP_API_URL

const useAuth = (endpoint) => {
  const url = global_url_api + endpoint

  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  const { setToast } = useNotification()

  const sign_in = async (user) => {
    try {
      const data = await axios.post(url, 
        {
          user: {
            login: user.polymorphic_login,
            password: user.password,
          },
        }
      )
      if (data.data.status === "ok") {
        localStorage.setItem("token", data.headers.authorization)
        localStorage.setItem("user", JSON.stringify(data.data.user))
        setUser(data.data.user)
        setToken(data.headers.authorization)
        setLoading(false)
        timeOutCallback("/", 700)
        setToast(data.data)
      } else {
        console.log("error")
        setLoading(false)
        setToast(data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const sign_out = async() => {
    const data = await axios.delete(url)
    if (data.data.status === "ok") {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setUser(null)
      setToken(null)
      setLoading(false)
      timeOutCallback("/", 700)
      setToast(data.data)
    }else {
      setLoading(false)
      setToast(data.data)
    }    
  }

  return { user, token, loading, sign_in, sign_out }
}

export default useAuth