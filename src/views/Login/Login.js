import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import useAuth from 'src/hooks/useAuth'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" })
  const { sign_in } = useAuth("/users/sign_in")

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }


  const handleSubmitLogin = async () => {
    try {
      const data = await axios.post(
        "http://127.0.0.1:3000/users/sign_in",
        {
          user: {
            email: user.login,
            password: user.password,
          },
          // user: user,
        }
      )
      if (data.data.status === "ok") {
        localStorage.setItem("token", data.headers.authorization)
        localStorage.setItem("user", JSON.stringify(data.data.user))
        setTimeout(() => {
          window.location.replace("/")
        }, 200)
      } else {
        alert("Usuario o contraseña incorrectos")
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Iniciar Sesion</h1>
                    <p className="text-medium-emphasis">Ingrese sus credenciales</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Numero de DNI"
                        autoComplete="DNI"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          color="primary"
                          className="px-4"
                          onClick={() => sign_in(user)}
                        >
                          Ingresar
                        </CButton>
                      </CCol>
                      {/* <CCol xs={6} className="text-right">
                        <CButton 
                          color="danger" 
                          className="px-0"
                          onClick={(e)=> handleSubmitLogout(e)}
                        >
                          Cerrar Sesion
                        </CButton>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>MAGNA CRM</h2>
                    <p>
                      Sistema de gestion de clientes para la empresa MAGNA, desarrollado por la agencia MAKI.
                    </p>
                    {/* <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link> */}
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
