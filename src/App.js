import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import {HashRouter, Route, Switch, Redirect} from "react-router-dom";
import MainPage from "./pages/home_page.jsx";
import AboutMe from "./pages/about_me.jsx";
import NotFound from "./pages/404.jsx";

class App extends Component{
  render(){
    return (
        <HashRouter>
          <Switch>
            <Route exact path="/" component={MainPage}/>
            <Route exact path="/aboutMe" component={AboutMe}/>
            <Route exact path="/404" component = {NotFound}/>
            <Redirect to="/404"/>
          </Switch>
        </HashRouter>
    );
  }
}

export default App;
