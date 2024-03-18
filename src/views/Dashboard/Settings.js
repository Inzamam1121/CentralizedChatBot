import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
} from '@coreui/react';
import React, { useState, useContext } from 'react';
import AlertContext from 'src/Context/Alert/AlertContext';

const Settings = () => {
    const alertContext = useContext(AlertContext);
    const { showAlert } = alertContext;

    const [formData, setFormData] = useState({
        password: '',
        email:'',
        confirmpassword: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleFormSubmit = async (e) => {
        setIsSubmitting(true);
        e.preventDefault();

        const {email, password } = formData;

        try {
            const response = await fetch(`https://mymbgserver.mbgchat.com/updatepassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: sessionStorage.getItem('authToken'),
                    password,
                    email
                })
            });

            if (response.ok) {
                const data = await response.json();
                showAlert(data.message, 'success');
            } else {
                showAlert('Failed to Add User', 'danger');
            }
        } catch (error) {
            showAlert('Failed to Add User', 'danger');
        } finally {
            setIsSubmitting(false);
            setFormData({
                email: '',
                password: ''
            });
        }
    };
    return (
        <CCol xs={12}>
            <CCard className="mb-4 border-0 bgpurplegradient p-1">
                <CCardHeader className='bgpurplegradient textwhite'>
                    <strong>Change Password</strong>
                </CCardHeader>
                <CCardBody className='bgpurplegradient'>
                    <CForm className="bgForm bgwhite" onSubmit={handleFormSubmit}>
                        <div className="row">
                            <div className="mb-3 col-md-4">
                                <CFormLabel htmlFor="email">Email</CFormLabel>
                                <CFormInput
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    placeholder='Enter login Email'
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3 col-md-4">
                                <CFormLabel htmlFor="password">New Password</CFormLabel>
                                <CFormInput
                                    type="password"
                                    id="password"
                                    value={formData.password}
                                    placeholder='Enter New Password'
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3 col-md-4">
                                <CFormLabel htmlFor="confirmpassword">Confirm New Password</CFormLabel>
                                <CFormInput
                                    type="password"
                                    id="passconfirmpasswordword"
                                    value={formData.confirmpassword}
                                    placeholder='Confirm Password'
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <CButton type="submit" className="mb-3 bgpurplegradient textwhite" disabled={isSubmitting} style={{ borderColor: "white" }} >
                                {isSubmitting ? 'Updating Password...' : 'Update Password'}
                            </CButton>
                        </div>
                    </CForm>
                </CCardBody>
            </CCard>
        </CCol>
    )
}

export default Settings