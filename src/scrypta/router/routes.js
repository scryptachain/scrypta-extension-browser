import PageIndex from './pages/Index'
import PageDashboard from './pages/Dashboard'
import PageExplorer from './pages/Explorer'
import PageManage from './pages/Manage'
import PageCreate from './pages/Create'
import PageImport from './pages/Import'

export default [
  {
    path: '/',
    name: 'index',
    component: PageIndex
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: PageDashboard
  },
  {
    path: '/explorer',
    name: 'explorer',
    component: PageExplorer
  },
  {
    path: '/manage',
    name: 'manage',
    component: PageManage
  },
  {
    path: '/create',
    name: 'create',
    component: PageCreate
  },
  {
    path: '/import',
    name: 'import',
    component: PageImport
  }
]
