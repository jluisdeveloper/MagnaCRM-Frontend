import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
  CFormSelect,
  CRow,
} from '@coreui/react-pro'

const initialData = {
  document_number: "",
  document_type: "",
  email: "",
  first_name: "",
  gender: "",
  last_name: "",
  phone: '',
}

const New = () => {
  const [seller, setSeller] = useState(initialData)
  const { handleChange, data } = useChange(seller)
  const { insertModel } = useCrud('/api/v1/admin/sellers')
  const { document_number, document_type, email, first_name, gender, last_name, phone } = data

  const handleNewSeller = async () => {
    const _url_back = `/ejecutivos`
    const parsedData = {
      user: {
        first_name,
        last_name,
        email,
        phone,
        gender,
        document_type,
        document_number,
        password: document_number,
        password_confirmation: document_number
      }
    }
    await insertModel(parsedData, _url_back)
  }

  return (
    <CRow>
      {console.log(data)}
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
                    <CFormSelect size="sm" className="mb-3" aria-label="Small select example" name="document_type" onChange={handleChange}>
                      <option value="">Seleccione una opcion</option>
                      <option value="dni">D.N.I</option>
                      <option value="passport">Pasaporte</option>
                      <option value="foreigner_card">Carnet de Extranjeria</option>
                    </CFormSelect>
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
                <CRow>
                  <CCol xs={12}>
                    <CFormLabel>Genero</CFormLabel>
                    <CFormSelect size="sm" multiple aria-label="Multiple select example" onChange={handleChange} name="gender">
                      <option value="">Seleccione una opcion</option>
                      <option value="male">Hombre</option>
                      <option value="female">Mujer</option>
                      <option value="no_specified">Otro</option>
                    </CFormSelect>
                  </CCol>
                </CRow>
              </CForm>
              }
            </CCol>
          </CCardBody>
          <CCardFooter>
            <Link to="/ejecutivos" className="btn btn-info btn-sm float-end my-2 me-3">
              Regresar atras
            </Link>

            <CButton
              size='sm'
              color='primary'
              onClick={() => handleNewSeller()}
              className="float-end my-2 me-3">
              Guardar
            </CButton>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  )
}
export default New