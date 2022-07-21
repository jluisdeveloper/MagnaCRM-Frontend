import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import useCrud from '../../hooks/useCrud'
import useChange from '../../hooks/useChange'

import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react-pro'

const initialData = {
  created_at: "",
  document_number: "",
  document_type: "",
  email: "",
  first_name: "",
  gender: "",
  id: 0,
  last_name: "",
  phone: '',
  updated_at: "",
  user_role_id: 0
}

const Edit = () => {
  const params = useParams()
  const [seller, setSeller] = useState(initialData)

  const { getModel, updateModel } = useCrud(`/api/v1/admin/sellers/${params.id_SE}`)
  const { handleChange, data } = useChange(seller)
  const { first_name, last_name, email, phone, document_type, document_number } = data

  const updateSeller = async() => {
    const _url_back = `/ejecutivos`
    const parsedData = {
      user: {
        first_name,
        last_name,
        email,
        phone,
        document_type,
        document_number
      }
    }
    await updateModel(parsedData, _url_back)
  }

  useEffect(() => {
    getModel(setSeller)
  }, [])

  return (
    <CRow>
      <CCol xs={6}>
        <CCard className="mb-2">
          <CCardHeader>
            <strong>Editar</strong>
          </CCardHeader>
          <CCardBody>
            <CCol xs={12}>
              {data !== {} && <CForm className="row g-3">
                <CRow className="g-3">
                  <CCol xs>
                    <CFormLabel>Nombres</CFormLabel>
                    <CFormInput 
                      value={first_name} 
                      name="first_name"
                      onChange={handleChange}
                      />
                  </CCol>
                  <CCol xs>
                    <CFormLabel>Apellidos</CFormLabel>
                    <CFormInput 
                    value={last_name}
                    name="last_name"
                    onChange={handleChange}
                    />
                  </CCol>
                </CRow>

                <CRow className="g-3">
                  <CCol xs>
                    <CFormLabel>Tipo de Documento</CFormLabel>
                    <CFormInput 
                    value={document_type}
                    name="document_type"
                    onChange={handleChange}
                    />
                  </CCol>
                  <CCol xs>
                    <CFormLabel>Numero de Documento</CFormLabel>
                    <CFormInput 
                    value={document_number}
                    name="document_number"
                    onChange={handleChange}
                    />
                  </CCol>
                </CRow>

                <CRow className="g-3 mb-4">
                  <CCol xs>
                    <CFormLabel>Telefono</CFormLabel>
                    <CFormInput 
                    value={data.phone ? phone : ''}
                    name="phone"
                    onChange={handleChange} 
                    />
                  </CCol>
                  <CCol xs>
                    <CFormLabel>Correo</CFormLabel>
                    <CFormInput 
                    value={email}
                    name="email"
                    onChange={handleChange}
                    />
                  </CCol>
                </CRow>
              </CForm>}
            </CCol>
          </CCardBody>
          <CCardFooter>
            <Link to="/ejecutivos" className="btn btn-info btn-sm float-end my-2 me-3">
              Regresar atras
            </Link>

            <CButton 
              size='sm'
              color='primary'
              onClick={ ()=> updateSeller() } 
              className="float-end my-2 me-3">
              Guardar
            </CButton>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  )
}
export default Edit