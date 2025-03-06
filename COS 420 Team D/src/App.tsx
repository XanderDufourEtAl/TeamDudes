import maineLogo from './assets/maine.jpg'
import './App.css'

function App() {


  return (
    <>
      <div>
        <a href="nothing" target="_blank">
          <img src={maineLogo} className="logo Maine" alt="Maine logo" />
        </a>
      </div>
      <h1>Umaine Hockey</h1>
      <div className="card">
          Click here to see the schedule!
      </div>
    </>
  )
}

export default App
