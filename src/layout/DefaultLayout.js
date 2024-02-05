import React, { useEffect, useState } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useNavigate } from 'react-router-dom'

const DefaultLayout = () => {
  const navigate = useNavigate()
  const [logincheck, setlogincheck] = useState(false)
  useEffect(() => {
    if (!sessionStorage.getItem("authToken")) {
      navigate('/login')
      setlogincheck(false)
    }
    else{
      setlogincheck(true);
    }

  }, [])

  return (
    <>
      {logincheck && <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3 bgblue py-5">
            <AppContent />
          </div>
          {/* <AppFooter /> */}
        </div>
      </div>}
    </>
  )
}

export default DefaultLayout
