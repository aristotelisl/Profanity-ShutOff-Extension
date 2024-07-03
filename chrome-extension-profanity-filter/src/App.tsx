 import { useState } from 'react'
import logo from './assets/familycensor2.png'
import './App.css'

function App() {
  const [isEnabled, setIsEnabled] = useState(true);

  const toggleExtension = async () => {
    setIsEnabled(prevState => !prevState);
  };

  const openOptionsPage = () => {
    chrome.runtime.openOptionsPage();
  };

  return (
    <>
      <div>
        <a href="" target="_blank">
          <img src={logo} className="logo" alt="Family Friendly Censor logo" />
        </a>
      </div>
      <h1 className='title'>Family Friendly Censor</h1>
      <div className="switch-container">
        <label className="switch">
          <input type="checkbox" checked={isEnabled} onChange={toggleExtension} />
          <span className="slider round"></span>
        </label>
        <p>
          {isEnabled ? 'Family Friendly Censor is ON' : 'Family Friendly Censor is OFF'}
        </p>
      </div>
      <div className="card">
        <button onClick={openOptionsPage}>
          Options
        </button>
        <p>
          Blacklist websites and filter out words of your choice
        </p>
      </div>
      <p className="read-the-docs">
        Pay what you like - by Aristotelis Loucaides
      </p>
    </>
  )
}
export default App