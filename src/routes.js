import React from 'react'

// examples
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Sellers = React.lazy(() => import('./views/sellers/Index'))
const NewSeller = React.lazy(() => import('./views/sellers/New'))
const ShowSeller = React.lazy(() => import('./views/sellers/Show'))
const EditSeller = React.lazy(() => import('./views/sellers/Edit'))

const Courses = React.lazy(() => import('./views/courses/Index'))
const NewCourse = React.lazy(() => import('./views/courses/New'))

const LeadsImport = React.lazy(() => import('./views/leads/Import'))
const AssignLeads = React.lazy(() => import('./views/leads/ToAssign'))
const MyLeads = React.lazy(() => import('./views/leads/MyLeads'))
const LeadFollow = React.lazy(() => import('./views/leads/LeadFollow'))

const routes = [
  { path: '/', exact: true, name: 'Dashboard', element: Dashboard },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/cursos', exact: true, name: 'Cursos', element: Courses },
  { path: '/cursos/nuevo', name: 'Nuevo curso', element: NewCourse },
  { path: '/ejecutivos', exact: true, name: 'Ejecutivos de Venta', element: Sellers },
  { path: '/ejecutivos/nuevo', exact: true, name: 'Nuevo Ejecutivo', element: NewSeller },
  { path: '/ejecutivos/:id_SE/detalle', exact: true, name: 'Detalle de Ejecutivo', element: ShowSeller },
  { path: '/ejecutivos/:id_SE/editar', exact: true, name: 'Editar Ejecutivo', element: EditSeller },
  { path: '/leads', exact: true, name: 'Mis Leads', element: MyLeads },
  { path: '/leads/importar', exact: true, name: 'Importar Lead', element: LeadsImport },
  { path: '/leads/asignar', exact: true, name: 'Asignar Lead', element: AssignLeads },  
  { path: '/leads/:client_id/seguimiento', exact: true, name: 'Seguimiento', element: LeadFollow },
]

export default routes
