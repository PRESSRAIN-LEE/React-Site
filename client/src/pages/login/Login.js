import React from 'react';
import Form from "react-bootstrap/Form"; 
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

//https://gom20.tistory.com/158

function Login(){
    return (
        <div className="d-flex justify-content-center align-items-center">
            <div>
                <Container className="panel">
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextId">
                            <Col sm>
                                <Form.Control type="password" placeholder="UserID" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Col sm>
                                <Form.Control type="password" placeholder="Password" />
                            </Col>
                        </Form.Group>
                        <br/>

                        <div className="d-grid gap-1">
                            <Button variant="secondary" type="submit" >
                                Sign In
                            </Button>
                        </div>
                    </Form>
                </Container>
            </div>
        </div>
    );
}

export default Login