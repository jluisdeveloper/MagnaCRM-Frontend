import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { CSpinner } from '@coreui/react-pro'
import './scss/style.scss'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const Login = React.lazy(() => import('./views/Login/Login'))

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={<CSpinner color="primary" />}>
          <Routes>
            {localStorage.getItem("token") === null ?
              <Route path="*" element={<Login />} /> :
              <Route path="*" name="Dashboard" element={<DefaultLayout />} />
            }
          </Routes>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App
