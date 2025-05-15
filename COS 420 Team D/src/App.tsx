import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import maineLogo from './assets/maine.jpg';
import SignUp from './SignUp';
import WidgetPage from './WidgetPage';
import './App.css';

//we really need to add some comments guys, this is unintelligable
function App() {
  return (
    <Router>
      <div className="auth-buttons">
        <Link to="/signup" className="auth-button signup">Sign Up</Link>
      </div>
      
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/widget" element={<WidgetPage />} />
      </Routes>
    </Router>
  );
}

export default App;
