import React from 'react';

function Board(props) {
	return (
		<tr>
			<td>{props.id}</td>
			<td>
				{props.ref_step > 0 ? props.ref_step : "0"}
				{props.title}</td>
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