import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
  CButton,
} from '@coreui/react-pro'
import { cilPen, cilZoomIn, cilChart, cilTrash, cilPlus } from '@coreui/icons'
import useCrud from '../../hooks/useCrud'
import CIcon from '@coreui/icons-react'


const Index = () => {
  const [sellers, setSellers] = useState([])

  const { getModel, deleteModel } = useCrud('/api/v1/admin/sellers')

  const deleteSeller = async (id) => {
    await deleteModel(layerGetData, `/api/v1/admin/sellers/${id}`)
  }

  const layerGetData = () => {
    getModel(setSellers)
  }

  useEffect(() => {
    getModel(setSellers)
  }, [])

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="py-4">
              <strong>Ejecutivos de Ventas,</strong> <small>listado completo</small>
              <CTooltip content="Regitrar nuevo ejecutivo de ventas">
                <Link 
                  to={`/ejecutivos/nuevo`}
                  className='btn btn-sm btn-success ms-1 float-end'>
                  <CIcon icon={cilPlus} /> {' '} Registrar nuevo ejecutivo de ventas
                </Link>
              </CTooltip>

            </CCardHeader>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Nombres</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Apellidos</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Nro de Documento</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Telefono</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Correo</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {
                    sellers.map((seller, index) => (
                      <CTableRow key={seller.id}>
                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                        <CTableDataCell>{seller.first_name}</CTableDataCell>
                        <CTableDataCell>{seller.last_name}</CTableDataCell>
                        <CTableDataCell>{seller.document_number}</CTableDataCell>
                        <CTableDataCell>{seller.phone}</CTableDataCell>
                        <CTableDataCell>{seller.email}</CTableDataCell>
                        <CTableDataCell>
                          <CTooltip content="Detalles de registro">
                            <Link
                              to={`/ejecutivos/${seller.id}/detalle`}
                              className="btn btn-sm btn-success ms-1"
                            >
                              <CIcon icon={cilZoomIn} />
                            </Link>
                          </CTooltip>
                          <CTooltip content="Editar registro">
                            <Link to={`/ejecutivos/${seller.id}/editar`} className="btn btn-warning btn-sm ms-1">
                              <CIcon icon={cilPen} />
                            </Link>
                          </CTooltip>
                          <CTooltip content="Ver estadísticas">
                            <CButton color="primary" size="sm" className="ms-1" onClick={() => { }}>
                              <CIcon icon={cilChart} />
                            </CButton>
                          </CTooltip>
                          <CTooltip content="Eliminar registro">
                            <CButton color="danger" size="sm" className="ms-1" onClick={() => deleteSeller(seller.id) }>
                              <CIcon icon={cilTrash} />
                            </CButton>
                          </CTooltip>
                        </CTableDataCell>
                      </CTableRow>
                    ))
                  }
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Index