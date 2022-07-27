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
  const [courses, setCourse] = useState([])

  const { getModel, deleteModel } = useCrud('/api/v1/courses')

  const deleteCourse = async (id) => {
    await deleteModel(layerGetData, `/api/v1/admin/courses/${id}`)
  }

  const layerGetData = () => {
    getModel(setCourse)
  }

  useEffect(() => {
    getModel(setCourse)
  }, [])

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="py-4">
              <strong>Ejecutivos de Ventas,</strong> <small>listado completo</small>
              <CTooltip content="Regitrar nuevo curso">
                <Link 
                  to={`/cursos/nuevo`}
                  className='btn btn-sm btn-success ms-1 float-end'>
                  <CIcon icon={cilPlus} /> {' '} Registrar nuevo curso
                </Link>
              </CTooltip>

            </CCardHeader>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Precio</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Moneda</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Inicio</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Code</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {
                    courses.map((course, index) => (
                      <CTableRow key={course.id}>
                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                        <CTableDataCell>{course.name}</CTableDataCell>
                        <CTableDataCell>{course.price}</CTableDataCell>
                        <CTableDataCell>{course.currency}</CTableDataCell>
                        <CTableDataCell>{course.start}</CTableDataCell>
                        <CTableDataCell>{course.code}</CTableDataCell>
                        <CTableDataCell>
                          <CTooltip content="Detalles de registro">
                            <Link
                              to={`/ejecutivos/${course.id}/detalle`}
                              className="btn btn-sm btn-success ms-1"
                            >
                              <CIcon icon={cilZoomIn} />
                            </Link>
                          </CTooltip>
                          <CTooltip content="Editar registro">
                            <Link to={`/ejecutivos/${course.id}/editar`} className="btn btn-warning btn-sm ms-1">
                              <CIcon icon={cilPen} />
                            </Link>
                          </CTooltip>
                          <CTooltip content="Ver estadísticas">
                            <CButton color="primary" size="sm" className="ms-1" onClick={() => { }}>
                              <CIcon icon={cilChart} />
                            </CButton>
                          </CTooltip>
                          <CTooltip content="Eliminar registro">
                            <CButton color="danger" size="sm" className="ms-1" onClick={() => deleteCourse(course.id) }>
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