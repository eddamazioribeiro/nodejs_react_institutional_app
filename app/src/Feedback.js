import React, {useState} from 'react';
import axios from 'axios';

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
      console.log(res);

      setValues({
        name: '',
        email: '',
        message: '',
        phone: '',
        uploadedFiles: [],
        buttonText: 'Send',
        uploadPhotosButtonText: 'Upload files'
      });
    })
    .catch((err) => {
      console.error('feedback submit error', err);
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
        <div className="form-group pt-5">
          <button
            className="col-12 btn btn-outline-secondary btn-block p-5"
            onClick={() => {uploadWidget()}}>
            {uploadPhotosButtonText}
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="text-muted">Description</label>
            <textarea
              type="text"
              className="form-control"
              required
              onChange={handleChange('message')}
              value={message}></textarea>
          </div>
          <div className='form-group'>
            <label className="text-muted">Name</label>
            <input className="form-control"
              type="text"
              required
              onChange={handleChange('name')}
              value={name}>
            </input>
          </div>
          <div className='form-group'>
            <label className="text-muted">Email</label>
            <input className="form-control"
              type="text"
              required
              onChange={handleChange('email')}
              value={email}>
            </input>
          </div>
          <div className='form-group'>
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
    <div className="p-5">
      <h3>Feedback</h3>
      <hr/>
      {feedbackForm()}
    </div>
  );
};

export default Feedback;