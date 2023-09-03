import React from 'react';
import axios from 'axios';

import { Link, NavLink, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';

const LogOut = () => {
	const navigate = useNavigate();

	//로그아웃
	const goLogOut = () => {
		sessionStorage.removeItem("M_SEQ");
		console.log("로그아웃", sessionStorage.getItem("M_SEQ"));
		navigate("/");

		// axios.get('/api/members/logout')
		// .then(response => {
		// 	console.log(response.data)
		// })
		// .catch(err => console.log(err));
	}

	//정보변경
	const goInfoModify = () => {

	}

	return (
		<>
			{/* <NavLink className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} onClick={ goLogOut }>로그아웃</NavLink> */}

			<Navbar.Text>
				<NavLink className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} onClick={ goInfoModify }>{sessionStorage.getItem("M_NAME")}님 반갑습니다. &nbsp;</NavLink>
			</Navbar.Text>
			<Navbar.Text>
				<NavLink className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} onClick={ goLogOut }>로그아웃</NavLink>
			</Navbar.Text>

		</>
	)
}

export default LogOut