import './App.css';
//import { Route } from 'react-router-dom';
import React, {useState} from 'react';
import SignIn  from './views/auth/signin';
import  Register from './views/auth/register';
import IndexPage from './views/index';
import UserPage from './views/index/users';

function App() {
  const [currentForm, setCurrentForm] = useState('signin');
  const toogleForm = (formName) => {
    setCurrentForm(formName);
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src="logo.png" className="App-logo" alt="logo" />
        <h1>
          Welcome to BaseCamp
        </h1>
        {currentForm === 'signin' ? <SignIn onformSwitch = {toogleForm}/> : <Register onformSwitch = {toogleForm}/>}
{/* 
        <IndexPage />
        <UserPage /> */}
      </header>
    </div>
  );
}

export default App;
