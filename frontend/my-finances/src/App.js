import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Routes from './routes'

function App() {
  return (
    <div className="App" style={{ maxHeight : "100vh"}}>
      <Routes />
    </div>
  );
}

export default App;
