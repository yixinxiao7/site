import React from 'react';
import {Row, Col, Container, Image} from 'react-bootstrap';
import {renderNavBar} from '../global_component/nav_bar.jsx';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {FaGlasses, FaRobot} from "react-icons/fa";
import './css/research.css';

const renderTimeLine=()=>{
    return(
        <VerticalTimeline layout="1-column">
        <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="2018 - present"
            iconStyle={{ background: '#45A29E', color: '#0B0C10' }}
            icon={<FaRobot />}
        >
            <h3 className="vertical-timeline-element-title db-text">Crowds and Machines Lab</h3>
            <h4 className="vertical-timeline-element-subtitle db-text">Undergraduate Research Assistant</h4>
            <hr className="line-db"></hr>
            <p >
            
            From 2018-2019, my research centered around machine learning with a focus on active learning and deep learning. The focus of my project was to make a meta learner to select the best active leaning strategy to train a machine learning model depending on its training stage, in order to achieve a fast-learning and accurate model. 
            <br/><br/>
            I developed a flexible wrapper class for both custom and Pytorch convolution neural networks, with an API similar to that found on scikit-learn models. This wrapper class was used to develop the experimental pipeline, building part of the foundation of the research project.

            <br/><br/>
            Additionally, I worked on expanding the current datasets being used for the experiments,by adding Twenty News (text dataset). I leveraged the raw text data anyone can retrieve from scikit-learn, and converted it into an adapted, inerhited class from our main data loader class, following the structure of the class hierarchy. This will allow for other machine learning problems, such as Natural Language Processing, to be tested with the metalearner.   
            </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="2017 - 2018"
            iconStyle={{ background: '#45A29E', color: '#0B0C10' }}
            icon={<FaGlasses />}
        >
            <h3 className="vertical-timeline-element-title db-text">University of Michigan</h3>
            <h4 className="vertical-timeline-element-subtitle db-text">Undergraduate Research Assistant</h4>
            <hr className="line-db"></hr>
            <p>
            From 2017-2018, I conducted research on Bluetooth technology and augmented reality (AR). During the first half of the year, the goal was to enable Bluetooth functionality into everyday goods. To test this, I worked with an arduino to remotely light up the adafruit neopixel (led lights).
            <br/><br/>
            During the second half, I worked with augmented reality to test its impact on the domestic manufacturing process and industrial design. Due to the very general and exploratory nature of the research topic, I focused on setting up on the foundation of the project— I created an augmented reality application using apple’s ARKit, which allows users place and remove and .obj file onto any detected planes. This will help with architectural analysis and can be easily extended or modified to perform other tasks.
            </p>
        </VerticalTimelineElement>
        </VerticalTimeline>
    );
}
export default class ResearchPage extends React.Component{
    render(){
        return(
            <Container>
                <Row>
                    {renderNavBar()}
                </Row>
                <Row>
                    {renderTimeLine()}
                </Row>
            </Container>
        );
    }
}