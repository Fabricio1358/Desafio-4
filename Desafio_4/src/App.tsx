import React, { useState } from 'react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <div id="root">
      {/* Top bar */}
      <div className="top-bar">
        <div
          className={activeTab === 'Home' ? 'active' : ''}
          onClick={() => setActiveTab('Home')}
        >
          Home
        </div>
        <div
          className={activeTab === 'About' ? 'active' : ''}
          onClick={() => setActiveTab('About')}
        >
          About
        </div>
      </div>

      {/* Content area */}
      <div className="content">
        {activeTab === 'Home' && <h1>Welcome to the Home Page</h1>}
        {activeTab === 'About' && <h1>About Page Content</h1>}
      </div>
    </div>
  );
}

export default App;