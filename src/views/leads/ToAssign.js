import React, { useState, useEffect } from 'react'
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
  CMultiSelect,
  CRow,
} from '@coreui/react-pro'

import useCrud from '../../hooks/useCrud'
import useChange from '../../hooks/useChange'

const filterPrototype = {
  course_id: 0,
  user_id: 0
}

const ToAssign = () => {
  const [courses, setCourses] = useState([])
  const [users, setUsers] = useState([])
  const [validated, setValidated] = useState(false)

  const { getModel: getCourses } = useCrud('/api/v1/courses')
  const { getModel: getUsers } = useCrud('/api/v1/admin/sellers')
  const { insertModel: assignCourse } = useCrud('/api/v1/clients/assign_to_sales_executive')
  const { handleChange, data } = useChange(filterPrototype)

  // destructuring data
  const { course_id, user_id, percent } = data

  const handleSubmit = (event, _data) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
    assignCourse(_data)
  }

  useEffect(() => {
    getCourses(setCourses)
    getUsers(setUsers)
  }, [])
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-2">
          <CCardHeader>
            <strong>Asignar LEAD's a Ejecutivos de ventas</strong>
          </CCardHeader>
          <CCardBody>
            <CCol xs={12}>
              <CForm
                className="row g-3 needs-validation"
                noValidate
                validated={validated}
              >
                <CRow className="g-3">
                  <CCol xs>
                    <CFormLabel>Curso</CFormLabel>
                    <CFormSelect size="sm"
                      className=""
                      aria-describedby="validationCourseFeedback"
                      feedbackInvalid="Debes escoger un curso."
                      id="validationCourse"
                      name="course_id"
                      onChange={handleChange}
                      required
                    >
                      <option value="">Seleccione una opcion</option>
                      {
                        courses.map(course => {
                          return <option key={course.id} value={course.id}>{course.name} - ( {course.code} )</option>
                        })
                      }
                    </CFormSelect>
                  </CCol>
                </CRow>
                <CRow className="g-3">
                  <CCol xs>
                    <CFormLabel>Ejecutivos de Ventas Disponibles</CFormLabel>
                    <CFormSelect size="sm"
                      className=""
                      aria-describedby="validationSEFeedback"
                      feedbackInvalid="Debes escoger un ejecutivo."
                      id="validationSE"
                      name="user_id"
                      onChange={handleChange}
                      required
                    >
                      <option value="">Seleccione una opcion</option>
                      {
                        users.map(user => {
                          return <option key={user.id} value={user.id}>{user.first_name}</option>
                        })
                      }
                    </CFormSelect>
                  </CCol>
                  <CCol xs>
                    <CFormLabel>Asignar por Porcentaje</CFormLabel>
                    <CFormSelect size="sm"
                      className=""
                      aria-describedby="validationPercentFeedback"
                      feedbackInvalid="Debes ingresar un porcentaje."
                      id="validationPercent"
                      name="percent"
                      onChange={handleChange}
                      required
                    >
                      <option value="">Seleccione una opcion</option>
                      <option value="100">Todo (100%) </option>
                      <option value="50">Mitad (50%) </option>
                      <option value="25">Porcion (25%) </option>
                    </CFormSelect>
                  </CCol>
                </CRow>
                <CRow className="g-3">
                  <CCol xs>
                    <CButton color="success" size="sm" className="float-end ms-3" onClick={(e)=>handleSubmit(e,data)}>Asignar</CButton>
                    <CButton color="info" size="sm" className="float-end" onClick={handleSubmit}>Previsualizar</CButton>
                  </CCol>
                </CRow>
              </CForm>
            </CCol>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ToAssign