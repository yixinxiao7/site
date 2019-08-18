import React from 'react';
import {Bootstrap, Row, Col, Container, Image} from 'react-bootstrap';
import Phone from '../images/phone.jpg';
import Email from '../images/email.jpg';
import BusMan from '../images/business.jpg';
import Black from '../images/black_image.jpg';
import {IoIosPhonePortrait, IoIosMail,IoLogoLinkedin} from "react-icons/io";
import './css/contact_me.css';
import {renderNavBar} from '../global_component/nav_bar.jsx';

const renderIcon=props=>{
    if(props == "phone"){
        return(
            <div align="center" className="icon-overlay" style={{color:"#45A29E"}}>
                <IoIosPhonePortrait size={100}/>
                <p>301-541-9605</p>
            </div>
        );
    }
    else if(props == "email"){
        return(
            <div align="center" className="icon-overlay" style={{color:"#45A29E"}}>
                <a href="mailto:yixinx@umich.edu" target="_blank" className="dark-blue">
                    <IoIosMail size={100}/>
                </a>
                <p>
                    <a href="mailto:yixinx@umich.edu" target="_blank" className="dark-blue">yixinx@umich.edu</a>
                </p>
            </div>
        );
    }
    else{
        return(
            <div align="center" className="icon-overlay" style={{color:"#45A29E"}}>
                <a href="https://www.linkedin.com/in/yixin-xiao-4851a2163" target="_blank" className="dark-blue">
                    <IoLogoLinkedin size={100}/>
                </a>
                <p>
                    <a href="https://www.linkedin.com/in/yixin-xiao-4851a2163" target="_blank" className="dark-blue">LinkedIn</a>
                </p>
            </div>
        );
    }
}

export default class ContactMe extends React.Component{
        render(){
            return(
                <Container>
                    <Row>{renderNavBar()}</Row>
                    <Row>
                        <Col xs={4} s={4} md={4} className = "col-no-padding">    
                            <Image src={Phone} className="apply-phone"/>
                            <Image src={Black} className="image-overlay"/>
                            {renderIcon("phone")}
                        </Col>
                        <Col xs={4} s={4} md={4} className = "col-no-padding">
                            <Image src={Email} className="apply-email"/>
                            <Image src={Black} className="image-overlay"/>
                            {renderIcon("email")}
                        </Col>
                        <Col xs={4} s={4} md={4} className = "col-no-padding">
                            <Image src={BusMan} className="apply-busman"/>
                            <Image src={Black} className="image-overlay"/>
                            {renderIcon("busman")}
                        </Col>                        
                    </Row>
                </Container> 
            );
        }
}
