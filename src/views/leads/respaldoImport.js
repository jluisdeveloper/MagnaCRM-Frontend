import React, { useState, useEffect } from 'react'
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
import CIcon from '@coreui/icons-react'
import { useCSVReader } from 'react-papaparse'

import useCrud from '../../hooks/useCrud'

const styles = {
  csvReader: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  },
  browseFile: {
    width: '20%',
  },
  acceptedFile: {
    border: '1px solid #ccc',
    height: 45,
    lineHeight: 2.5,
    paddingLeft: 10,
    width: '80%',
  },
  remove: {
    borderRadius: 0,
    padding: '0 20px',
  },
  progressBarBackgroundColor: {
    backgroundColor: 'red',
  },
};

function lettersOnly(str) {
  return str.replace(/[^a-z A-Z]/g, "")
}

const Import = () => {
  const [fullData, setFullData] = useState(null)
  const [showData, setShowData] = useState(false)
  const [permitEdit, setPermitEdit] = useState(true)
  const [dataParsed, setDataParsed] = useState([])
  const { CSVReader } = useCSVReader();

  const { insertModel } = useCrud('/api/v1/admin/clients')

  const insertInDataBase = async (data) => {
    // insertModel(data[0], '/api/v1/admin/clients')
    // data.forEach(element => (
    //   setTimeout(() => {
    //     // insertModel(element, '/api/v1/admin/clients')
    //     console.log(element)
    //   }, 1000)
    // ))

    let dataAux = fullData
    setShowData(false)

    await data.forEach((item, i) => {
      setTimeout(() => {
        // console.log(i)
        setFullData([
          // ...fullData.slice(0, i),
          ...fullData.slice(i + 1, fullData.length)
        ]);
      }, i * 300);
    });

    setShowData(true)
  }

  const deleteItem = (index) => {
    setFullData([
      ...fullData.slice(0, index),
      ...fullData.slice(index + 1, fullData.length)
    ]);
  }

  const optimizeData = () => {
    setShowData(true)
    let newData = fullData
    let newDataParsed = []
    if (permitEdit) {
      newData.map((item, index) => {
        if (item !== null) {
          item[12] = lettersOnly(item[12])  // FULL NAME
          item[5] = item[5].slice(3, item[5].length)  // PAIS
          item[13] = item[13].slice(2, item[13].length) // PHONE
        }
        newDataParsed.push({
          first_name: item[12],
          last_name: "",
          phone: item[13],
          email: item[14],
          country: item[5],
          course_name: item[9],
        })
      })
      setPermitEdit(false)
      setFullData(newData)
      setDataParsed(newDataParsed)
    }
    // console.log(fullData)
  }

  const parseFiles = (files) => {
    const filesData = []
    Promise.all([...files].map((file) =>
      new Promise((resolve, reject) =>
        parse(file, {
          header: true,
          complete: resolve,  // Resolve each promise
          error: reject,
        }),
      )),
    ).then((results) => {
      results.forEach((result, index) => {
        filesData.push(result)
      })
      doSomething(filesData) // now since .then() excutes after all promises are resolved, filesData contains all the parsed files.
    }).catch((err) => console.log('Something went wrong:', err))
  }

  useEffect(() => {
  }, [fullData])

  return (
    // console.log(dataParsed),
    <>
      <CSVReader
        onUploadAccepted={(results) => {
          // console.log(results.data.slice(1, results.data.length));
          setFullData(results.data.slice(1, results.data.length - 1));
        }}
      >
        {({
          getRootProps,
          acceptedFile,
          ProgressBar,
          getRemoveFileProps,
        }) => (
          <>
            <div>
              <button type='button' {...getRootProps()} >
                Seleccionar Lead
              </button>
              <div>
                {acceptedFile && acceptedFile.name}
              </div>
              <button {...getRemoveFileProps()} >
                Eliminar
              </button>
            </div>
            <ProgressBar />
          </>
        )}
      </CSVReader>

      <CCard>
        <CCardHeader className="py-4">
          <strong>Ejecutivos de Ventas,</strong> <small>listado completo</small>
          <CTooltip content="Insertar leads al sistema">
            <CButton color="warning" size='sm' className="float-end mx-2" onClick={() => insertInDataBase(dataParsed)}>
              <CIcon icon={cilPlus} /> {' '} Insertar
            </CButton>
          </CTooltip>
          <CTooltip content="Previsualizar Leads">
            <CButton color="success" size='sm' className="float-end mx-2" onClick={() => optimizeData()}>
              <CIcon icon={cilPlus} /> {' '} Previsualizar Leads
            </CButton>
          </CTooltip>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Nombres Completos</CTableHeaderCell>
                <CTableHeaderCell scope="col">Telefono</CTableHeaderCell>
                <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                <CTableHeaderCell scope="col">Pais</CTableHeaderCell>
                <CTableHeaderCell scope="col">Curso</CTableHeaderCell>
                <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {
                showData && fullData && fullData.length > 0 &&
                fullData.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{item[12]}</CTableDataCell>
                    <CTableDataCell>{item[13]}</CTableDataCell>
                    <CTableDataCell>{item[14]}</CTableDataCell>
                    <CTableDataCell>{item[5]}</CTableDataCell>
                    <CTableDataCell>{item[9]}</CTableDataCell>
                    <CTableDataCell>
                      <CTooltip content="Editar">
                        <CButton color="danger" size="sm" onClick={() => deleteItem(index)}>

                          eliminar

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


    </>
  );
}

export default Import;