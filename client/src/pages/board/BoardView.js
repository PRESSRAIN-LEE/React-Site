import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams, useNavigate, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Swal from "sweetalert2";

//import BoardBtnDel from '../pages/board/BoardBtnDel';

function BoardView(){
	const {idx} = useParams();
	const [board, setBoard] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		axios.get('/api/boards/detail/' + idx)
		.then(res => {
			if(res.data.Status === true){
				//console.log("data2: ", res.data.results[0]);
				setBoard(res.data.results[0]);
			}else{
				setBoard(res.Message);
			}
		})
		.catch(err => console.log(err))
	}, []);

	//목록
	const goList = () => {
		navigate('/board');
	}

	//수정
	const goEdit = () => {
		navigate(`/board/edit/${idx}`);
	}

	//답변
	const goReply = () => {
		navigate(`/board/reply/${idx}`);
	};

	//삭제
	const goBoardDel = (id) => {
		Swal.fire({
			title: '삭제 하시겠습니까?',
			//text: '다시 되돌릴 수 없습니다. 신중하세요.',
			icon: 'warning',
			
			showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
			confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
			cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
			confirmButtonText: '삭제', // confirm 버튼 텍스트 지정
			cancelButtonText: '취소', // cancel 버튼 텍스트 지정
			reverseButtons: false, // 버튼 순서 거꾸로
		 }).then(confirmResult => {
			// 만약 Promise리턴을 받으면,
			axios.get('/api/boards/delete/' + id)
			.then(res => {
				if(res.data.Status === true){
					//console.log("삭제 확인");
					if (confirmResult.isConfirmed) { // 만약 모달창에서 confirm 버튼을 눌렀다면
						Swal.fire('삭제 되었습니다.')
						.then(function(){
							window.location.href="/board";
						})
					}
				}else{
					//console.log("삭제 에러");
					if (confirmResult.isConfirmed) { // 만약 모달창에서 confirm 버튼을 눌렀다면
						Swal.fire('삭제 중 오류 발생.');
					 }
				}
			})
			.catch(err => console.log(err))
		 });

		// if(window.confirm("삭제 하시겠습니까?")){
		// 		axios.get('/api/boards/delete/' + id)
		// 		.then(res => {
		// 			if(res.data.Status === true){
		// 				console.log("삭제 확인");
		// 				//console.log("data2: ", res.data.results[0]);
		// 				//setBoard(res.data.results[0]);
		// 				res.send(`<script>alert('삭제 되었습니다.');location.href='/board'</script>`);
		// 			}else{
		// 				//setBoard(res.Message);
		// 				console.log("삭제 에러");
		// 				res.send(`<script>alert('삭제 중 오류 발생.');</script>`);
		// 			}
		// 		})
		// 		.catch(err => console.log(err))
	};

	//파일 다운로드
	const goFileDown = (id, order) => {
		console.log("ID: ", id);
		axios.get("/api/boards/attach/" + id + "/" + order)
		.then(res => {
			console.log(res);
			//if(res.data.Status === true){
				navigate(`/board/detail/${id}`);
			//}
		})
		.catch(err => console.log(err));
	};
	//console.log("boardPPPPP: ", board.data[0]);

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
							<td className="table-active">조회</td>
							<td>{board.board_read}</td>
						</tr>
						<tr>
							<td className="table-active">등록일</td>
							<td>{board.created_at}</td>
						</tr>
						<tr>
							<td className="table-active">내용</td>
							<td style={{ whiteSpace: 'pre-wrap'}}>{board.board_content}</td>
						</tr>
						{
							board.board_file1 ? 
						<tr>
							<td className="table-active">첨부파일</td>
							<td><a href={`/board/attach/${board.id}/1`}>{board.board_file1_ori}</a></td>
						</tr>
						: ""
						}
						{
							board.board_file2 ? 
						<tr>
							<td className="table-active">첨부파일</td>
							<td><a onClick={() => goFileDown(board.id, 2) }  href="#">{board.board_file2_ori}</a></td>
						</tr>
						: ""
						}
					</tbody>
				</table>

				{/* `/edit/${idx}` */}
				<div className="col text-right">
					<Button onClick={ goEdit } className="btn mb-2 mx-2" variant="success" type="button">수정</Button>
					<Button onClick={ goReply } className="btn mb-2 mx-2" variant="secondary" type="button">답변</Button>
					<Button className="btn mb-2 mx-2" variant="primary" type="button" onClick={ goList }>목록</Button>
					<Button className="btn mb-2 mx-2" variant="danger" type="button" onClick={() => goBoardDel(board.id) }>삭제</Button>
					{/* <BoardBtnDel /> */}
				</div>
			
			</div>
		</div>
	)
}

export default BoardView;