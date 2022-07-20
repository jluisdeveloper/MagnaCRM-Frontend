import React from 'react'
import { CFooter } from '@coreui/react-pro'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://agenciamaki.com/" target="_blank" rel="noopener noreferrer">
          Agencia Maki
        </a>
        <span className="ms-1">&copy; 2022.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://agenciamaki.com/" target="_blank" rel="noopener noreferrer">
          Desarrollado por la Agencia Maki
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
