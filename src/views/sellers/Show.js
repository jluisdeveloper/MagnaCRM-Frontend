import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import useCrud from '../../hooks/useCrud'

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
  CFormTextarea,
  CRow,
} from '@coreui/react-pro'


import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


const Show = () => {
  const params = useParams()

  const [seller, setSeller] = useState({})
  const [viewChart, setViewChart] = useState(false)

  const { getModel } = useCrud(`/api/v1/admin/sellers/${params.id_SE}`)

  const data = {
    labels: ['Leads', 'DC', 'CI', 'CP', 'EF', 'M'],
    datasets: [
      {
        label: 'Estadisticas',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const generateChart = () => {
    setTimeout(() => {
      setViewChart(true)
    }, 1500)
    
  }

  useEffect(() => {
    getModel(setSeller)

  }, [])

  return (
    <CRow>
      <CCol xs={6}>
        <CCard className="mb-2">
          <CCardHeader>
            <strong>Datos de Ejecutivo</strong>
          </CCardHeader>
          <CCardBody>
            <CCol xs={12}>
              {seller && <CForm className="row g-3">
                <CRow className="g-3">
                  <CCol xs>
                    <CFormLabel>Nombres</CFormLabel>
                    <CFormInput placeholder={seller.first_name} readOnly />
                  </CCol>
                  <CCol xs>
                    <CFormLabel>Apellidos</CFormLabel>
                    <CFormInput placeholder={seller.last_name} readOnly />
                  </CCol>
                </CRow>

                <CRow className="g-3">
                  <CCol xs>
                    <CFormLabel>Tipo de Documento</CFormLabel>
                    <CFormInput placeholder={seller.document_type} readOnly />
                  </CCol>
                  <CCol xs>
                    <CFormLabel>Numero de Documento</CFormLabel>
                    <CFormInput placeholder={seller.document_number} readOnly />
                  </CCol>
                </CRow>

                <CRow className="g-3 mb-4">
                  <CCol xs>
                    <CFormLabel>Telefono</CFormLabel>
                    <CFormInput placeholder={seller.phone} readOnly />
                  </CCol>
                  <CCol xs>
                    <CFormLabel>Correo</CFormLabel>
                    <CFormInput placeholder={seller.email} readOnly />
                  </CCol>
                </CRow>
              </CForm>}
            </CCol>
          </CCardBody>
          <CCardFooter>
            <Link to="/ejecutivos" className="btn btn-info btn-sm float-end my-2 me-3">
              Regresar atras
            </Link>

            <Link to={`/ejecutivos/${seller.id}/editar`} className="btn btn-warning btn-sm float-end my-2 me-3">
              Editar
            </Link>
          </CCardFooter>
        </CCard>
      </CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Estadisticas del Ejecutivo</strong>
          </CCardHeader>
          <CCardBody>
            <CCol xs={12}>
              <CButton size="sm" color="primary" onClick={() => generateChart()} >
                Generar Estadisticas
              </CButton>

              { viewChart && <Pie data={data} /> }
            </CCol>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Show