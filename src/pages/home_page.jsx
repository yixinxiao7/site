import React from 'react';
import {Row, Col, Container, Image, Button,Jumbotron} from 'react-bootstrap';
import Pic from '../images/YX.jpg';
import './css/home_page.css'
import './css/global_comp.css'
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations'


const fadeInAnimation = keyframes`${fadeIn}`;

const FadeInDiv = styled.div`
  animation: 2s ${fadeInAnimation};
`;

const renderJumbotron = () =>{
    return(
        <FadeInDiv>
            <Jumbotron align="center" className = "bg-trans">
                <div className="vcenter px-3">
                    <h1 className="large-font">
                        Hello, I'm <span className="light-green">Yixin</span>!
                    </h1>   
                    <h2>
                        I'm a passionate <span className="dark-green">student</span>
                        , driven <span className="dark-green">software engineer</span>
                        , and avid <span className="dark-green"> corgi-lover</span>.
                    </h2>
                    <Button variant="outline-light" href="#/aboutMe" className="mt-2 btn-lg">More about me</Button>
                </div>
            </Jumbotron>
        </FadeInDiv>
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