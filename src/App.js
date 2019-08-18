import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import {HashRouter, Route, Switch, Redirect} from "react-router-dom";
import MainPage from "./pages/home_page.jsx";
import AboutMe from "./pages/about_me.jsx";
import NotFound from "./pages/404.jsx";
import Portfolio from './pages/portfolio.jsx';
import ContactMe from './pages/contact_me.jsx';
import ResearchPage from './pages/research.jsx';


class App extends Component{
  render(){
    return (
        <HashRouter>
          <Switch>
            <Route exact path="/" component={MainPage}/>
            <Route exact path="/aboutMe" component={AboutMe}/>
            <Route exact path="/portfolio" component={Portfolio}/>
            <Route exact path="/research" component={ResearchPage}/> 
            <Route exact path="/contactMe" component={ContactMe}/>
            <Route exact path="/404" component = {NotFound}/>
            <Redirect to="/404"/>
          </Switch>
        </HashRouter>
    );
  }
}

export default App;
