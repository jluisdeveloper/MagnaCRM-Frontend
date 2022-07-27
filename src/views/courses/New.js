import React, { useState } from 'react'
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
  name: "",
  price: "",
  currency: "",
  start: "",
  status: ""
}

const New = () => {
  const [course, setCourse] = useState(initialData)
  const { handleChange, data } = useChange(course)
  const { insertModel } = useCrud('/api/v1/courses')
  const { name, price, currency, start, status } = data

  const handleNewCourse = async () => {
    const _url_back = `/cursos`
    const parsedData = {
      course: {
        name, 
        price, 
        currency, 
        start, 
        status
      }
    }
    await insertModel(parsedData, _url_back)
  }

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
                    <CFormLabel>Nombre de Curso</CFormLabel>
                    <CFormInput
                      value={name}
                      name="name"
                      onChange={handleChange}
                    />
                  </CCol>
                  <CCol xs>
                    <CFormLabel>Precio del Curso</CFormLabel>
                    <CFormInput
                      value={price}
                      name="price"
                      onChange={handleChange}
                    />
                  </CCol>
                </CRow>

                <CRow className="g-3">
                  <CCol xs>
                    <CFormLabel>Estado</CFormLabel>
                    <CFormSelect size="sm" className="mb-3" aria-label="Small select example" name="status" onChange={handleChange}>
                      <option value="">Seleccione una opcion</option>
                      <option value="active">Activo</option>
                      <option value="inactive">En espera</option>
                    </CFormSelect>
                  </CCol>
                  <CCol xs>
                    <CFormLabel>Moneda</CFormLabel>
                    <CFormSelect size="sm" className="mb-3" aria-label="Small select example" name="currency" onChange={handleChange}>
                      <option value="">Seleccione una opcion</option>
                      <option value="pen">Nuevo Sol (S/.)</option>
                      <option value="usd">Dolar ($)</option>
                      <option value="euro">Euro (€)</option>
                    </CFormSelect>
                  </CCol>
                  <CCol xs>
                    <CFormLabel>Fecha de Inicio</CFormLabel>
                    <CFormInput
                      type="date"
                      value={start}
                      name="start"
                      onChange={handleChange}
                    />
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
              onClick={() => handleNewCourse()}
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