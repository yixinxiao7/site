import React from 'react';
import {Bootstrap, Row, Col, Container, Image} from 'react-bootstrap';
import Pic from '../images/me_2.jpg';
import './css/about_me.css';
import {renderNavBar} from '../global_component/nav_bar.jsx';


const renderPicture = () =>{
    return(
        <Image src = {Pic} className = "resize-image pb-1 pt-4 px-2"/>
    );
}

const renderDescription = () =>{
    return(
        <>
            <p className = "text-sec p-3">
                Hey, I'm Yixin! I'm currently studying at the University of Michigan, Ann Arbor, pursuing my Bachelor's degree with a major in Computer Science from the College of Engineering and a minor in Business. I have interests in machine learning, web systems, and financial technology. <br/><br/> 
                
                I researched multiple fields of machine learning, include <a href = "#/research" className="db small-modified">deep learning and active learning</a> as a research assistant of the Crowds and Machines Lab of U-M. Prior to this, I developed an augmented reality iOS application for AR related research. 
                <br/><br/>
                
                As a part of the Web Development team of the <i>Michigan Hackers</i>, I am working on the front-end of web application which will help future students better plan our their schedules for upcoming semesters. Most of my work is done in the ReactJS environment. This experience was supplemented with the <i>Web Systems</i> course at U-M where I developed applications such as a search engine and a MapReduce application with React and Python (Flask). Recently as an Software Engineering Intern for <i>Capital One</i>, I worked with Angular and Java (Springboot) to deliver an business facing application focused on promoting business intelligence.
                <br/><br/>
                Outside of academics, I enjoy hiking, exercising, listening/playing music, and traveling! 
            </p>
        </>
    );
}
export default class AboutMe extends React.Component{
    render(){
        return(
            <Container>
                <Row>
                    <Col>{renderNavBar()}</Col>
                </Row>
                <Container className="pl-3">
                    {renderPicture()}
                    <Row>
                        <div className="pl-2 left-border">{renderDescription()}</div>
                    </Row>
                </Container>
                <Row><span> &nbsp; </span></Row>
            </Container>
        );
    }
}