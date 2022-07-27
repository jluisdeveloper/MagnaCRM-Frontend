import React, { useState, useEffect, Suspense } from "react"
import {
  CCard,
  CRow,
  CCol,
  CButton,
  CSpinner,
  CCardBody,
  CCardHeader
} from '@coreui/react-pro'
import Papa from 'papaparse'
import ImportTable from './extra/ImportTable'
import AppDropzone from "../../components/AppDropzone"
import { uniqBy } from '../../helpers/auxiliarFunctions'
import useCrud from '../../hooks/useCrud'

const acceptParams = {
  'text/csv': ['.csv']
}

const dataTable = {
  _header: [
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
      label: "id curso",
      key: "course_id",
    }
  ],
  _buttons: [
    {
      name: "Editar",
      function: ""
    },
    {
      name: "Eliminar",
      function: ""
    },
    {
      name: "Ver",
      function: ""
    }
  ],
  _data: []
}


const Import = () => {
  const [realFiles, setRealFiles] = useState(null)
  const [parsedCsvData, setParsedCsvData] = useState([])
  const [showTable, setShowTable] = useState(false)
  const [coursesAvailable, setCoursesAvailable] = useState([])

  const { getModel } = useCrud("/api/v1/courses")
  const { insertModel } = useCrud("/api/v1/clients")

  const parseFiles = (_files) => {
    const filesData = []
    let finalData = []
    Promise.all([..._files].map((file) =>
      new Promise((resolve, reject) =>
        Papa.parse(file, {
          header: true,
          complete: resolve,  // Resolve each promise
          error: reject,
        }),
      )),
    ).then((results) => {
      results.forEach((result) => {
        filesData.push(result.data.slice(1, result.data.length - 1))
      })
      let auxData = uniqBy(filesData, JSON.stringify)
      auxData.forEach((data_x) => {
        data_x.forEach((data_y) => {
          finalData.push(data_y)
        })
      })
      setParsedCsvData(finalData)
      dataTable._data = finalData
    }).catch((err) => console.log('Something went wrong:', err))
  }

  const processData = () => {
    parseFiles(realFiles)
    setShowTable(true)
  }

  useEffect(() => {
    getModel(setCoursesAvailable)
  }, [])
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="py-4">
            <strong>Importar Leads,</strong> <small>ingrese solo archivos</small> <strong>".csv"</strong>
          </CCardHeader>
          <CCardBody>
            <AppDropzone
              setRealFiles={setRealFiles}
              realFiles={realFiles}
              acceptParams={acceptParams}
            />

            {realFiles && realFiles.length && <CButton size='sm' color='primary' className='float-end' onClick={() => processData()}>
              Procesar Datos
            </CButton>}
            <Suspense fallback={<CSpinner color="primary" variant="grow" />}>
              {
                showTable && dataTable._data.length > 0 && coursesAvailable.length > 0 &&
                <ImportTable
                  data={dataTable}
                  coursesAvailable={coursesAvailable}
                  insertModel={insertModel}
                />
              }
            </Suspense>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow >
  )

}

export default Import