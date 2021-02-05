import React, { useState, useEffect } from 'react';
import './App.css';

import { Storage } from 'aws-amplify';

//import { withAuthenticator } from 'aws-amplify-react';

function App() {
  const [file, setFile] = useState({ fileUrl: '', file: '', filename: ''});

  const handleChange = e => {
    const currentFile = e.target.files[0];
    setFile(
      { 
        fileUrl: URL.createObjectURL(currentFile),
        file: currentFile,
        filename: currentFile.name
      }
    );
  }
  
  const saveFile = () => {
    Storage.put(file.filename, file.file)
    .then(() => {
      console.log('successfully saved file!');
      setFile({ fileUrl: '', file: '', filename: ''});
    })
    .catch(err => {
      console.error('error uploading file!', err);
    })
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={downFile.fileUrl} alt="" /> */}
        <h1 className="App-title">Welcome to React</h1>
        <input type='file' onChange={handleChange} />
        <React.Fragment>
          <img src={file.fileUrl} alt="" />
        </React.Fragment>        
        <button onClick={saveFile}>Save File</button>
      </header>      
    </div>
  );
}

export default App;
//export default withAuthenticator(App, { includeGreetings:true });
