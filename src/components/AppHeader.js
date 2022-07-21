import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CButtonGroup,
  CFormCheck,
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilMenu, cilMoon, cilSun } from '@coreui/icons'

import { AppBreadcrumb } from './index'

import {
  AppHeaderDropdown,
  AppHeaderDropdownNotif,
  AppHeaderDropdownTasks,
} from './header/index'

import { logo } from 'src/assets/brand/logo'

const AppHeader = () => {
  const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('magna_crm_theme'))

  const currentUser = JSON.parse(localStorage.getItem('user'))

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const asideShow = useSelector((state) => state.asideShow)

  const set_page_mode = (_theme) => {
    if (_theme === 'dark') {
      localStorage.removeItem('magna_crm_theme')
      localStorage.setItem('magna_crm_theme', 'dark')
      setCurrentTheme('dark')
    }else {
      localStorage.removeItem('magna_crm_theme')
      localStorage.setItem('magna_crm_theme', 'light')
      setCurrentTheme('light')
    }
  }

  const set_color_theme = () => {
    if (currentTheme === 'dark') {
      document.body.classList.add('dark-theme')
      if ( document.getElementById('sidebar-custom') !== null ) {
        document.getElementById('sidebar-custom').classList.remove('sidebar-dark')
        document.getElementById('sidebar-custom').classList.remove('bg-dark-gradient')
      }
    }else {
      document.body.classList.remove('dark-theme')
      if ( document.getElementById('sidebar-custom') !== null ) {
        document.getElementById('sidebar-custom').classList.add('sidebar-dark')
        document.getElementById('sidebar-custom').classList.add('bg-dark-gradient')
      }
    }
  }

  useEffect(() => {
    set_color_theme()
  }, [currentTheme])

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              Magna CRM
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-auto me-4">
          <CButtonGroup aria-label="Theme switch">
            <CFormCheck
              type="radio"
              button={{ color: 'primary' }}
              name="theme-switch"
              id="btn-light-theme"
              autoComplete="off"
              label={<CIcon icon={cilSun} />}
              checked={currentTheme === 'light'}
              onClick={() => {set_page_mode('light')}}
              onChange={() => dispatch({ type: 'set', theme: 'light' })}
            />
            <CFormCheck
              type="radio"
              button={{ color: 'primary' }}
              name="theme-switch"
              id="btn-dark-theme"
              autoComplete="off"
              label={<CIcon icon={cilMoon} />}
              checked={currentTheme === 'dark'}
              onClick={() => {set_page_mode('dark')}}
              onChange={() => dispatch({ type: 'set', theme: 'dark' })}
            />
          </CButtonGroup>
        </CHeaderNav>
        <CHeaderNav>
          <AppHeaderDropdownNotif />
          <AppHeaderDropdownTasks/>
        </CHeaderNav>
        <CHeaderNav>
          <small>
            {`Bienvenido(a) ${currentUser.first_name}`}
          </small>
        </CHeaderNav>
        <CHeaderNav className="ms-3 me-4">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
