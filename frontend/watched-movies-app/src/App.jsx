import React from 'react';
import Dashboard from './component/Dashboard';

const App = () => {
  return (
    <div className="App">
      <header>
        Neo4j database GUI (login: neo4j / password: password): <a href='http://13.53.87.28:7474' target="_blank">link</a>
      </header>
      <main className='dashboard-container'>
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
