import React, { useState, useEffect, Suspense } from 'react'
import axios from 'axios'
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
  CFormSelect,
} from '@coreui/react-pro'

import useCrud from '../../hooks/useCrud'


import MyLeadsTable from './extra/MyLeadsTable'

//api/v1/users/23/clients

let dataTable = {
  _header: [
    {
      label: '#',
      key: "#"
    },
    {
      label: "Nombres",
      key: "first_name",
    },
    {
      label: "Apellidos",
      key: "last_name",
    },
    {
      label: "Correo Electrónico",
      key: "email",
    },
    {
      label: "Teléfono",
      key: "phone",
    },
    {
      label: "Pais",
      key: "country",
    },
    {
      label: "Curso de Interés",
      key: "course",
    },
    {
      label: "Estado",
      key: "status",
    },
    {
      label: "Acciones",
    }
  ]
}

const MyLeads = () => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")))
  const [leads, setLeads] = useState({})

  const { getModelWithPagination: getLeads } = useCrud(`api/v1/users/${currentUser.id}/clients`)

  const handlePage = (page) => {
    getLeads(setLeads, page)
  }

  useEffect(() => {    
    getLeads(setLeads)  
  }, [])
  return (
    <CRow>
      {/* { console.log(leads) } */}
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="py-4">
            <strong>Mis Leads asignados</strong>
          </CCardHeader>
          <CCardBody>
            {/* { dataTable._data.length } */}
            <Suspense fallback={<CSpinner color="primary" variant="grow" />}>
              {
                leads.data && leads.data.length &&
                <MyLeadsTable
                  meta_data={dataTable}
                  leads={leads.data}
                  currentPage={leads.current_page}
                  totalPages={leads.total_pages}
                  perPages={leads.per_pages}
                  handlePage={handlePage}
                  // coursesAvailable={coursesAvailable}
                  // insertModel={insertModel}
                />
              }
            </Suspense>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default MyLeads