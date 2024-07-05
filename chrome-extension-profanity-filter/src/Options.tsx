import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import WordsPage from './components/WordsPage';

const OptionsPage: React.FC = () => {
  return (
    <Router basename="/options.html">
      <div>
        <nav>
          <ul>
            <li><Link to="/words">Words</Link></li>
            <li><Link to="/domains">Domains</Link></li>
            <li><Link to="/extra">Extra</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/words" element={<WordsPage />} />
          <Route path="/domains" element={<div>Domains Page</div>} />
          <Route path="/extra" element={<div>Extra Page</div>} />
        </Routes>
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