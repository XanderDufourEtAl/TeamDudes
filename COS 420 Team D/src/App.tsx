import maineLogo from './assets/maine.jpg'
import './App.css'

function App() {
  return (
    <>
      <div className="auth-buttons">
        <a href="signup.html" className="auth-button signup">Sign Up</a>
        <a href="login.html" className="auth-button login">Login</a>
      </div>
      
      <div className="main-content">
        <div>
          <a href="nothing" target="_blank">
            <img src={maineLogo} className="logo Maine" alt="Maine logo" />
          </a>
        </div>
        <h1>UMaine Hockey</h1>
        <div className="card">
            Click here to see the schedule!
        </div>
      </div>
    </>
  )
}

export default App
