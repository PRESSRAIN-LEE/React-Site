import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams, useNavigate, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
//import BoardBtnDel from '../pages/board/BoardBtnDel';

function BoardView(){
	const {idx} = useParams();
	const [board, setBoard] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		axios.get('/api/boards/detail/' + idx)
		.then(res => {
			//console.log(1, res);
			setBoard(res.data[0]);
		})
		.catch(err => console.log(err))
	}, []);

	const goList = () => {
		navigate('/board');
	}
	const goEdit = () => {
		navigate(`/board/edit/${idx}`);
	}
	const goReply = () => {
		navigate(`/board/reply/${idx}`);
	};

	return (
		<div className="justify-content-center align-items-center">
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
				{/* `/edit/${idx}` */}
				<div className="col text-right">
					<Button onClick={goEdit} className="btn mb-2 mx-2" variant="success" type="button">수정</Button>
					<Button onClick={goReply} className="btn mb-2 mx-2" variant="secondary" type="button">답변</Button>
					<Button className="btn mb-2 mx-2" variant="primary" type="button" onClick={goList}>목록</Button>
					<Button className="btn mb-2 mx-2" variant="danger" type="button">삭제</Button>
					{/* <BoardBtnDel /> */}
				</div>
			
			</div>
		</div>
	)
}

export default BoardView;