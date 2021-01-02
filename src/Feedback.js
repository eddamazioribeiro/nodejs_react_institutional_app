import React, {useState} from 'react';

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

  const handleChange = () => {
    console.log('handle change');
  };

  const handleSubmit = () => {
    console.log('handle');
  };

  const feedbackForm = () => {
    return(
      <React.Fragment>
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