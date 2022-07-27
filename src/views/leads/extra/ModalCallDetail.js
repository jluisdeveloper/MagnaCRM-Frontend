import React, { useState } from 'react'
import {
  CRow,
  CCol,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CFormSelect,
  CButton,
  CTooltip,
  CModalFooter,
  CDatePicker
} from '@coreui/react-pro'

import { cilPlus, cilSend, cilCommentBubble, cilSad, cilEnvelopeLetter, cilLoopCircular, cilStar, cilFaceDead } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import useCrud from '../../../hooks/useCrud'

const ModalCallDetail = (props) => {
  const { showModal, handleShowModal, client, handleChange, updateClientState, getCalls } = props

  const [typeComment, setTypeComment] = useState('')
  const [showFormComment, setShowFormComment] = useState(false)

  const [notes, setNotes] = useState([{ description: "" }])

  const [call, setCall] = useState({
    client_id: client.id,
    user_id: JSON.parse(localStorage.getItem("user")).id,
    date_call: new Date().toGMTString(),
    notes_attributes: []
  })


  const { insertModel: sendBrochureAPI } = useCrud('/api/v1/clients/send_brochure')
  const { insertModelWithCallback: insertCallAPI } = useCrud('/api/v1/calls')

  const handleSubmitCallWithNotes = () => {
    insertCallAPI(call).then(() => {
      handleShowModal(false)
      getCalls()
    }).catch((error) => {
      console.log(error)
    })
  }


  const sendBrochure = () => {
    setTypeComment('brochure')
    setShowFormComment(true)
    let temp = { ...call };
    temp.notes_attributes.push(
      {
        description: `Estoy enviando el brochure el dia ${new Date().toLocaleString()}`,
      }
    );
    setCall(temp);
  }

  const handleSubmitBrochure = () => {
    const finalData = {
      client_id: client.id,
      user_id: JSON.parse(localStorage.getItem("user")).id,
    }

    sendBrochureAPI(finalData, "")
  }


  const markNotInterested = () => {
    setTypeComment('negative')
    setShowFormComment(true)
    let temp = { ...call }
    temp.notes_attributes.push(
      {
        description: `El cliente me indica que no esta interesado en el programa por el siguiente motivo `,
      }
    );
    setCall(temp)
  }

  const markWrongNumber = () => {
    setTypeComment('negative')
    setShowFormComment(true)
    let temp = { ...call }
    temp.notes_attributes.push(
      {
        description: `El numero de telefono del cliente es incorrecto `,
      }
    );
    setCall(temp)
  }

  const rescheduleCall = () => {
    setTypeComment('reschedule')
    setShowFormComment(true)
  }

  const handleChangeNotes = (e,index) => {
    let temp = { ...call }
    temp.notes_attributes[index][e.target.name] = e.target.value
    setNotes(temp)


    // const { name, value } = e.target
    // const list = [...notes]
    // notes[index][name] = value

    // setNotes(list)
  }

  const handleRemoveNote = (index) => {
    let temp = { ...call }
    temp.notes_attributes.splice(index, 1)
    setCall(temp)

    // const aux = [...notes]
    // aux.splice(index, 1)

    // setNotes(aux)
  }

  const handleAddNote = () => {
    let temp = { ...call };
    temp.notes_attributes.push(
      {
        description: ""
      }
    );
    setCall(temp);

    // setNotes([...notes, { description: "" }])
  }

  const handleResetNotes = () => {
    let temp = { ...call };
    temp.notes_attributes = [];
    setCall(temp)
    setTypeComment('')
    setShowFormComment(false)
  }

  return (
    <>
      {console.log(call)}
      <CModal size="xl" visible={showModal} onClose={() => handleShowModal(false)}>
        <CModalHeader>
          <CModalTitle>Detalles de Llamada</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CRow className="g-3 mb-3">
              <CCol xs>
                <CFormInput
                  label="Curso de interes"
                  name="course"
                  value={`${client.course.name} - ${client.course.code}`}
                  disabled
                />
              </CCol>
            </CRow>
            <CRow className="g-3 mb-3">
              <CCol xs className="">
                <CFormInput
                  label="Nombres"
                  name="first_name"
                  value={client.first_name}
                  onChange={handleChange}
                />
              </CCol>
              <CCol xs>
                <CFormInput
                  label="Apellidos"
                  name="last_name"
                  value={client.last_name}
                  onChange={handleChange}
                />
              </CCol>
              <CCol xs>
                <CFormInput
                  label="Telefono"
                  name="phone"
                  value={client.phone}
                  onChange={handleChange}
                />
              </CCol>
            </CRow>
            <CRow className="g-3">
              <CCol xs>
                <CFormInput
                  label="Correo"
                  name="email"
                  value={client.email}
                  onChange={handleChange}
                />
              </CCol>
              <CCol xs>
                <CFormInput
                  label="País"
                  name="country"
                  value={client.country}
                  onChange={handleChange}
                />
              </CCol>
              <CCol xs>
                <CFormInput
                  label="Estado de Cliente"
                  value={`${client.client_status.name} - ${client.client_status.slug}`}
                  disabled
                />
              </CCol>
            </CRow>
            <CRow className="g-3">
              <CCol xs>
                <CTooltip placement="top" content="Agregar comentario">
                  <CButton color="success" size="sm" className="my-3">
                    <CIcon
                      icon={cilCommentBubble}
                    />
                  </CButton>
                </CTooltip>

                <CTooltip placement="top" content="Enviar Brochure's">
                  <CButton color="info" size="sm" className="ms-2 my-3" onClick={() => sendBrochure()}>
                    <CIcon
                      icon={cilEnvelopeLetter}
                    />
                  </CButton>
                </CTooltip>

                <CTooltip placement="top" content="Reprogramar llamada">
                  <CButton color="primary" size="sm" className="ms-2 my-3" onClick={() => rescheduleCall()}>
                    <CIcon
                      icon={cilLoopCircular}
                    />
                  </CButton>
                </CTooltip>

                <CTooltip placement="top" content="Marcar como no interesado (NI)">
                  <CButton color="danger" size="sm" className="ms-2 my-3" onClick={() => markNotInterested()}>
                    <CIcon
                      icon={cilSad}
                    />
                  </CButton>
                </CTooltip>

                <CTooltip placement="top" content="Marcar como número equivocado (NE)">
                  <CButton color="danger" size="sm" className="ms-2 my-3" onClick={() => markWrongNumber()}>
                    <CIcon
                      icon={cilFaceDead}
                    />
                  </CButton>
                </CTooltip>

              </CCol>
              <CCol xs>
              </CCol>
              <CCol xs>
                <CTooltip placement="top" content="Marcar como Matriculado">
                  <CButton color="primary" size="sm" className="my-3">
                    <CIcon
                      icon={cilStar}
                    />
                  </CButton>
                </CTooltip>
              </CCol>
            </CRow>
          </CForm>

          {
            showFormComment && typeComment === 'reschedule' &&
            <CForm>
              <CRow>
                <CCol xs>
                  <CFormLabel>Fecha de llamada</CFormLabel>
                  <CDatePicker locale="es-PE" timepicker />
                </CCol>
              </CRow>
            </CForm>
          }

          {
            showFormComment && typeComment === 'brochure' &&
            <CForm>
              <CRow>
                <CCol xs>
                  <CFormLabel>Enviar Brochure's:</CFormLabel>
                  <CTooltip 
                    placement="top" 
                    content="Enviar correo con el brochure (Esta acción solo envia el correo mas no guarda los comentarios)"
                  >
                    <CButton 
                      color="info" 
                      size="sm" 
                      className="ms-4"
                      onClick={() => handleSubmitBrochure()}
                    >
                      <CIcon icon={cilSend} />
                    </CButton>
                  </CTooltip>
                </CCol>
              </CRow>
            </CForm>
          }

          {showFormComment && call.notes_attributes.map((note, index) => {
            return (
              <CForm key={index}>
                <CRow className="mt-3">
                  <CCol md="11">
                    <CFormLabel>Comentario {index + 1}</CFormLabel>
                    <CFormTextarea
                      value={note.description}
                      name="description"
                      onChange={(e) => handleChangeNotes(e, index)}
                    />
                  </CCol>
                  <CCol md="1">
                    {(call.notes_attributes.length - 1 > 0) &&
                      <CButton
                        type="button"
                        color="danger"
                        size="sm"
                        className="mt-5"
                        onClick={() => handleRemoveNote(index)}
                      >
                        Quitar
                      </CButton>
                    }
                  </CCol>
                </CRow>
                {
                  call.notes_attributes.length - 1 === index &&
                  <>
                    <CButton
                      type="button"
                      color="success"
                      size="sm"
                      className="mt-3"
                      onClick={() => handleAddNote()}
                    >
                      Agregar Comentario
                    </CButton>

                    <CButton
                      type="button"
                      color="danger"
                      size="sm"
                      className="mt-3 ms-3"
                      onClick={() => handleResetNotes()}
                    >
                      Cancelar esta accion
                    </CButton>
                  </>
                }
              </CForm>
            )
          })}

        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => handleShowModal(false)}>Cerrar</CButton>
          <CButton color="primary" onClick={() => handleSubmitCallWithNotes()}>Guardar</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}
export default ModalCallDetail