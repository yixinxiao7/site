import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {NavLink, Link} from 'react-router-dom';

import '../pages/css/global_comp.css';
export const renderNavBar = () =>{
    return(
        <Navbar className = "navbar-custom" expand="lg">
            <Navbar.Brand href="/"><p className = "light-blue header">Yixin Xiao</p></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto ">
                    <NavLink tag={Link} to="/aboutMe"><p className = "white normal-text mx-3">About Me</p></NavLink>
                    <NavLink tag={Link} to="/portfolio"><p className = "white normal-text mx-3">Porfolio</p></NavLink>
                    <NavLink tag={Link} to="/research"><p className = "white normal-text mx-3">Research</p></NavLink>
                    <NavLink tag={Link} to="/contactMe"><p className = "white normal-text mx-3">Contact Me</p></NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
