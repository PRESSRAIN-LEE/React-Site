import React, { useState } from 'react';
import axios from 'axios';

import LoginModal from './LoginModal';

import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form"; 
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const JoinModal = () => {
	const navigate = useNavigate();

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);


	const [userId, setUserId] = useState("");
	const [userPwd, setUserPwd] = useState("");
	const [userPwdChk, setUserPwdChk] = useState("");
	const [userName, setUserName] = useState("");
	const [userMail, setUserMail] = useState("");

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

		if (!userPwdChk || e.target.value === userPwdChk) setConfirmPasswordError(false);
		else setConfirmPasswordError(true);
		setUserPwd(e.target.value);
	};

	const onChangeConfirmPassword = (e) => {
		if (userPwd === e.target.value) setConfirmPasswordError(false);
		else setConfirmPasswordError(true);
		setUserPwdChk(e.target.value);
	};

	const onChangeUserName = (e) => {
		setUserNameError(false);
		setUserName(e.target.value)
	};

	const onChangeEmail = (e) => {
		const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
		if (!e.target.value || emailRegex.test(e.target.value)) setEmailError(false);
		else setEmailError(true);
		setUserMail(e.target.value);
	};

	const validation = () => {
		if(!userId) setUserIdError(true);
		if(!userPwd) setPasswordError(true);
		if(!userPwdChk) setConfirmPasswordError(true);
		if(!userName) setUserNameError(true);
		if(!userMail) setEmailError(true);

		if(userId && userPwd && userPwdChk && userName && userMail) return false;
		else return true;
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
        // console.log("userId_+_: ", userId);
        // console.log({
        //     userId,
        //     userName,
        //     password,
        //     confirmPassword,
        //     email
        // });

        /*
        let body = {
            userId,
            userName,
            userPwd,
            userMail,
        }
        */
        axios.post("/api/members/save", { userId,
            userName,
            userPwd,
            userMail })
		.then(res => {
			console.log(res.data);
			if(res.data.Message === "ERROR"){
				alert("오류 발생");
			}else if(res.data.Message === "VALIDATE"){
                alert("미입력 발생");
			}else{
				//navigate('/');
				handleClose();
			}
		})
		.catch(err => console.log(err));
    }

	return (
		<>
			<NavLink className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} onClick={ handleShow }>회원가입</NavLink>

			{/* <Modal show={show} onHide={handleClose}> */}
			<Modal show={ show } onHide={ handleClose } backdrop="static" keyboard={ false } >
				<Modal.Header closeButton>
					<Modal.Title>회원가입</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form>
						<Form.Group as={ Row } className="mb-3" controlId="formPlaintextId">
							<Col sm>
								<Form.Control maxLength={ 20 } placeholder="UserID" name="userID" value={ userId } onChange={ onChangeUserId } />
								{ userIdError && <div className="invalid-input">아이디는 5자 이상의 문자 또는 숫자를 포함해야 합니다.</div> }
							</Col>
						</Form.Group>

						<Form.Group as={ Row } className="mb-3">
							<Col sm>
								<Form.Control maxLength={ 20 } type="password" placeholder="Password" name="userPwd" value={ userPwd } onChange={onChangePassword} />
								{ passwordError && <div className="invalid-input">암호는 8자 이상의 문자와 숫자를 하나 이상 포함해야 합니다.</div> }
							</Col>
						</Form.Group>

						<Form.Group as={ Row } className="mb-3">
							<Col sm>
								<Form.Control maxLength={ 20 } type="password" placeholder="Confirm Password" name="userPwdChk" value={ userPwdChk } onChange={ onChangeConfirmPassword } />
								{ confirmPasswordError && <div className="invalid-input">비밀번호가 일치하지 않습니다.</div> }
							</Col>
						</Form.Group>

						<Form.Group as={ Row } className="mb-3">
							<Col sm>
								<Form.Control maxLength={ 20 } placeholder="UserName" name="userName" value={ userName } onChange={ onChangeUserName } />
								{userNameError && <div className="invalid-input">이름을 입력하십시오.</div>}
							</Col>
						</Form.Group>
						
						<Form.Group as={ Row } className="mb-3">
							<Col sm>
								<Form.Control maxLength={ 50 } type="input" placeholder="Email Address" name="userMail" value={ userMail } onChange={ onChangeEmail } />
								{ emailError && <div className="invalid-input">올바른 이메일 형식으로 입력하십시오.</div> }
							</Col>
						</Form.Group>
						<br />
						<div className="d-grid gap-1">
							<Button variant="primary" onClick={ onSubmit }>가입</Button>
						</div>
					</Form>
					<br />
					{/* <span className="text">Have an account? <Link to="/login" className="link">Sign In</Link></span> */}
					{/* <LoginModal/> */}
				</Modal.Body>

				{/* <Modal.Footer/> */}
			</Modal>
		</>
	)
}

export default JoinModal;