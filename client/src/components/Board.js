import React from 'react';
import { Link } from 'react-router-dom';

function Board(props) {
	return (
		<tr>
			<td>{props.id}</td>
			<td>
				<Link to={`/board/${props.id}`}>
					{props.title}
				</Link>
			</td>
			<td>{props.name}</td>
			<td>{props.regDate}</td>
			<td>{props.read}</td>
			<td>
				<button type="button" className="btn btn-secondary">수정</button>
				<button type="button" className="btn btn-danger">삭제</button>
			</td>
		</tr>
	)
}

export default Board;