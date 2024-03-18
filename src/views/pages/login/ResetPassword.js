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
import { cilUser } from '@coreui/icons'
import AlertContext from 'src/Context/Alert/AlertContext'
import BgVideo from '../../../assets/images/BlobGif.gif'

import logo from "../../../assets/images/Logo.png"

import "./style.css"

const ForgetPassword = () => {

  const AletContext = useContext(AlertContext);
  const { showAlert } = AletContext;

  const navigate = useNavigate()

  const [credentials, setCredentials] = useState({
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);




  const handleLogin = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('https://mymbgserver.mbgchat.com/requestpasswordreset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_email:credentials.email
        })
      });

      if (response.ok) {
        // If the login is successful, get the auth token from the response
        const data = await response.json();

        showAlert('Temp password send to your mail', 'success');

        setIsSubmitting(false);
        navigate("/login");

        // Redirect to another page or perform other actions as needed
      } else {
        // Handle error cases, e.g., display an error message
        showAlert('Email not Exist', 'danger');
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
      <CContainer className='heightcontainer2'>
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
                      <h1 className='LoginHead text-center mb-4'>Enter Your registered Email</h1>
                      <p className="LoginPrim">We will send a temporary password to your Email</p>

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
                      <CRow>
                        <CCol>
                          <CButton color="primary" className="px-4 clblack bgpurple textwhite btnnew my-1 w-100 bordercol" onClick={handleLogin} disabled={isSubmitting}>
                            {isSubmitting ? "Sending mail..." : "Send Mail"}
                          </CButton>
                        </CCol>
                      </CRow>
                      {/* <p className="LoginPrim text-center mt-4 mb-2">Or</p>
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

export default ForgetPassword
