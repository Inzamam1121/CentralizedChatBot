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

const AddFile = () => {
    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;

    const [formData, setFormData] = useState({
        file: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleInputChange = (e) => {
        const file = e.target.files[0];

        setFormData({
            ...formData,
            file: file,
        });
    };



    const handleFormSubmit = async (e) => {
        setIsSubmitting(true);
        e.preventDefault();

        if (formData.file === '') {
            showAlert('Empty File Cant Uploaded', 'danger');
            setIsSubmitting(false);

            return
        }

        // File type validation
        const allowedFileTypes = ['text/plain', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        const selectedFileType = formData.file?.type;

        if (!allowedFileTypes.includes(selectedFileType)) {
            showAlert('Invalid file type. Please upload a TXT, or DOCX file.', 'danger');
            setIsSubmitting(false);
            setFormData({
                file: ""
            })
            return;
        }

        try {
            const file = new FormData();
            await file.append('file', formData.file);
            console.log(file)
            const response = await fetch(`https://mymbgserver.mbgchat.com/uploadfile`, {
                method: 'POST',
                body: file,
            });

            console.log(response)

            if (response.ok) {
                showAlert('File Uploded successfully', 'success');
            } else {
                showAlert('Failed to Upload File', 'danger');
            }
        } catch (error) {
            showAlert(error.message || 'Failed to Upload File', 'danger');
        } finally {
            setIsSubmitting(false);
            setFormData({
                file: ""
            })
        }
    };


    return (
        <CCol xs={12}>
            <CCard className="mb-4 border-0 bgpurplegradient p-1">
                <CCardHeader className='bgpurplegradient textwhite'>
                    <strong>Add File</strong>
                </CCardHeader>
                <CCardBody className='bgpurplegradient'>
                    <CForm className="bgForm bgwhite" onSubmit={handleFormSubmit}>
                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <CFormLabel htmlFor="file">Upload File (.txt, .docx)</CFormLabel>
                                <CFormInput
                                    type="file"
                                    id="file"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <CButton type="submit" className="mb-3 bgpurplegradient textwhite" disabled={isSubmitting} style={{borderColor:"white"}} >
                                {isSubmitting ? 'Adding File...' : 'Add File'}
                            </CButton>
                        </div>
                    </CForm>
                </CCardBody>
            </CCard>
        </CCol>
    );
};

export default AddFile;
