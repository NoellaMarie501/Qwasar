import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="logo.png" className="App-logo" alt="logo" />
        <h1>
          Welcome to BaseCamp
        </h1>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <body>
      <div>
            <form>
            <h1>Register</h1>
            User Name : <input type = "text" placeholder = "enter user name" name = "username"></input>0
            Password : <input type = "text" placeholder = "enter password" name = "password"></input>
            First Name : <input type ="text" placeholder = "enter first name" name = "firstname"></input>
            Last Name : <input type = "text" placeholder = "enter last name" name = "lastname"></input>
            Email : <input type = "email" placeholder = "enter email" name = "email"></input>
            </form>
        </div>
      </body>
    </div>
  );
}

export default App;
