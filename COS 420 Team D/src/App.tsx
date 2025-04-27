import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import maineLogo from './assets/maine.jpg';
import SignUp from './SignUp';
import Hockey from './Hockey';
import Baseball from './Baseball';
import WidgetPage from './WidgetPage';
import './App.css';

//we really need to add some comments guys, this is unintelligable
function App() {
  return (
    <Router>
      <div className="auth-buttons">
        <Link to="/signup" className="auth-button signup">Sign Up</Link>
        <Link to="/login" className="auth-button login">Login</Link>
      </div>
      
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/baseball" element={<Baseball />} />
        <Route path="/hockey" element={<Hockey />} />
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
              <Link to="/widget" className="schedule-link"> Click here for the schedule!</Link>
            </div>
            <div className="card">
              <Link to="/hockey" className="hockey-link"> Click here for Hockey</Link>
            </div>
            <div className="card">
              <Link to="/baseball" className="baseball-link"> Click here for Baseball</Link>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
