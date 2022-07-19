import React from 'react'
import axios from 'axios'
import {
  CButton,
  CCol
} from '@coreui/react-pro'

const Dashboard = () => {
  const handleSubmitLogout = async(e) => {
    e.preventDefault()
    try {
      const data = await axios.delete(
        "http://localhost:3000/users/sign_out"
      )
      console.log(data)
      
      if (data.data.status === "ok") {
        localStorage.removeItem("token")
        setTimeout(() => {
          window.location.replace("/")
        }, 200)
      } else {
        alert("Ocurrio un problema intenta de nuevo")
      }
      // setTimeout(() => {
      //   window.location.replace("/")
      // }, 200)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <CCol xs={6} className="text-right">
        <CButton
          color="danger"
          className="px-0"
          onClick={(e) => handleSubmitLogout(e)}
        >
          Cerrar Sesion
        </CButton>
        <h1>
          {JSON.parse(localStorage.getItem("user")).first_name}
        </h1>
      </CCol>
    </>
  )
}

export default Dashboard
