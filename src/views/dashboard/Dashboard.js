import React, {useState, useEffect} from 'react'
import useAuth from 'src/hooks/useAuth'


import axios from 'axios'
import setAuthToken from 'src/helpers/tokenAxios'
import {
  CButton,
  CCol
} from '@coreui/react-pro'

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState(null)

  const { sign_out } = useAuth("/users/sign_out")
  
  const getCurrentUser = async() => {
    try {
      const data = await axios.get(
        "http://localhost:3000/current_user"
      )
      // console.log(data)
      setCurrentUser(data.data.user)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setAuthToken(axios, localStorage.getItem("token"))
  }, [])

  return (
    <>
      <CCol xs={6} className="text-right">
        <CButton
          color="danger"
          className="px-0"
          onClick={() => sign_out()}
        >
          Cerrar Sesion
        </CButton>

        <CButton
          color="success"
          className="px-0"
          onClick={(e) => getCurrentUser(e)}
        >
          Check Current User
        </CButton>
        <h1>
          {/* {JSON.parse(localStorage.getItem("user")).first_name} */}
        </h1>
      </CCol>
    </>
  )
}

export default Dashboard
