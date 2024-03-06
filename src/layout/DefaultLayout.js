import React, { useEffect, useState } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import "../views/Dashboard/style.css"

const DefaultLayout = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const navigate = useNavigate()
  const [logincheck, setlogincheck] = useState(false)
  useEffect(() => {
    if (!sessionStorage.getItem("authToken")) {
      navigate('/login')
      setlogincheck(false)
    }
    else {
      setlogincheck(true);
    }

  }, [])

  return (
    <>
      {logincheck && <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">

          <AppHeader />
          <div className="body flex-grow-1 px-3 bgnewdark py-5 relative">
            <div className={`${unfoldable ? "bgclose" : "bgsection"}`}
              onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}>
              <div className={`${unfoldable ? "closeImage" : "imagesection"}`}>

              </div>
            </div>
            <AppContent />
          </div>
          {/* <AppFooter /> */}
        </div>
      </div>}
    </>
  )
}

export default DefaultLayout
