import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import AlertState from './Context/Alert/AlertState'
import Alert from './components/Alert'


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const ForgetPassword = React.lazy(() => import('./views/pages/login/ResetPassword'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))


class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
        <AlertState>
        <Alert />
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/forget-password" name="Login Page" element={<ForgetPassword />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
          </AlertState>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App
