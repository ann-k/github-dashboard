import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './stylesheets/App.scss';
import Home from './Home/Home'
import Card from './Card/Card'

function App() {
  const [activeRepo, setActiveRepo] = useState(null)

  function handleResultItemClick(repo) {
    setActiveRepo(repo)
    sessionStorage.setItem('activeRepo', JSON.stringify(repo))
  }

  return (
    <BrowserRouter>
      <div className='App'>
        <h1>Github dashboard</h1>
        <Switch>
          <Route exact path={`/card/:cardId`}>
            <Card repo={activeRepo}/>
          </Route>
          <Route path='/'>
            <Home onResultItemClick={handleResultItemClick}/>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App
