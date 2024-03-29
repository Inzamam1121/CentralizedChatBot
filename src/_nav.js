import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSettings,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'All Chat Bots',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Add New User',
    to: '/user/Adduser',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Settings',
    to: '/user/setting',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },

]

export default _nav
