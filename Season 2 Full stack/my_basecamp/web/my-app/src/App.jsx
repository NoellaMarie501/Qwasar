import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
// import SignIn  from './views/auth/signin';
// import  Register from './views/auth/register';
import Routers from './routes/router';

function App() {
  // const [currentForm, setCurrentForm] = useState('signin');
  // // const toogleForm = (formName) => {
  //   setCurrentForm(formName);
  // }
  return (
    <div className="App">
      <header className="App-header">
        <img src="logo.png" className="App-logo" alt="logo" />
        <h1>
          Welcome to BaseCamp
        </h1>
        {/* {currentForm === 'signin' ? <SignIn onformSwitch = {toogleForm}/> : <Register onformSwitch = {toogleForm}/>} */}
        <Router>
          <Routers  />
        </Router>
      </header>
    </div>
  );
}

export default App;
