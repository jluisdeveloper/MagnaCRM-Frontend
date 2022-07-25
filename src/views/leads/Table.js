import React, { useState, useEffect } from 'react'
import axios from 'axios'

import {
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CSpinner,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
} from '@coreui/react-pro'
import { CSVLink } from "react-csv"
import { cilCloudDownload, cilSave } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { capitalize, lettersOnly, regionNames } from '../../helpers/auxiliarFunctions'
import { timeOutWaiting } from '../../helpers/timeOutCallback'

const Table = (props) => {
  // destructuring props
  const { data, coursesAvailable, insertModel } = props

  const [isLoading, setIsLoading] = useState(true)
  const [finalData, setFinalData] = useState([])
  const [selected, setSelected] = useState("")
  const [validated, setValidated] = useState(false)

  const authAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': localStorage.getItem('token'),
      'timeout': 10
    }
  })

  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const handleSubmit = async (event) => {
    checkValidation(event)
    if (validated && selected !== "") {
      let i = 0
      while (i < finalData.length) {
        // setTimeout(async() => {
        await timeOutWaiting();
        const resp = await authAxios.post("/api/v1/clients", finalData[i])
        if (resp && resp.data.status === "ok") {
          i++
          setFinalData([
            ...finalData.slice(i + 1, finalData.length)
          ]);
        }
        // }, i * 200);
      }


      // finalData.forEach((item, i) => {
      //   setTimeout(() => {
      //     const resp = await authAxios.post(_endpoint, data)
      //     // insertModel(item)
      //     setFinalData([
      //       ...finalData.slice(i + 1, finalData.length)
      //     ]);
      //   }, i * 250);
      // });
    }
  }

  const getCountryName = (_client) => {
    if (_client.country === undefined) {
      return regionNames.of("PE")
    } else if (_client.country.length > 2) {
      return _client.country
    } else {
      return regionNames.of(_client.country)
    }
  }

  const getPhoneNumber = (_client) => {
    if (_client.phone_number === undefined) {
      return "Sin definir"
    } else {
      return _client.phone_number.slice(2, _client.phone_number.length)
    }
  }

  const getFullName = (_client) => {
    let aux = lettersOnly(_client.full_name).split(' ')
    const res = {
      first_name: "",
      last_name: ""
    }
    let first_name = ""
    let last_name = ""
    let i = 0
    if (aux.length > 1) {
      while (i < aux.length) {
        if (i < Math.trunc(aux.length / 2)) {
          first_name = first_name + capitalize(aux[i])
          first_name = first_name + " "
        } else {
          if (aux[i] !== undefined) {
            last_name = last_name + capitalize(aux[i])
            last_name = last_name + " "
          }
        }
        i++
      }
    } else {
      first_name = aux[0]
    }
    res.first_name = first_name
    res.last_name = last_name

    return res
  }

  const sanitizeData = () => {
    const auxData = []
    props.data._data.map(client => {
      auxData.push({
        first_name: getFullName(client).first_name,
        last_name: getFullName(client).last_name,
        phone: getPhoneNumber(client),
        country: getCountryName(client),
        email: client.email,
        course_name: "Sin escoger un curso",
        course_id: selected.id,
      })
    })
    setFinalData(auxData)
  }

  const changeStatus = () => {
    setTimeout(() => {
      setIsLoading(false)
    }, 200)
  }

  const handleChange = event => {
    setSelected(event.target.value)
    if (event.target.value === "") { setValidated(false) }
    // console.log(event.target.value)
    const auxData = finalData
    auxData.map(client => {
      client.course_id = event.target.value
      client.course_name = event.target.options[event.target.selectedIndex].text === "Seleccione una opcion" ||
        event.target.options[event.target.selectedIndex].text === "" ? "Sin escoger un curso" :
        event.target.options[event.target.selectedIndex].text
    })
    setFinalData(auxData)
  }

  

  const checkValidation = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    // if (selected === "") {
    //   setValidated(false)
    // }else {
    //   setValidated(true)
    // }
    setValidated(true)
  }


  useEffect(() => {
    changeStatus()
    sanitizeData()
  }, [])
  return (
    <>
      <CRow>
        <CCol xs>
          <CSVLink data={finalData} headers={data._header} className="btn btn-info btn-sm">
            Descargar archivo procesado <CIcon icon={cilCloudDownload} className="ms-1" />
          </CSVLink>

          <CButton size='sm' color='success' className="ms-3" onClick={(e) => handleSubmit(e)}>
            Insertar los datos procesados <CIcon icon={cilSave} className="ms-1" />
          </CButton>
        </CCol>
        <CCol xs>

          <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <CFormSelect size="sm"
              className="mb-3"
              aria-describedby="validationCustom04Feedback"
              feedbackInvalid="Debes escoger un curso o en su defecto escoger la opcion Sin Asignar."
              id="validationCustom04"
              name="course_id"
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una opcion</option>
              {coursesAvailable.map((course, index) => (
                <option key={index} value={course.id}>{course.name}</option>
              ))}

            </CFormSelect>
          </CForm>
        </CCol>
      </CRow>

      {
        isLoading ? <CSpinner color="primary" variant="grow" /> :
          <CTable className="mt-4">
            <CTableHead>
              <CTableRow>
                {
                  data._header.map((header, index) => (
                    index < data._header.length - 1 && <CTableHeaderCell key={index} scope="col">{header.label}</CTableHeaderCell>
                  ))
                }
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {
                finalData.length && finalData.map((client, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{client.first_name}</CTableDataCell>
                    <CTableDataCell>{client.last_name}</CTableDataCell>
                    <CTableDataCell>{client.email}</CTableDataCell>
                    <CTableDataCell>{client.phone}</CTableDataCell>
                    <CTableDataCell>{client.country}</CTableDataCell>
                    <CTableDataCell>{client.course_name}</CTableDataCell>
                  </CTableRow>
                ))
              }
            </CTableBody>
          </CTable>
      }
    </>
  )
}

export default Table