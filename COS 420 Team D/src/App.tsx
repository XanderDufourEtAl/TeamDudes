import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import maineLogo from './assets/maine.jpg';
import SignUp from './SignUp';
import Hockey from './Hockey';
import './App.css';

function App() {
  return (
    <Router>
      <div className="auth-buttons">
        <Link to="/signup" className="auth-button signup">Sign Up</Link>
        <Link to="/login" className="auth-button login">Login</Link>
      </div>
      
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/hockey" element={<Hockey />} />
        <Route path="/" element={
          <div className="main-content">
            <div>
              <a href="nothing" target="_blank">
                <img src={maineLogo} className="logo Maine" alt="Maine logo" />
              </a>
            </div>
            <h1>UMaine Hockey</h1>
            <div className="card">
              <Link to="/hockey" className="schedule-link"> Click here for the schedule!</Link>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
