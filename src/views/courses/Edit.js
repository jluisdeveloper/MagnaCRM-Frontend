import React, { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import useCrud from '../../hooks/useCrud'
import useChange from '../../hooks/useChange'
import AppDropzone from "../../components/AppDropzone"

import PDF from '../../assets/images/icons/pdf.png'
import { cilSave, cilTrash, cilMagnifyingGlass } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faTrashCan, faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'

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
  CRow,
  CFormSelect,
  CTooltip
} from '@coreui/react-pro'

const initialData = {
  id: 0,
  name: "",
  price: "",
  currency: "",
  start: "",
  status: "",
  code: 0,
  brochures: []
}

const acceptParams = {
  'application/pdf': ['.pdf']
}

const Edit = () => {
  const params = useParams()
  const { course_id } = params
  const [course, setCourse] = useState(initialData)
  const [realFiles, setRealFiles] = useState(null)
  const [validated, setValidated] = useState(false)
  const [sendData, setSendData] = useState(false)

  const formEl = useRef(null);

  const { getModel: getCourse, updateModel } = useCrud(`/api/v1/courses/${course_id}`)
  const { insertModel: insertBrochure, deleteModel: deleteBrochure } = useCrud('/api/v1/brochures')
  const { handleChange, data } = useChange(course)
  const { name, price, currency, start, status, code, brochures } = data

  const updateCourse = async (event) => {
    checkValidation(event)
    event.preventDefault()
    if (sendData) {
      const _url_back = `/cursos`
      const finalData = new FormData()
      finalData.append('name', name)
      finalData.append('price', price)
      finalData.append('currency', currency)
      finalData.append('start', start)
      finalData.append('status', status)
      finalData.append('code', code)

      // realFiles.map((fileBrochure, index) => {
      //   finalData.append('course[brochures_attributes][' + index + '][file]', fileBrochure.file)
      //   finalData.append('course[brochures_attributes][' + index + '][file_name]', fileBrochure.file_name)
      // })
      await updateModel(finalData, _url_back)
    }
  }

  const checkValidation = (event) => {
    const form = formEl.current
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      setSendData(true)
    }
    setValidated(true)
  }

  const layerGetCourse = async () => {
    await getCourse(setCourse)
    // alert("que fue")
  }

  const removeBrochure = (_id) => {
    deleteBrochure(layerGetCourse, `/api/v1/brochures/${_id}`)
  }

  const uploadBrochure = async (_course_id) => {
    const formData = new FormData()
    formData.append('course_id', _course_id)
    realFiles.map((fileBrochure, index) => {
      formData.append('brochure[' + index + '][file]', fileBrochure)
    })
    await insertBrochure(formData, `/cursos/${_course_id}/editar`)
    setRealFiles(null)
    layerGetCourse()
  }

  useEffect(() => {
    getCourse(setCourse)
  }, [])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-2">
          <CCardHeader>
            <strong>Editar</strong>
          </CCardHeader>
          <CCardBody>
            <CCol xs={12}>
              {data !== {} &&
                <CForm
                  className="row g-3 needs-validation"
                  noValidate
                  validated={validated}
                  onSubmit={updateCourse}
                  ref={formEl}
                >
                  <CRow className="g-3">
                    <CCol xs={8}>
                      <CFormLabel>Nombre de Curso</CFormLabel>
                      <CFormInput
                        value={name ? name : ''}
                        name="name"
                        onChange={handleChange}
                        feedbackInvalid="Debes asignar un nombre del curso."
                        required
                      />
                    </CCol>
                    <CCol xs={4}>
                      <CFormLabel>Código <small>(Generado de manera automatica)</small></CFormLabel>
                      <CFormInput
                        value={code ? code : ''}
                        name="code"
                        // onChange={handleChange}
                        disabled
                      />
                    </CCol>

                  </CRow>

                  <CRow className="g-3">
                    <CCol xs={3}>
                      <CFormLabel>Precio</CFormLabel>
                      <CFormInput
                        value={price ? price : ''}
                        name="price"
                        onChange={handleChange}
                        feedbackInvalid="Debes asignar un precio al curso."
                        required
                      />
                    </CCol>
                    <CCol xs={2}>
                      <CFormLabel> Moneda </CFormLabel>
                      <CFormSelect
                        size="sm"
                        className="mb-3"
                        aria-label="Seleccionar una moneda"
                        name="currency"
                        onChange={handleChange}
                        value={currency ? currency : ""}
                        aria-describedby="validationCustom04Feedback"
                        feedbackInvalid="Debes escoger un tipo de moneda."
                        required
                      >
                        <option value="">Seleccione una opcion</option>
                        <option value="pen">Nuevo Sol ( S/. )</option>
                        <option value="usd">Dolar ( $. )</option>
                        <option value="euro">Euro ( €. )</option>
                      </CFormSelect>
                    </CCol>
                    <CCol xs={3}>
                      <CFormLabel>Fecha de Lanzamiento</CFormLabel>
                      <CFormInput
                        value={start ? start : ''}
                        name="start"
                        onChange={handleChange}
                        feedbackInvalid="Debes asignar una fecha de inicio del curso."
                        required
                      />
                    </CCol>
                    <CCol xs={4}>
                      <CFormLabel>Estado del Curso</CFormLabel>
                      <CFormSelect
                        size="sm"
                        className="mb-3"
                        aria-label="Seleccionar un estado"
                        name="status"
                        onChange={handleChange}
                        value={status ? status : ""}
                        aria-describedby="validationCustom04Feedback"
                        feedbackInvalid="Debes escoger un estado del curso."
                        required
                      >
                        <option value="">Seleccione una opcion</option>
                        <option value="on_hold">En Espera</option>
                        <option value="active">Activo</option>
                        <option value="inactive">En espera</option>
                        <option value="cancelled">Cancelado</option>
                      </CFormSelect>
                    </CCol>
                  </CRow>
                  <CRow className="g-3">
                    <CCol xs={6}>
                      <CFormLabel>Brochures <small> (archivos adjuntos) </small></CFormLabel>
                      <AppDropzone
                        setRealFiles={setRealFiles}
                        realFiles={realFiles}
                        acceptParams={acceptParams}
                      />
                      {
                        realFiles && realFiles.length ?
                          <CTooltip content="Subir estos archivos como brochure del curso">
                            <CButton color="success" onClick={() => uploadBrochure(course.id)}>
                              <FontAwesomeIcon icon={faCloudArrowUp} inverse />
                            </CButton>
                          </CTooltip>
                          : null
                      }
                    </CCol>
                    <CCol xs={6}>
                      <CFormLabel>Brochures actuales <small> (archivos actuales disponibles) </small></CFormLabel>
                      <CRow>
                        {
                          brochures.length ? brochures.map((brochure, index) => {
                            return (
                              <CCol xs={2} key={index} md="auto">
                                <CTooltip content={brochure.file_name}>
                                  <a href={brochure.file.url} target="_blank" rel="noopener noreferrer">
                                    <img src={PDF} alt={brochure.file_name} width="65" />
                                  </a>
                                </CTooltip>
                                <CRow>
                                  <CCol xs={4}>
                                    <CTooltip content="Eliminar brochure">
                                      <CButton size="sm" color="danger" className="mt-2" onClick={() => removeBrochure(brochure.id)}>
                                        <FontAwesomeIcon icon={faTrashCan} />
                                      </CButton>
                                    </CTooltip>
                                  </CCol>
                                  <CCol xs={4}>
                                    <CTooltip content="Visualizar brochure">
                                      <a href={brochure.file.url} className="btn btn-info btn-sm mt-2" target="_blank">
                                        <FontAwesomeIcon icon={faEye} />
                                      </a>
                                    </CTooltip>
                                  </CCol>
                                </CRow>
                              </CCol>
                            )
                          }) :
                            <>
                              <p className="p-5 text-danger">No hay brochures actuales</p>
                            </>
                        }
                      </CRow>
                    </CCol>
                  </CRow>
                </CForm>}
            </CCol>
          </CCardBody>
          <CCardFooter>
            <Link to="/cursos" className="btn btn-info btn-sm float-end my-2 me-3">
              Regresar atras
            </Link>

            <CButton
              size='sm'
              color='primary'
              onClick={(e) => updateCourse(e)}
              className="float-end my-2 me-3">
              Guardar
            </CButton>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  )
}
export default Edit