import React from 'react';
import {Bootstrap, Row, Col, Container, Image, Card, CardDeck, Button} from 'react-bootstrap';
import {renderNavBar} from '../global_component/nav_bar.jsx';
import {IoIosPaper} from "react-icons/io";
import './css/portfolio.css'
import Graph from '../images/graph.jpg';
import Stock from '../images/stocks.jpg';
import Files from '../images/log_mng.jpg';
import Puzzle from '../images/puzzle.jpg';
import Resume from '../resume/Resume.pdf';

const renderResume=()=>{
    return(
        <Card className="bg-db" style={{ width: '18rem' }}>
            <Card.Body>
                <div align="center">
                    <a href={Resume} target="_blank">
                        <IoIosPaper size={120} className="dg"/>
                    </a>
                </div>
            </Card.Body>
            <Card.Footer>
                    <Card.Title align="center"><a href={Resume} target="_blank" className="lb">Resume</a></Card.Title>
            </Card.Footer>
        </Card>
    );
}
const renderCards=()=>{
    
    return(
        <CardDeck className="py-3">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top"  src={Graph} className="card-img-top"/>
                <Card.Body className="bg-db">
                    <Card.Title className="lb">Best Donut Delivery Route</Card.Title>
                    <Card.Text className="dg">
                    Graphs, Minimum Spanning Trees, and the Traveling Salesman problem algorithms and heuristics.
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="bg-db">
                <a href='https://github.com/yixinxiao7/MST-TSP.git' target='_blank'>
                    <Button className="button-lb dg"> See project </Button>
                </a>
                </Card.Footer>
            </Card>    
    
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top"  src={Stock} className="card-img-top"/>
                <Card.Body className="bg-db">
                    <Card.Title className="lb">Stock Market Simulation as Star Wars</Card.Title>
                    <Card.Text className="dg">
                    Stacks, Queues, and the Running Median algorithm. Also, the heap implemented 3 different ways: pairing, binary, and sorted.
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="bg-db">
                    <a href="https://github.com/yixinxiao7/Stock-Market-Simulation.git" target="_blank">
                        <Button className="button-lb dg">See project</Button>
                    </a>
                </Card.Footer>
            </Card>

            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top"  src={Files} className="card-img-top"/>
                <Card.Body className="bg-db">
                    <Card.Title className="lb">Log Manager</Card.Title>
                    <Card.Text className="dg">
                    Hash tables, vectors, deques, and sorting algorithms!
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="bg-db">
                    <a href="https://github.com/yixinxiao7/Log-Manager.git" target="_blank">
                        <Button className="button-lb dg">See project</Button>
                    </a>
                </Card.Footer>
            </Card>
    
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={Puzzle} className="card-img-top"/>
                <Card.Body className="bg-db">
                    <Card.Title className="lb">Puzzle Solver</Card.Title>
                    <Card.Text className="dg">
                    Depth first search, Breadth first search, and backtracking algorithms!
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="bg-db">
                    <a href="https://github.com/yixinxiao7/Puzzle-Solver.git" target="_blank">
                        <Button className="button-lb dg">See project</Button>
                    </a>
                </Card.Footer>
            </Card>
        </CardDeck>
    );    
}
export default class Portfolio extends React.Component{
    render(){
        return(
            <Container>
                <Row>{renderNavBar()}</Row>
                <Row className="pb-3">
                    <Col>
                        <h3 className="header-color" align="center">—Portfolio—</h3>
                    </Col>
                </Row>
                <Row>
                    <Col align="center">
                        {renderResume()}                  
                    </Col>
                    {/* <Col align="left">
                        {renderTranscript()}
                    </Col> */}
                </Row>
                <Row className="pt-3">
                    <Col>
                        <h3 className="header-color" align="center">—Projects—</h3>
                    </Col>
                </Row>
                <Row>
                    <Col>{renderCards()}</Col>
                </Row>
            </Container>
        );
    }
}