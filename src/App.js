import React, { useState, useEffect } from 'react';
import './App.css';

import WebcamComponent from './Component/WebcamComponent';

import { Auth } from 'aws-amplify';

//import { withAuthenticator } from 'aws-amplify-react';

function App() {
  useEffect(() => {
    //Auth.signIn('philips3', 'myamp123').then(() => {
    Auth.signIn('sclcognito', 'sclcon381').then(() => {
      //Success 
      console.log('Login success!');
     }).catch((err) => {
      // Something is Wrong
      console.error('Cannot login!', err);
     })
  },[]);

  return (
    <div className="App">
      <WebcamComponent />
    </div>
  );
}

export default App;
//export default withAuthenticator(App, { includeGreetings:true });
