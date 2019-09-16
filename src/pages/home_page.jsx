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
            I'm a junior studying at the University of Michigan, Ann Arbor.
        </p>
        <div align = "center"> <Button href= "#/aboutMe" size="lg" className="button-color">Learn more about me</Button> </div>
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
                <Row className="py-3">
                    <Image src = {Pic} className = "image-resize image-decorate mx-auto"/>
                </Row>
                <Row>
                    <Col>{renderJumbotron()}</Col>
                </Row>
            </Container>
        );
    }
}
{/* <Row>
                    <Col>{renderNavBar()}</Col>
                 </Row>
                <Row>
                    <Col md = {4} align = "left" >
                        <Image src= {Pic}  rounded className = "image-rotate"/>
                    </Col>
                    <Col md = {8}>
                        {renderJumbotron()}            
                    </Col>
                </Row> */}