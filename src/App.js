import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Categories from './components/Categories'

import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import { getToken, removeUserSession, setUserSession } from './Utils/Common';
import Search from './components/Search';
import Event from './components/Event';

function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios.get(`http://localhost:4000/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  return (
    <Router>
      <div className="container">
      <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
  <a class="navbar-brand" href="#"><Link to={'/'} className="navbar-brand">Events Management</Link></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarsExampleDefault">
    <ul class="navbar-nav mr-auto ">
      <li class="nav-item active">
        <a class="nav-link" href="#"><Link to={'/'} className="nav-link">Home</Link> <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#"><Link to={'/login'} className="nav-link">Login</Link></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#"><Link to={'/dashboard'} className="nav-link">Dashboard</Link></a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link " href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><Link to={'/'} className="nav-link">Categories</Link></a>
        <div class="dropdown-menu" aria-labelledby="dropdown01">
          <a class="dropdown-item" href="/categories/movie_show">Movies Shows</a>
          <a class="dropdown-item" href="/categories/movie_premier">Movie Premiers</a>
          <a class="dropdown-item" href="/categories/movie_trailer">Movie Trailers</a>
        </div>
      </li>
    </ul>
  </div>
</nav>
<br/><br/><br/><br/>
        <Switch>
          <Route exact path="/" component={Home} />
          <PublicRoute path="/login" component={Login} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/categories/:categ" component={Categories} />
          <PrivateRoute path="/search/:phrase" component={Search} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
