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

const NewUser = () => {
    const alertContext = useContext(AlertContext);
    const { showAlert } = alertContext;

    const [formData, setFormData] = useState({
        email: '',
        password: ''
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

        const { email, password } = formData;
        console.log(email)

        try {
            const response = await fetch(`https://mymbgserver.mbgchat.com/createuser?email=${email}&password=${password}`, {
                method: 'POST',
                // headers: {
                //     'Content-Type': 'application/json'
                // },
                // body: JSON.stringify({ email, password })
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
                    <strong>Add User</strong>
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
                                    placeholder='Enter Email'
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3 col-md-4">
                                <CFormLabel htmlFor="password">Password</CFormLabel>
                                <CFormInput
                                    type="password"
                                    id="password"
                                    value={formData.password}
                                    placeholder='Enter Password'
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <CButton type="submit" className="mb-3 bgpurplegradient textwhite" disabled={isSubmitting} style={{ borderColor: "white" }} >
                                {isSubmitting ? 'Adding User...' : 'Add User'}
                            </CButton>
                        </div>
                    </CForm>
                </CCardBody>
            </CCard>
        </CCol>
    );
};

export default NewUser;
