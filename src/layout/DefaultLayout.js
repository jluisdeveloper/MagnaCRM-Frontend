import React from 'react'
import { AppAside, AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { ToastContainer } from 'react-toastify'

const DefaultLayout = () => {
  return (
    <>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light dark:bg-transparent">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
      <AppAside />
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default DefaultLayout
