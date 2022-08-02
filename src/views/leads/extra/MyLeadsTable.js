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
  CBadge,
  CTableFoot,
  CSmartPagination
} from '@coreui/react-pro'

import { cilSend, cilSave } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import ReactCountryFlag from "react-country-flag"


const MyLeadsTable = (props) => {
  // let found = countryListAllIsoData.find(country => country.name === races.Circuit.Location.country);
  // let code = found ? found.code3 : 'n/a';


  // destructuring props
  const { meta_data, leads, currentPage, totalPages, perPages, handlePage } = props

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
      {/* {console.log(lookup.byCountry('UK').iso2)} */}
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
                    <CTableDataCell>{(index + 1) + (currentPage - 1) * perPages}</CTableDataCell>
                    <CTableDataCell>{client.first_name}</CTableDataCell>
                    <CTableDataCell>{client.last_name}</CTableDataCell>
                    <CTableDataCell>{client.email}</CTableDataCell>
                    <CTableDataCell>{client.phone}</CTableDataCell>
                    <CTableDataCell>
                      <CTooltip placement="top" content={client.country}>
                        <span style={{"cursor": "default"}}>
                          <ReactCountryFlag
                            className="emojiFlag"
                            countryCode={client.country_code}
                            style={{
                              fontSize: '1.5em',
                              lineHeight: '1.5em',
                            }}
                          // svg
                          />
                        </span>
                      </CTooltip>
                    </CTableDataCell>
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
      <CSmartPagination
        align="end"
        size="sm"
        activePage={currentPage}
        pages={totalPages}
        onActivePageChange={handlePage}
      />
    </>
  )
}

export default MyLeadsTable