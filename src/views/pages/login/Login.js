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
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={4} sm={8}>
            <CCardGroup>
              <CCard className="p-4 bgclear">
                <CCardBody>
                  <CForm className='text-center'>
                    <h1 className='clwhite'>Login</h1>
                    <p className="text-medium-emphasis clwhite">Sign In to your account</p>
                    <div className='borderdata'>
                      <CAvatar size="sm" src={google} />
                      <h2>Continue With Google</h2>
                      <div></div>
                    </div>
                    <div className='borderdata'>
                      <CAvatar size="sm" src={facebook} />
                      <h2>Continue With Facebook</h2>
                      <div></div>
                    </div>
                    <p className="text-medium-emphasis clwhite">Or</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText className='bgblue'>
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
                      <CInputGroupText className='bgblue'>
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
                        <CButton color="primary" className="px-4 bgblue my-4 bgbuttonblue w-100" onClick={handleLogin} disabled={isSubmitting}>
                          {isSubmitting ? "Logining" : "Login"}
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
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
