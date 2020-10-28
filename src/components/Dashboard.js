import React , { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { getUser, removeUserSession } from './../Utils/Common';
import Categories from './Categories';
import Search from './Search';
import TodaysEvents from './TodaysEvents';

import PrivateRoute from './../Utils/PrivateRoute';
import PublicRoute from './../Utils/PublicRoute';
import EventsList from './EventsList';
import AddEvent from './AddEvent';
import SearchBar from './SearchBar';

class Dashboard extends Component {
   user = getUser();

   constructor(props) {     
     super(props);     
     this.state = {
        day: 1     
      }   
    }     


  // handle click event of logout button
  handleLogout = () => {
    removeUserSession();
    this.props.history.push('/login');
  };

  render(){
  return (
    <Router>
      <div className="container">
        
      <div className="container">
      <svg width="10em" height="10em" viewBox="0 0 16 16" class="bi bi-camera-reels" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M0 8a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8zm11.5 5.175l3.5 1.556V7.269l-3.5 1.556v4.35zM2 7a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H2z"/>
        <path fill-rule="evenodd" d="M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
        <path fill-rule="evenodd" d="M9 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
      </svg>
      <br/>
      <br/>
      {/* <button type="submit" className="btn btn-primary" onClick={()=> this.onClick1}>Increase day</button> */}
      <br/><br/>

      </div>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-left">
          <div className="collapse navbar-collapse fixed-left" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
              <Link to={"/todaysevents"} className="nav-link">Welcome {this.user.name}!</Link>
              </li>
              <li className="nav-item">
                <Link to={`/todaysevent/${this.state.day}`} className="nav-link">TodaysEvent</Link>
              </li>
              <li className="nav-item">
                <Link to={'/search'} className="nav-link">Search</Link>
              </li>
              <li className="nav-item">
                <Link to={'/events'} className="nav-link">Events</Link>
              </li>
              <li className="nav-item">
                <Link to={'/addevent'} className="nav-link">Add Events</Link>
              </li>
              <li className="nav-item">
              <button type="submit" className="btn btn-danger" onClick={this.handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </nav> <br />
        </div>
        <Switch>
          <Route exact path="/todaysevent/:day" component={TodaysEvents} />
          <PrivateRoute path="/search" component={SearchBar} />
          {/* <PrivateRoute path="/event/:id" component={Event} /> */}
          <PrivateRoute path="/events" component={EventsList} />
          <PrivateRoute path="/addevent" component={AddEvent} />
        </Switch>
      </div>
    </Router>
  );
  }
}

export default Dashboard;
