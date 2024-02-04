import {
  CProgress,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CAvatar
} from '@coreui/react'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AlertContext from 'src/Context/Alert/AlertContext';
// import Avatar from 'src/assets/images/avatars/profile.jpeg';
import "./style.css"

const AllBots = () => {
  const AletContext = useContext(AlertContext);
  const { showAlert } = AletContext;

  const navigate = useNavigate()

  const [Users, setUsers] = useState([])

  const FetchUser = async () => {
    try {
      const response = await fetch('https://mymbgserver.mbgchat.com/getchatbots', {
        method: "POST",
        headers: {
          'AdminODSToken': `${sessionStorage.getItem('AdminODSToken')}`,
        }
      });

      const user = await response.json();
      setUsers(user);
    } catch (error) {
      showAlert(error, 'danger');
    }
  };


  useEffect(() => {
    FetchUser()
  }, [])


  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader className='bggray clwhite'>All ChatBots Sites</CCardHeader>
          <CCardBody className='bggray'>
            <div className="mainBody">
              {Users.length > 0 && Users.map((item, index) => (
                <div className="block">
                  <div className='main'>
                    <CAvatar size="md" src={`${item.image ? `${item?.image}` : 'https://www.mybenefitsguardian.com/lib_xxgOhURDPpOpyvNu/qcgbv5zf7yhjm0oe.png?w=216'}`} className='imag' />
                    <h3 className='clgray'>{item?.Name}</h3>
                  </div>
                  <div className="des">
                    <p className='clgray'>{item?.Description}</p>
                  </div>
                  <div className="button">
                    <CButton color="mx-2 bgbutton" style={{ backgroundColor: "#4e5253", borderColor: "#4e5253" }}>
                      <a href={item?.Website} target='_blank' style={{ color: "white", textDecoration: "none", borderColor: "#bf1b2c" }}>
                        Visit Website
                      </a>
                    </CButton>
                    <CButton color="mx-2 bgbutton" style={{ backgroundColor: "#4e5253", color: "white" }}
                      onClick={() => {
                        navigate("/Bots/AddFile", { state: item });
                      }}>
                      Upload File
                    </CButton>
                  </div>
                </div>

              ))}
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AllBots
