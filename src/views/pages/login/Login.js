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
import BgVideo from '../../../assets/images/BlobGif.gif'
import facebook from '../../../assets/images/facebook.png'
import google from '../../../assets/images/search.png'

import logo from "../../../assets/images/Logo.png"

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
    <div className="bg-white min-vh-100 d-flex flex-row align-items-center position-relative overflow-hidden"
      style={{
        // backgroundColor: "#ffffff"
        background: `url(${BgVideo})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "cover",
        backgroundAttachment: "fixed"
      }}>
      <CContainer className='heightcontainer'>
        <CRow className="justify-content-center h-100">
          <CCol xl={6} lg={8} md={8} sm={8} className='flexcol'>
            <CCardGroup className='h-100'>
              <CCard >
                <CCardBody className='p-0'>
                  <div className=' h-100  align-items-center LoginBody'>
                    <CForm className='p-2'>
                      <div className="LogoImage">
                        <img src={logo} alt="" style={{width:"100%",height:"100%"}} />
                      </div>
                      <h1 className='LoginHead text-center mb-4'>Login Cosmic Superstar!</h1>
                      {/* <p className="LoginPrim">Sign In to your account</p> */}

                      <CInputGroup className="mb-3">
                        <CInputGroupText className='bgpurple'>
                          <CIcon icon={cilUser} className='textwhite' />
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
                        <CInputGroupText className='bgpurple'>
                          <CIcon icon={cilLockLocked} className='textwhite' />
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
                          <CButton color="primary" className="px-4 clblack bgpurple textwhite btnnew my-1 w-100 bordercol" onClick={handleLogin} disabled={isSubmitting}>
                            {isSubmitting ? "Logining" : "Login"}
                          </CButton>
                        </CCol>
                      </CRow>
                      <p className="LoginPrim text-center mt-4 mb-2">Or</p>
                      <div className='Groupsocial'>
                        <div className='SocialTab'>
                          <img src={google} alt="" className='IconImage' />
                          <h3>Sign-In with Google</h3>
                          <div></div>
                        </div>
                        <div className='SocialTab'>
                          <img src={facebook} alt="" className='IconImage' />
                          <h3>Sign-In with Facebook</h3>
                          <div></div>
                        </div>
                      </div>
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
