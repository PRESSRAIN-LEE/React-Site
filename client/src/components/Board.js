import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BoardBtnDel from '../pages/board/BoardBtnDel';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function Board(props) {
	const navigate = useNavigate();

	const goEdit = () => {
		navigate(`/board/edit/${props.id}`);
	}

	const addHit = () => {
		//console.log("HIT");
		axios.put("/api/boards/hit/" + props.id)
		.then(res => {
			console.log(res);
			//navigate('/board');
		})
		.catch(err => console.log(err));
	}

	return (
		<tr>
			<td>{props.id}</td>
			<td>
				{
					props.ref_step > 0 ?
										[...Array(parseInt(props.ref_level))].map((n, index) => {
											return <span style={{ whiteSpace: 'pre-wrap'}} key={index}> { " " } </span>
										})
										: ""
				}
				{/* <Link to={`/board/detail/${props.id}`}> */}
				<Link onClick={ addHit } to={`/board/detail/${props.id}`}>
					{
						props.ref_level > 0 ? '답변: ' + props.title : props.title
					}
				</Link>
			</td>
			<td>{props.name}</td>
			<td>{props.regDate}</td>
			<td>{props.read}</td>
			<td>
				<Button size="sm" type="button" className="btn mb-2 mx-1" variant="success" onClick={goEdit}>수정</Button>
				<BoardBtnDel 
					stateRefresh={props.stateRefresh} 
					id={props.id}
				/>
			</td>
		</tr>
	)
}

export default Board;