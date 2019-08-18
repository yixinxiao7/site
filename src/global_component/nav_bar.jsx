import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import '../pages/css/global_comp.css';
export const renderNavBar = () =>{
    return(
        <Navbar className = "navbar-custom" expand="lg">
            <Navbar.Brand href="/"><p className = "light-blue header">Yixin Xiao</p></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/aboutMe"><p className = "white normal-text">About Me</p></Nav.Link>
                    <Nav.Link href="/portfolio"><p className = "white normal-text">Porfolio</p></Nav.Link>
                    <Nav.Link href="/research"><p className = "white normal-text">Research</p></Nav.Link>
                    <Nav.Link href="/contactMe"><p className = "white normal-text">Contact Me</p></Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
