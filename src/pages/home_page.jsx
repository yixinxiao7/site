import React from 'react';
import {Row, Col, Container, Image, Button,Jumbotron} from 'react-bootstrap';
import Pic from '../images/YX.jpg';
import './css/home_page.css'
import './css/global_comp.css'
import {renderNavBar} from '../global_component/nav_bar.jsx';

const renderJumbotron = () =>{
    return(
        <Jumbotron align="center" className = "bg-trans">
            <div className="vcenter">
                <h1 className="large-font">
                    Hello, I'm <span className="light-green">Yixin</span>!
                </h1>   
                <h3>
                    I'm a passionate <span className="dark-green">student</span>
                    , driven <span className="dark-green">software engineer</span>
                    , and avid <span className="dark-green"> corgi-lover</span>.
                    </h3>
                <Button variant="outline-light" href="#/aboutMe" className="mt-2">More about me</Button>
            </div>
        </Jumbotron>
    );
}

export default class MainPage extends React.Component{
    render(){
        return (
            <Container className="stretch vertical-stretch">
                {renderJumbotron()}  
            </Container>
        );
    }
}