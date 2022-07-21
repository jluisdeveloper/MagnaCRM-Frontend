import React from 'react'

// examples
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Sellers = React.lazy(() => import('./views/sellers/Index'))
const NewSeller = React.lazy(() => import('./views/sellers/New'))
const ShowSeller = React.lazy(() => import('./views/sellers/Show'))
const EditSeller = React.lazy(() => import('./views/sellers/Edit'))


const routes = [
  { path: '/', exact: true, name: 'Dashboard', element: Dashboard },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/ejecutivos', exact: true, name: 'Ejecutivos de Venta', element: Sellers },
  { path: '/ejecutivos/nuevo', exact: true, name: 'Nuevo Ejecutivo', element: NewSeller },
  { path: '/ejecutivos/:id_SE/detalle', exact: true, name: 'Detalle de Ejecutivo', element: ShowSeller },
  { path: '/ejecutivos/:id_SE/editar', exact: true, name: 'Editar Ejecutivo', element: EditSeller },  
]

export default routes
