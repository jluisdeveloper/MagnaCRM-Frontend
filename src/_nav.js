import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilSpeedometer, cilListHighPriority, cilGroup, cilContact, cilMonitor } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react-pro'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info-gradient',
      text: 'NEW',
    }
  },
  {
    component: CNavTitle,
    name: 'Area de Trabajo',
  },
  {
    component: CNavItem,
    name: 'Mis Leads asignados',
    to: '/mis-leads',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />
  },
  {
    component: CNavTitle,
    name: 'Gestionar Ejecutivos',
  },
  {
    component: CNavGroup,
    name: 'Leads',
    to: '/leads',
    icon: <CIcon icon={cilListHighPriority} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Importar',
        to: '/leads/importar',
      },
      {
        component: CNavItem,
        name: 'Asignar a Ejecutivos',
        to: '/leads/asignar',
      },
      {
        component: CNavItem,
        name: 'Reciclar',
        to: '/leads/reciclar',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Ejecutivos de ventas',
    to: '/ejecutivos',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />
  },
  {
    component: CNavTitle,
    name: 'Gestionar Cursos',
  },
  {
    component: CNavItem,
    name: 'Cursos Disponibles',
    to: '/cursos',
    icon: <CIcon icon={cilMonitor} customClassName="nav-icon" />
  },
]

export default _nav
