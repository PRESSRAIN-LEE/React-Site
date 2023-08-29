import React, { useState } from 'react';

import Form from "react-bootstrap/Form"; 
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom'


//https://gom20.tistory.com/158

function Join(){
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");

    const [userIdError, setUserIdError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [userNameError, setUserNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const onChangeUserId = (e) => {
        const userIdRegex = /^[A-Za-z0-9+]{5,}$/;
        if ((!e.target.value || (userIdRegex.test(e.target.value)))) setUserIdError(false);
        else setUserIdError(true);
        setUserId(e.target.value);
    };
    
    const onChangePassword = (e) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if ((!e.target.value || (passwordRegex.test(e.target.value)))) setPasswordError(false);
        else setPasswordError(true);

        if (!confirmPassword || e.target.value === confirmPassword) setConfirmPasswordError(false);
        else setConfirmPasswordError(true);
        setPassword(e.target.value);
    };

    const onChangeConfirmPassword = (e) => {
        if (password === e.target.value) setConfirmPasswordError(false);
        else setConfirmPasswordError(true);
        setConfirmPassword(e.target.value);
    };

    const onChangeUserName = (e) => {
        setUserNameError(false);
        setUserName(e.target.value)
    };

    const onChangeEmail = (e) => {
        const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (!e.target.value || emailRegex.test(e.target.value)) setEmailError(false);
        else setEmailError(true);
        setEmail(e.target.value);
    };

    const validation = () => {
        if(!userId) setUserIdError(true);
        if(!password) setPasswordError(true);
        if(!confirmPassword) setConfirmPasswordError(true);
        if(!userName) setUserNameError(true);
        if(!email) setEmailError(true);

        if(userId && password && confirmPassword && userName && email) return true;
        else return false;
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(validation()) return;
        // API Call

        /*
        if(password !== confirmPassword){
            return setConfirmPasswordError(true);
        }
        if(!email){
            return setEmailError(true);
        }
        */
        console.log({
            userId,
            userName,
            password,
            confirmPassword,
            email
        });

    }

    return (
        <div className="justify-content-center align-items-center">
            <div>
                <Container className="panel">
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextId">
                            <Col sm>
                                <Form.Control maxLength={20} placeholder="UserID" value={userId} onChange={onChangeUserId} />
                                {userIdError && <div className="invalid-input">User ID must be at least 5 letter and contain letters or numbers.</div>}
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Col sm>
                                <Form.Control maxLength={20} type="password" placeholder="Password" value={password} onChange={onChangePassword} />
                                {passwordError && <div className="invalid-input">Password must be at least 8 characters and contain at least one letter and one number. </div>}
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Col sm>
                                <Form.Control maxLength={20} type="password" placeholder="Confirm Password" value={confirmPassword} onChange={onChangeConfirmPassword} />
                                {confirmPasswordError && <div className="invalid-input">Those passwords didn't match.</div>}
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Col sm>
                                <Form.Control maxLength={20} placeholder="Username" value={userName} onChange={onChangeUserName} />
                                {userNameError && <div className="invalid-input">Required.</div>}
                            </Col>
                        </Form.Group>
                        
                        <Form.Group as={Row} className="mb-3">
                            <Col sm>
                                <Form.Control maxLength={50} type="input" placeholder="Email Address" value={email} onChange={onChangeEmail} />
                                {emailError && <div className="invalid-input">Please enter valid email format.</div>}
                            </Col>
                        </Form.Group>
                        <br />
                        <div className="d-grid gap-1">
                            <Button variant="secondary" onClick={onSubmit}>로그인</Button>
                        </div>
                    </Form>
                    <br />
                    <span className="text">Have an account? <Link to="/login" className="link">Sign In</Link></span>
                </Container>
            </div>
        </div>
    );
}

export default Join;