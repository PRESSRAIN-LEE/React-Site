import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';

import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import JoinModal from '../pages/login/JoinModal';
import LoginModal from '../pages/login/LoginModal';

const Navbar = () => {
	const navigate = useNavigate();

	const location = useLocation();
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	
	const [userName, setUserName] = useState("");
	useEffect(() => {
		axios.get("/")
		.then(res => {
			//console.log("A : ", err);
			//if(res.data.M_NAME)
		})
		.catch(err => console.log(err))
	}, []);

	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">Home</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item">
							<NavLink className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} to="/movie">Movie</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} to="/user">회원</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} to="/board">게시판</NavLink>
						</li>
						{/* <li className="nav-item">
							<NavLink className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} to="/join">회원가입</NavLink>
						</li> */}
						<li className="nav-item">
							{/* <NavLink className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} to="/join-modal">회원가입(modal)</NavLink> */}
							<JoinModal/>
						</li>
						{/* <li className="nav-item">
							<NavLink className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} to="/login">로그인</NavLink>
						</li> */}
						<li className="nav-item">
							{/* <NavLink className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} onClick={ handleShow }>로그인(modal)</NavLink> */}
							<LoginModal/>
						</li>
						<li className="nav-item">
							<NavLink className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} to="/login">로그아웃</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default Navbar;