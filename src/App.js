import React from 'react';
import './App.css';
import Router from './routes/routes';

function App() {

  //1. Vérifier le local storage pour le token
  //2. S'il existe --> le mettre dans le store

  return (
    <div className="App">
      <header className="App-header">
        <Router/>
      </header>
    </div>
  );
}

export default App;
