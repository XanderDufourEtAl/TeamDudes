import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import maineLogo from './assets/maine.jpg';
import SignUp from './SignUp';
import SignIn from './SignIn';
import WidgetPage from './WidgetPage';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Router>
      <div className="theme-buttons">
        <button 
          className={`theme-button ${!isDarkMode ? 'active-theme' : ''}`}
          onClick={toggleTheme}
        >
          ☀️ Light
        </button>
        <button 
          className={`theme-button ${isDarkMode ? 'active-theme' : ''}`}
          onClick={toggleTheme}
        >
          🌙 Dark
        </button>
      </div>

      <div className="auth-buttons">
        <Link to="/signup" className="auth-button signup">Sign Up</Link>
      </div>


      <div id="root">
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/widget" element={<WidgetPage />} />
          <Route 
            path="/" 
            element={
              <div className="main-content">
                <div>
                  <a href="nothing" target="_blank" rel="noopener noreferrer">
                    <img src={maineLogo} className="logo Maine" alt="Maine logo" />
                  </a>
                </div>
                <h1 className="theme-text">Black Bear Bulletin</h1>
                <div className="card">
                  <Link to="/widget" className="schedule-link">
                    Click here for the Dashboard!
                  </Link>
                </div>
              </div>
            } 
          />
        </Routes>
      </div>

    </Router>
  );
}

export default App;
