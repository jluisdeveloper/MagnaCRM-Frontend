import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CSpinner,
  CTooltip,
  CRow,
  CCol,
  CBadge
} from '@coreui/react-pro'

import { cilPhone, cilSend } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import ModalCallDetail from './ModalCallDetail'

const CallsTable = (props) => {
  // destructuring props
  const { meta_data, data: calls, client, handleChange, updateClientState, getCalls } = props

  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  const changeStatus = () => {
    setTimeout(() => {
      setIsLoading(false)
    }, 200)
  }

  const handleShowModal = (_action) => {
    setShowModal(_action)
  }

  useEffect(() => {
    changeStatus()
  }, [])

  return (
    <>
     {/* { console.log(props) } */}
      {
        isLoading ? <CSpinner color="primary" variant="grow" /> :
          <>
            <CRow>
              <CCol xs={12}>
                <CButton
                  color="primary"
                  size="sm"
                  className="mb-2 float-end"
                  onClick={() => handleShowModal(true)}
                >
                  Realizar Llamada <CIcon icon={cilPhone} />
                </CButton>
              </CCol>
            </CRow>

            <CTable className="mt-4">
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Fecha</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Notas</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Estado</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {
                  calls.map((call, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>{call.date_call}</CTableDataCell>
                      <CTableDataCell>
                      {
                        call.notes.length && call.notes.map((note, index) => (
                          <CTooltip key={index} content={note.description}>
                            <CBadge color="success" className="me-3">
                              Nota {index + 1}
                            </CBadge>
                          </CTooltip>
                        ))
                      }
                      </CTableDataCell>
                      <CTableDataCell>{call.status}</CTableDataCell>

                      {/* <CTableDataCell>{call.email}</CTableDataCell>
                      <CTableDataCell>{call.phone}</CTableDataCell>
                      <CTableDataCell>{call.country}</CTableDataCell>
                      <CTableDataCell>{call.course.name}</CTableDataCell> */}
                      {/* <CTableDataCell>
                        <CTooltip placement="top" content={call.client_status.name}>
                          <CBadge color="info">
                            {call.client_status.slug}
                          </CBadge>
                        </CTooltip>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CTooltip placement="top" content="Dar Seguimiento">
                          <Link to={`/leads/${call.id}/seguimiento`} className="btn btn-sm btn-success">
                            <CIcon icon={cilSend} />
                          </Link>
                        </CTooltip>
                      </CTableDataCell> */}
                    </CTableRow>
                  ))
                }
              </CTableBody>
            </CTable>
          </>
      }
      <ModalCallDetail
        showModal={showModal}
        handleShowModal={handleShowModal}
        client={client}
        handleChange={handleChange}
        updateClientState={updateClientState}
        getCalls={getCalls}
      />
    </>
  )
}

export default CallsTable