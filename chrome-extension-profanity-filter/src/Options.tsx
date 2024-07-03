import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';

const OptionsPage: React.FC = () => {
  return (
    <Router>
      <div>
        <h2>Options Page</h2>
        <p>Select an option:</p>
     

      </div>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <OptionsPage />
  </React.StrictMode>
);

export default OptionsPage;