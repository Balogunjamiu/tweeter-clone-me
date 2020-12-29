import React from 'react';
import './App.css';
import Home from './routes/Home';
import Profile from './routes/Profile';
import Header from './components/Header';
import {Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header/>
      <Route exact path = '/' component = {Home}/>
      <Route path = '/profile' component = {Profile}/>
    </div>
  );
}

export default App;
