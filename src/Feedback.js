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
    emailname,
    messagename,
    phonename,
    uploadedFilesname,
    buttonTextname,
    uploadPhotosButtonTextname
  } = values;

  return(
    <p>Feedback Page</p>
  );
};

export default Feedback;