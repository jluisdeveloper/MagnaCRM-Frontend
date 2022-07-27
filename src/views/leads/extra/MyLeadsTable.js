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
  CBadge
} from '@coreui/react-pro'

import { cilSend, cilSave } from '@coreui/icons'
import CIcon from '@coreui/icons-react'


const MyLeadsTable = (props) => {
  // destructuring props
  const { meta_data, data: leads } = props

  const [isLoading, setIsLoading] = useState(true)

  const changeStatus = () => {
    setTimeout(() => {
      setIsLoading(false)
    }, 200)
  }

  useEffect(() => {
    changeStatus()
  }, [])

  return (
    <>
      {
        isLoading ? <CSpinner color="primary" variant="grow" /> :
          <CTable className="mt-4">
            <CTableHead>
              <CTableRow>
                {
                  meta_data._header.map((header, index) => (
                    index < meta_data._header.length - 1 && <CTableHeaderCell key={index} scope="col">{header.label}</CTableHeaderCell>
                  ))
                }
                <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {
                leads.map((client, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{client.first_name}</CTableDataCell>
                    <CTableDataCell>{client.last_name}</CTableDataCell>
                    <CTableDataCell>{client.email}</CTableDataCell>
                    <CTableDataCell>{client.phone}</CTableDataCell>
                    <CTableDataCell>{client.country}</CTableDataCell>
                    <CTableDataCell>{client.course.name}</CTableDataCell>
                    <CTableDataCell>
                      <CTooltip placement="top" content={client.client_status.name}>
                        <CBadge color="info">
                          {client.client_status.slug}
                        </CBadge>
                      </CTooltip>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CTooltip placement="top" content="Dar Seguimiento">
                        <Link to={`/leads/${client.id}/seguimiento`} className="btn btn-sm btn-success">
                          <CIcon icon={cilSend} />
                        </Link>
                      </CTooltip>
                    </CTableDataCell>
                  </CTableRow>
                ))
              }
            </CTableBody>
          </CTable>
      }
    </>
  )
}

export default MyLeadsTable