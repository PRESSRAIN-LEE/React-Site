import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

function BoardView(){
	const {idx} = useParams();
	const [board, setBoard] = useState([]);

	useEffect(() => {
		axios.get('/api/boards/' + idx)
		.then(res => {
			//console.log(1, res);
			setBoard(res.data[0]);
		})
		.catch(err => console.log(err))
	}, []);

	return (
		<div className="d-flex justify-content-center align-items-center">
			<div className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
				<h3>글 상세</h3>
				
				<table className="table table-bordered">
					<tbody>
						<tr>
							<td className="col-2 table-active">이름</td>
							<td className='col-8'>{board.member_name}</td>
						</tr>
						<tr>
							<td className="table-active">제목</td>
							<td>{board.board_title}</td>
						</tr>
						<tr>
							<td className="table-active">내용</td>
							<td>{board.board_content}</td>
						</tr>
					</tbody>
				</table>

				<div className="col text-right">
					<button className="btn btn-primary mb-2" type="submit">수정</button>
					<button className="btn btn-outline-primary mb-2" type="button">목록</button>
					<button className="btn btn-outline-danger mb-2" type="button">삭제</button>
				</div>
			
			</div>
		</div>
	)
}

export default BoardView;