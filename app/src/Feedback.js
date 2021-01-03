import React, {useState} from 'react';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './Layout';

const Feedback = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    message: '',
    phone: '',
    uploadedFiles: [],
    buttonText: 'Send',
    uploadPhotosButtonText: 'Upload files'
  });

  // destrutcturing state vars
  const {
    name,
    email,
    message,
    phone,
    uploadedFiles,
    buttonText,
    uploadPhotosButtonText
  } = values;

  // destructuring env vars
  const {
    REACT_APP_API,
    REACT_APP_CLOUDINARY_CLOUD_NAME,
    REACT_APP_CLOUDINARY_UPLOAD_PRESET
  } = process.env;

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      [name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    setValues({
      ...values,
      buttonText: 'Sending...'
    });

    axios({
      method: 'POST',
      url: `${REACT_APP_API}/feedback`,
      data: {name, email, phone, message, uploadedFiles}
    })
    .then((res) => {
      if (res.data.success) {
        toast.success('Message sent. Thanks for your contact!');
        
        setValues({
          name: '',
          email: '',
          message: '',
          phone: '',
          uploadedFiles: [],
          buttonText: 'Send',
          uploadPhotosButtonText: 'Upload files'
        });
      } else {
        toast.error(`${res.data}. Please, verify and try again`);

        setValues({
          buttonText: 'Send',
          uploadPhotosButtonText: 'Upload files'
        })
      }
    })
    .catch((error) => {
      console.error(error.response.data.data);

      // message exposed just for testing / studying purposes
      if (error.response.data.data) toast.error(`${error.response.data.data}. Please, try again`);
      else toast.error('Sorry, an error ocurred. Please, try again');      

      setValues({
        buttonText: 'Send',
        uploadPhotosButtonText: 'Upload files'
      })
    });
  };

  const uploadWidget = () => {
    window.cloudinary.openUploadWidget({
      cloud_name: REACT_APP_CLOUDINARY_CLOUD_NAME,
      upload_preset: REACT_APP_CLOUDINARY_UPLOAD_PRESET,
      tags: ['ebooks']
    }, function(error, result) {
      setValues({
        ...values,
        uploadedFiles: result,
        uploadPhotosButtonText: `${(result ? result.length : 'No')} Photo(s) uploaded`
      });
    });
  };

  const feedbackForm = () => {
    return(
      <React.Fragment>
        <div className="form-group">
          <button
            className="col-12 btn btn-outline-secondary btn-block p-5"
            onClick={() => {uploadWidget()}}>
            {uploadPhotosButtonText}
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group p-2">
            <label className="text-muted">Description</label>
            <textarea
              type="text"
              className="form-control"
              required
              onChange={handleChange('message')}
              value={message}></textarea>
          </div>
          <div className="form-group p-2">
            <label className="text-muted">Name</label>
            <input className="form-control"
              type="text"
              required
              onChange={handleChange('name')}
              value={name}>
            </input>
          </div>
          <div className="form-group p-2">
            <label className="text-muted">Email</label>
            <input className="form-control"
              type="text"
              required
              onChange={handleChange('email')}
              value={email}>
            </input>
          </div>
          <div className="form-group p-2">
            <label className="text-muted">Phone</label>
            <input className="form-control"
              type="number"
              required
              onChange={handleChange('phone')}
              value={phone}>
            </input>
          </div>
          <button className="col-12 mt-2 btn btn-primary btn-block">{buttonText}</button>                  
        </form>     
      </React.Fragment>
    );
  };

  return(
    <Layout>
      <ToastContainer/>
      <div className="containter text-center">
        <h1 className="pt-5">Feedback</h1>
        <hr/>
      </div>
      <div className="container col-md-8 offset-md-2">
        {feedbackForm()}
      </div>
    </Layout>
  );
};

export default Feedback;