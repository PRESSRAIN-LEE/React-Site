import React, { useState } from 'react';
import axios from 'axios';

import LoginValidation from './LoginValidation';

import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form"; 
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, NavLink, useNavigate } from 'react-router-dom';


const LoginModal = () => {
	const navigate = useNavigate();
	const [errors, setErrors] = useState({});

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [values, setValues] = useState({
		userId: '',
		userPwd: ''
	});

    // const userIdHandler = (e) => {
    //     setUserId = e.target.value;
    // }
    // const userPwdHandler = (e) => {
    //     setUserPwd = e.target.value;
    // }

    const changeValue = (e) => {
		//console.log(e.target.name);
		//console.log(e.target.value);
		setValues({
			...values,
			[e.target.name]: e.target.value
		});
	}

    const goLogin = (e) => {
        e.preventDefault();
        setErrors(LoginValidation(values));

        //console.log("userId", values.userId);
        if(errors.userId !== "" && errors.userPwd !== ""){
            axios.post("/api/members/login", values)
            .then(res => {
                //console.log("성공", res.data.Login);
                //console.log(res);
                //console.log('res.data.userId :: ', res.data.M_SEQ);
                //console.log('res.data.msg :: ', res.data.Login);
                
                if(res.data.Login){
                    //console.log("성공1");
                    //sessionStorage.setItem('USER_SEQ', JSON.stringify(res.data, ["M_SEQ", "M_NAME"]));
                    //sessionStorage.setItem('M_SEQ', JSON.stringify(res.data.M_SEQ));
                    sessionStorage.setItem('M_SEQ', res.data.M_SEQ);
                    sessionStorage.setItem('M_NAME', res.data.M_NAME);
                    //navigate("/");
                    
                    window.location.reload();
                }else{
                    alert("No Record");
                }
            })
            .catch(err => console.log(err));
        }
    }

	return (
		<>
			<NavLink className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} onClick={ handleShow }>로그인</NavLink>

			{/* <Modal show={ show } onHide={ handleClose }> */}
			<Modal show={ show } onHide={ handleClose } backdrop="static" keyboard={ false } >
				<Modal.Header closeButton>
					<Modal.Title>로그인</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form onSubmit={ goLogin }>
                        <Form.Group as={ Row } className="mb-3" controlId="userId">
                            <Col sm>
                                <Form.Control type="text" name="userId" placeholder="UserID" onChange={ changeValue } />
                                { errors.userId && <span className="text-danger">{ errors.userId }</span> }
                            </Col>
                        </Form.Group>

                        <Form.Group as={ Row } className="mb-3" controlId="userPwd">
                            <Col sm>
                                <Form.Control type="password" name="userPwd" placeholder="Password" onChange={ changeValue } />
                                { errors.userPwd && <span className="text-danger">{ errors.userPwd }</span> }
                            </Col>
                        </Form.Group>
                        <br/>

                        <div className="d-grid gap-1">
                            <Button variant="primary" type="submit" >로그인</Button>
                        </div>
                    </Form>
				</Modal.Body>
				
				{/* <Modal.Footer/> */}
			</Modal>
		</>
	)
}

export default LoginModal;