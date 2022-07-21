import { useState } from 'react'
import axios from 'axios'
import timeOutCallback from '../helpers/timeOutCallback'
import useNotification from './useNotification'
import useAuth from './useAuth'

const global_url_api = process.env.REACT_APP_API_URL

const useCrud = (endpoint) => {
  const [data, setData] = useState(null)

  const { setToast } = useNotification()
  const { sign_out } = useAuth()

  const authAxios = axios.create({
    baseURL: global_url_api,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': localStorage.getItem('token')
    }
  })

  const getModel = async (_setData, _endpoint = endpoint) => {
    try {
      const resp = await authAxios.get(_endpoint)
      if (resp.data.status === "ok") {
        _setData(resp.data.data)
      } else {
        _setData(null)
      }
    } catch (error) {
      _setData(null)
      sign_out()
    }
  }

  const updateModel = async (data, _url_back, _endpoint = endpoint) => {
    try {
      const resp = await authAxios.put(_endpoint, data)
      if (resp.data.status === "ok") {
        timeOutCallback(_url_back)
        setToast(resp.data)
      } else {
        setToast(data.data)
      }
    } catch (error) {
      sign_out()
    }
  }

  const insertModel = async (data, _url_back, _endpoint = endpoint) => {
    try {
      const resp = await authAxios.post(_endpoint, data)
      if (resp.data.status === "ok") {
        timeOutCallback(_url_back)
        setToast(resp.data)
      } else {
        setToast(data.data)
      }
    } catch (error) {
      sign_out()
    }
  }

  const deleteModel = async (_getData, _endpoint = endpoint) => {
    try {
      const resp = await authAxios.delete(_endpoint)
      if (resp.data.status === "ok") {
        _getData()
        setToast(resp.data)
      } else {
        setToast(resp.data)
      }
    } catch (error) {
      sign_out()
    }
  }

  return { data, getModel, updateModel, insertModel, deleteModel }
}

export default useCrud