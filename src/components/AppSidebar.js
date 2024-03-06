import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

import "./style.css"

// sidebar nav config
import navigation from '../_nav'

import logo from "src/assets/images/CNLogo2.png"
import logo2 from "src/assets/images/Logo.png"

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <>
      <CSidebar
        className='bgnewdark'
        position="fixed"
        unfoldable={unfoldable}
        visible={sidebarShow}
        onVisibleChange={(visible) => {
          dispatch({ type: 'set', sidebarShow: visible })
        }}
      >
        <CSidebarBrand className="d-flex bgnewdark" to="/" >
          {/* {unfoldable ?
            <img src={logo2} style={{ height: "50px", width: "50px" }} alt="" />
            : */}
            <img src={logo} style={{ height: "112.5px",width:"-webkit-fill-available",objectFit:"contain" }} alt="" />

          {/* } */}
        </CSidebarBrand>
        <CSidebarNav className='bgnewdark'>
          <SimpleBar>
            <AppSidebarNav items={navigation} />
          </SimpleBar>
        </CSidebarNav>
      </CSidebar>
    </>
  )
}

export default React.memo(AppSidebar)
