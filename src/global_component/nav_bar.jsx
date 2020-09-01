import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {NavLink, Link} from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import '../pages/css/global_comp.css';
export const renderNavBar = () =>{
    return(
        <>
        <Navbar className = "navbar-custom" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink tag={Link} to="/"><h1 className="light-green header-size pt-1 mx-3">Yixin Xiao</h1></NavLink>
                    <NavLink tag={Link} to="/aboutMe"><p className = "light-grey medium-size pt-3 mx-3">About Me</p></NavLink>
                    <HashLink smooth to="/aboutMe#education"><p className = "light-grey medium-size pt-3 mx-3">Education</p></HashLink>
                    <HashLink smooth to="/aboutMe#work"><p className = "light-grey medium-size pt-3 mx-3">Work Experience</p></HashLink>
                    <HashLink smooth to="/aboutMe#research"><p className = "light-grey medium-size pt-3 mx-3">Research</p></HashLink>
                    <HashLink smooth to="/aboutMe#projects"><p className = "light-grey medium-size pt-3 mx-3">Projects</p></HashLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        
        </>
    );
}
