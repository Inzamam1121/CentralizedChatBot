import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// import "./style.css"

// sidebar nav config
import navigation from '../_nav'

import logo from "src/assets/images/CNLOGO.png"
import logo2 from "src/assets/images/Logo.png"

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <>
      <CSidebar
        className='bggray'
        position="fixed"
        unfoldable={unfoldable}
        visible={sidebarShow}
        onVisibleChange={(visible) => {
          dispatch({ type: 'set', sidebarShow: visible })
        }}
      >
        <CSidebarBrand className="d-none d-md-flex bgdark" to="/" >
          {unfoldable ?
            <img src={logo2} style={{ height: "50px", width: "50px" }} alt="" />
            :
            <img src={logo} style={{ height: "100px" }} alt="" />

          }
        </CSidebarBrand>
        <CSidebarNav className='bgdark'>
          <SimpleBar>
            <AppSidebarNav items={navigation} />
          </SimpleBar>
        </CSidebarNav>
        {/* <CSidebarToggler
          className="d-none d-lg-flex bgwhite pos"
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        /> */}
      </CSidebar>
      
      {/* <div className={`${unfoldable?"bgclose":"bgsection"}`}
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}>
        <div className={`${unfoldable?"closeImage":"imagesection"}`}>
        
        </div>
      </div> */}
    </>
  )
}

export default React.memo(AppSidebar)
