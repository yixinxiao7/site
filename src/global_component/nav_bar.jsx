import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {NavLink, Link} from 'react-router-dom';

import '../pages/css/global_comp.css';
export const renderNavBar = () =>{
    return(
        <Navbar className = "navbar-custom" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink tag={Link} to="/"><h1 className="light-green header mx-3">Yixin Xiao</h1></NavLink>
                    <NavLink tag={Link} to="/aboutMe"><p className = "light-grey normal-text pt-3 mx-3">About Me</p></NavLink>
                    <NavLink tag={Link} to="/portfolio"><p className = "light-grey py-auto normal-text pt-3 mx-3">Portfolio</p></NavLink>
                    <NavLink tag={Link} to="/research"><p className = "light-grey py-auto normal-text pt-3 mx-3">Research</p></NavLink>
                    <NavLink tag={Link} to="/contactMe"><p className = "light-grey py-auto normal-text pt-3 mx-3">Contact Me</p></NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
