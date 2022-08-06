import React, { useState, useEffect, useCallback } from "react"
import { useDropzone } from 'react-dropzone'
import {
  CRow,
  CTooltip,
  CButton,
} from '@coreui/react-pro'

import CSV from '../assets/images/icons/csv.png'
import DOC from '../assets/images/icons/doc.png'
import XLS from '../assets/images/icons/xls.png'
import PPT from '../assets/images/icons/ppt.png'
import ZIP from '../assets/images/icons/zip.png'
import PDF from '../assets/images/icons/pdf.png'
import TXT from '../assets/images/icons/txt.png'
import IMG from '../assets/images/icons/img.png'
import DEF from '../assets/images/icons/def.png'

const AppDropzone = (props) => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    setFiles(
      acceptedFiles.map((item) => ({
        name: item.name,
        type: item.type,
      }))
    )
    props.setRealFiles(acceptedFiles)
  }, [setFiles])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: props.acceptParams      // bug en chromiun linux solo en linux en demas SO si funciona en Linux usar Brave 
  });

  const setIcon = (_file) => {
    if (_file.type === 'text/csv') {
      return CSV
    } else if (_file.type === 'application/vnd.ms-excel' || _file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      return XLS
    } else if (_file.type === 'application/vnd.ms-powerpoint' || _file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
      return PPT
    } else if (_file.type === 'application/pdf') {
      return PDF
    } else if (_file.type === 'application/zip') {
      return ZIP
    } else if (_file.type === 'text/plain') {
      return TXT
    } else if (_file.type === 'application/msword' || _file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      return DOC
    } else if (_file.type.includes('image')) {
      return IMG
    } else {
      return DEF
    }
  }

  const removeItem = (_index) => {
    const _files = [...files]
    const _realFiles = [...props.realFiles]
    _files.splice(_index, 1)
    _realFiles.splice(_index, 1)
    setFiles(_files)
    props.setRealFiles(_realFiles)
  }

  return (
    <div className="custom_card_dropzone">
      { console.log(files) }
      {/* { console.log(props.realFiles.length) } */}
      <div
        {...getRootProps({
          className: `dropzone
      ${isDragAccept && 'dropzoneAccept'}
      ${isDragReject && 'dropzoneReject'}`,
        })}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Suelta los archivos aquí ...</p>
        ) : (
          <p>Arrastre y suelte los archivos aquí, o haga clic para seleccionar archivos</p>
        )}
      </div>
      <CRow>
        {props.realFiles && props.realFiles.length && files.length ? files.map((file, index) =>
          <div className="custom_preview_dropzone" key={index}>
            <CTooltip content={file.name}>              
              <img
                width={70}
                src={setIcon(file)}
              />
            </CTooltip>
            <CTooltip content="Eliminar Archivo">
              <CButton size='sm' color='danger' className="align-top mt-2" onClick={() => removeItem(index)}>
                Eliminar
              </CButton>
            </CTooltip>
          </div>
        ) : null}
      </CRow>
    </div>
  )

}

export default AppDropzone