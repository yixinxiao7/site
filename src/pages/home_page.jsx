import React from 'react';
import {Row, Col, Container, Image, Button,Jumbotron} from 'react-bootstrap';
import Pic from '../images/YX.jpg';
import './css/home_page.css'
import {renderNavBar} from '../global_component/nav_bar.jsx';

const renderJumbotron = () =>{
    return(
        <Jumbotron className = "bg-trans pt-1">
        <h1 align="center" className = "main-text-color larger-text">Hi, I'm Yixin!</h1>
        <p align = "center" className = "second-text-color medium-text">
            I'm a senior studying at the University of Michigan, Ann Arbor.
        </p>
        <div align = "center"> 
            {/* <Button href= "#/aboutMe" size="lg" className="button-decorate">Learn more about me</Button>  */}
            <ul>
                <p>
                    <a href="#/aboutMe" className="px-auto py-auto">
                        <br/>
                        Learn more about me!
                        <br/>
                        <br/>
                    </a>
                </p>
            </ul>
        </div>
    </Jumbotron>
    );
}
export default class MainPage extends React.Component{
    render(){
        return (
            <Container className="stretch">
                <Row>
                    <Col>{renderNavBar()}</Col>
                </Row>
                <Row className="py-5">
                    <Image src = {Pic} className = "image-resize image-decorate"/>
                </Row>
                <Row className="py-2">
                    <Col>{renderJumbotron()}</Col>
                </Row>
            </Container>
        );
    }
}