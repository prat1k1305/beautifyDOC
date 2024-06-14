import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import SwaggerDoc from './SwaggerDoc';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [spec, setSpec] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
        console.error('No file selected');
        return;
      }
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSpec(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <Button variant="contained" color="primary" onClick={handleFileUpload}>
        Upload
      </Button>
      {spec && <SwaggerDoc spec={spec} />}
    </div>
  );
};

export default FileUpload;
