import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CAvatar,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import AlertContext from 'src/Context/Alert/AlertContext'
import BgVideo from '../../../assets/video/Intro.gif'
import facebook from '../../../assets/images/facebook.png'
import google from '../../../assets/images/search.png'
import Logo from "../../../assets/images/Logo.png"
import Blob1 from "../../../assets/images/blob.svg"
import Blob2 from "../../../assets/images/blob2.svg"

import "./style.css"

const Login = () => {

  const AletContext = useContext(AlertContext);
  const { showAlert } = AletContext;

  const navigate = useNavigate()

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);




  const handleLogin = async () => {
    setIsSubmitting(true);

    try {
      // Make the API call to your login endpoint
      const payload = new URLSearchParams();
      payload.append('email', credentials.email);
      payload.append('password', credentials.password);

      const response = await fetch('https://mymbgserver.mbgchat.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: payload,
        redirect: 'follow', // Follow redirects automatically
      });

      if (response.ok) {
        // If the login is successful, get the auth token from the response
        const data = await response.json();
        const authToken = data.token;

        // Save the auth token in session storage
        sessionStorage.setItem('authToken', authToken);

        showAlert('Login Success', 'success');

        setIsSubmitting(false);
        navigate("/dashboard");

        // Redirect to another page or perform other actions as needed
      } else {
        // Handle error cases, e.g., display an error message
        showAlert('Incorrect Credentials', 'danger');
        setIsSubmitting(false);
      }
    } catch (error) {
      showAlert('Error Occurred', 'danger');
      setIsSubmitting(false);
    }

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };


  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center"
      style={{
        background: `url(${BgVideo})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}>
      <CContainer className='heightcontainer'>
        <CRow className="justify-content-center h-100">
          <CCol xl={9} lg={12} md={12} sm={8} className='flexcol'>
            <CCardGroup className='h-100'>
              <CCard
                className="bgclear"
                style={{
                  borderRadius: "25px"
                }}
              >
                <CCardBody className='p-0'>
                  <div className='d-flex h-100 gap-4 align-items-center'
                    style={{ borderRadius: "100px" }} >
                    <div
                      className='position-relative h-100 col-md-5 flex-column justify-content-center align-items-center leftsec'
                    >
                      <div className="bubble b_1">
                        <img src={Blob2} alt="" className='w-100' />
                      </div>
                      <div className="bubble b_2">
                        <img src={Blob1} alt="" className='w-100' />
                      </div>
                      <div className='d-flex flex-column justify-content-center align-items-center sec_2'>
                        <img src={Logo} alt="" />
                        <h2 className='text-white fs-2 fw-bold'>Cosmic Nucleus</h2>
                      </div>
                    </div>
                    <CForm className='p-4 col-md-6 formsec'>
                      <h1 className='clwhite2 texth2'>Login</h1>
                      <p className="text-medium-emphasis clwhite2">Sign In to your account</p>

                      <CInputGroup className="mb-3">
                        <CInputGroupText className='bggray'>
                          <CIcon icon={cilUser} className='clwhite' />
                        </CInputGroupText>
                        <CFormInput
                          name="email"
                          placeholder="Email"
                          autoComplete="Email"
                          value={credentials.email}
                          onChange={handleChange}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText className='bggray'>
                          <CIcon icon={cilLockLocked} className='clwhite' />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          name="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          value={credentials.password}
                          onChange={handleChange}
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol>
                          <CButton color="primary" className="px-4 clblack bggray my-1 bgbuttonblue w-100" onClick={handleLogin} disabled={isSubmitting}>
                            {isSubmitting ? "Logining" : "Login"}
                          </CButton>
                        </CCol>
                      </CRow>
                      <p className="text-medium-emphasis clwhite2 text-center">Or</p>
                      <div className='d-flex flex-row gap-4 justify-content-center align-items-center'>
                        <CAvatar size="md" src={google} style={{ cursor: "pointer" }} />
                        <CAvatar size="md" src={facebook} style={{ cursor: "pointer" }} />

                      </div>
                      {/* <div className='borderdata'>
                      <h2>Continue With Google</h2>
                      <div></div>
                    </div>
                    <div className='borderdata'>
                      <h2>Continue With Facebook</h2>
                      <div></div>
                    </div> */}
                    </CForm>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
