import React from 'react';
import FileUpload from './components/FileUpload';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Upload your OpenAPI Specification</h1>
      <FileUpload />
    </div>
  );
}

export default App;
