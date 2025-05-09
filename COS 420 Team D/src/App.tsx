import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import maineLogo from './assets/maine.jpg';
import SignUp from './SignUp';
import SignIn from './SignIn';
import WidgetPage from './WidgetPage';
import './App.css';

//Function to create app
function App() {
  return (
    <Router>
      <div className="auth-buttons">
        <Link to="/signup" className="auth-button signup">Sign Up</Link>
        <Link to="/login" className="auth-button login">Login</Link>
      </div>
      
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/widget" element={<WidgetPage />} />
        {/* Main page with links */}
        <Route path="/" element={
          <div className="main-content">
            <div>
              <a href="nothing" target="_blank">
                <img src={maineLogo} className="logo Maine" alt="Maine logo" />
              </a>
            </div>
            <h1>UMaine Hockey</h1>
            <div className="card">
              <Link to="/widget" className="schedule-link"> Click here for the Dashboard!</Link>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
