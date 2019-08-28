import React from 'react';
import {Bootstrap, Row, Col, Container, Image} from 'react-bootstrap';
import Pic from '../images/me_2.jpg';
import './css/about_me.css';
import {renderNavBar} from '../global_component/nav_bar.jsx';


const renderPicture = () =>{
    return(
        <Image src = {Pic} className = "resize-image pb-1 px-2 pt-4"/>
    );
}

const renderDescription = () =>{
    return(
        <>
            <p className = "text-sec p-3">
                Hey, I'm Yixin! I'm currently studying at the University of Michigan, Ann Arbor, pursuing my Bachelor's degree with a major in Computer Science from the College of Engineering and a minor in Business. I have interests in machine learning, web development, and financial technology. <br/><br/> Outside of my academics, I am also a research assistant of the Crowds and Machines Lab of U-M, where I have worked with <a href = "#/research" className="db small-modified">Machine Learning, Deep Learning, and Active Learning</a>. Prior to this, I developed an augmented reality iOS application for AR related research. <br/><br/> Additionally, as a part of the Web Development team of the Michigan Hackers, I am working on the front-end of web application which will help future students better plan our their schedules for upcoming semesters. Most of my work is done in the ReactJS environment. After the completion of the app, I plan on learning back-end development for future projects, most likely via Google Go.
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
              
                <Row className = "pb-3">
                    <Col>
                        <h3 className = "header-color" align = "center" >—About Me—</h3>
                    </Col>
                </Row>
                <Container className="lightgrey-bg px-3 py-3">
                    
                    <Row >
                        <div>{renderPicture()} {renderDescription()}</div>
                    </Row>
                </Container>
                <Row><span> &nbsp; </span></Row>
            </Container>
        );
    }
}