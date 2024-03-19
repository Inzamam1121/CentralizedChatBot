import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CSidebar, CSidebarBrand, CSidebarNav } from '@coreui/react'
import { AppSidebarNav } from './AppSidebarNav'
import SimpleBar from 'simplebar-react'
import navigation from '../_nav'
import logo2 from "src/assets/images/logo1.png"
import 'simplebar/dist/simplebar.min.css'
import "./style.css"

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <>
      <CSidebar
        className='bgwhite borderright'
        position="fixed"
        unfoldable={unfoldable}
        visible={sidebarShow}
        onVisibleChange={(visible) => {
          dispatch({ type: 'set', sidebarShow: visible })
        }}
      >
        <CSidebarBrand className="d-flex bgwhite" to="/" >
            {/* <img src={logo2} style={{ height: "112.5px",width:"-webkit-fill-available",objectFit:"contain" }} alt="" /> */}
            <h1 style={{color:"black",fontSize:"30px",fontFamily:"fantasy"}} className='mb-0'>Cosmic Nucleus</h1>
        </CSidebarBrand>
        <CSidebarNav className='bgwhite'>
          <SimpleBar>
            <AppSidebarNav items={navigation} />
          </SimpleBar>
        </CSidebarNav>
      </CSidebar>
    </>
  )
}

export default React.memo(AppSidebar)
