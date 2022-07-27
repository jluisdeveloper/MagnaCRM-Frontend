import React, { useState, useEffect, Suspense } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import {
  CCol,
  CRow,
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CButton,
  CSpinner,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
} from '@coreui/react-pro'

import useCrud from '../../hooks/useCrud'
import useChange from '../../hooks/useChange'

import { normalizeDateWithHour } from '../../helpers/auxiliarFunctions'

import CallsTable from './extra/CallsTable'

// FALTA DAR UN CALLBACK PARA VERIFICAR SI EL LEAD LE PERTENECE AL USUARIO ACTUAL

const initialData = {
  first_name: '',
  last_name: '',
  phone: '',
  email: '',
  country: '',
  course: '',
  status: '',
}

const LeadFollow = () => {
  const { client_id } = useParams()
  const location = useLocation()
  const currentUser = JSON.parse(localStorage.getItem("user"))

  const [isLoading, setIsLoading] = useState(true)
  const [lead, setLead] = useState(initialData)

  const [showCallTable, setShowCallTable] = useState(false)
  const [calls, setCalls] = useState([])

  const { getModel: getLead } = useCrud(`/api/v1/clients/${client_id}`)
  const { getModel: getCalls } = useCrud(`/api/v1/clients/${client_id}/calls`)

  const { data, handleChange } = useChange(lead)
  // destructuring data
  const { first_name, last_name, phone, email, course, client_status, country, updated_at } = data

  const changeStatus = () => {
    setTimeout(() => {
      setIsLoading(false)
    }, 200)
  }

  const handleShowtable = () => {
    setShowCallTable(!showCallTable)
    getCalls(setCalls)
  }

  const reloadCalls = () => {
    getCalls(setCalls)
  }

  useEffect(() => {
    changeStatus()
    getLead(setLead)
  }, [])

  return (
    <>
      {
        !isLoading && lead ?
          <CRow>
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader className="py-3">
                  Dar Seguimiento a <strong> {first_name} {last_name}</strong>
                </CCardHeader>
                <CCardBody>
                  <CForm>
                    <CRow className="g-3 mb-3">
                      <CCol xs>
                        <CFormInput
                          label="Curso de interes"
                          name="course"
                          value={`${course.name} - ${course.code}`}
                          disabled
                        // onChange={handleChange}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="g-3 mb-3">
                      <CCol xs className="">
                        <CFormInput
                          label="Nombres"
                          name="first_name"
                          value={first_name}
                          onChange={handleChange}
                        />
                      </CCol>
                      <CCol xs>
                        <CFormInput
                          label="Apellidos"
                          name="last_name"
                          value={last_name}
                          onChange={handleChange}
                        />
                      </CCol>
                      <CCol xs>
                        <CFormInput
                          label="Telefono"
                          name="phone"
                          value={phone}
                          onChange={handleChange}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="g-3">
                      <CCol xs>
                        <CFormInput
                          label="Correo"
                          name="email"
                          value={email}
                          onChange={handleChange}
                        />
                      </CCol>
                      <CCol xs>
                        <CFormInput
                          label="País"
                          name="country"
                          value={country}
                          onChange={handleChange}
                        />
                      </CCol>
                      <CCol xs>
                        <CFormInput
                          label="Ultima actualización"
                          value={normalizeDateWithHour(updated_at)}
                          disabled
                        />
                      </CCol>
                      <CCol xs>
                        <CFormInput
                          label="Estado de Cliente"
                          value={client_status && `${client_status.name} - ${client_status.slug}`}
                          disabled
                        />
                      </CCol>
                    </CRow>
                  </CForm>

                  <CButton
                    className="my-4"
                    color="info"
                    onClick={() => handleShowtable()}
                  >
                    Historial de Llamadas
                  </CButton>
                  <Suspense fallback={<CSpinner color="primary" variant="grow" />}>
                    {
                      showCallTable && <CallsTable data={calls} client={data} handleChange={handleChange} updateClientState={setLead} getCalls={reloadCalls} />
                    }
                  </Suspense>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          :
          <CSpinner color="primary" variant="grow" />
      }
    </>
  )
}

export default LeadFollow