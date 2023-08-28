import React, {useEffect, useState, Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

import Board from '../../components/Board';
import Pagination from '../../components/Pagination';

import 'bootstrap/dist/css/bootstrap.min.css';

const Boards = () => {
//class Boards extends Component {	
	//생성자
	// constructor(props){
	// 	super(props);
	// 	this.state = {
	// 		boards: '',
	// 	  completed: 0
	// 	}
	//   }
	//   stateRefresh = () => {
	// 	//state를 초기화 시킴
	// 	this.setState({
	// 		boards: '',
	// 	  completed: 0
	// 	});
	// 	this.callApi()
	// 	  .then(res => this.setState({boards: res}))
	// 	  .catch(err => console.log(err));
	//   }
	
	//   componentDidMount() {
	// 	this.callApi()
	// 	  .then(res => this.setState({boards: res}))
	// 	  .catch(err => console.log(err));
	//   }
	
	//   callApi = async() => {
	// 	const response = await fetch('/api/boards');
	// 	const body = await response.json();
	// 	//console.log(body);
	// 	return body;
	//   }

	const [boards, setBoards] = useState([]);

	//페이징
	const [currentPage, setCurrentPage] = useState(1);
	const [boardPerPage] = useState(5);

	const [page, setPage] = useState(1); //페이지
	const limit = 10; // posts가 보일 최대한의 갯수
	const offset = (page-1)*limit; // 시작점과 끝점을 구하는 offset

	// const loadData = async () => {
	// 	const response = await axios.get('/api/boards');
	// 	setBoards(response.data);
	// };

	// useEffect(() => {
	// 	loadData();
	// }, []);

	useEffect(() => {
		fetch('/api/boards')
			.then(res => res.json())
			.then(data => {
				//console.log(1, data);
				setBoards(data);
			})
			.catch(err => console.log(1, err));
		}, []);

	//페이징
	const indexOfLast = currentPage * boardPerPage;
	const indexOfFirst = indexOfLast - boardPerPage;
	const currentBoards = boards.slice(indexOfFirst, indexOfLast);
	const paginate = (pageNumber) => setCurrentPage(pageNumber);
	
	//render() {
	return (
	  <div className="justify-content-center align-items-center">
	  	<div>
		<h1>목록</h1>
		
		<div className="row">
			<div className="col">
				총 100건 1/20페이지
			</div>
		</div>
		<table className="table table-striped table-hover">
			<thead>
				<tr>
					<th scope="col" className="col-1">#</th>
					<th scope="col">제목</th>
					<th scope="col" className="col-1">이름</th>
					<th scope="col" className="col-1">등록일</th>
					<th scope="col" className="col-1">조회</th>
					<th scope="col" className="col-2">&nbsp;</th>
				</tr>
			</thead>
			<tbody>
			{
				// this.state.boards ? this.state.boards.map(b => {
				// 	return(
				// 		<Board
				// 			stateRefresh={this.stateRefresh}
				// 			key = {b.id}    //map을 사용하면 key값은 필수(unique)
				// 			id = {b.id}
				// 			name = {b.member_name}
				// 			title = {b.board_title}
				// 			regDate = {b.created_at}
				// 			ref_step = {b.ref_step}
				// 		/>
				// 		);
				// 	})
				// : "&nbsp;"
			}

			{
				boards.map(b => (
					<Board
						key = {b.id}    //map을 사용하면 key값은 필수(unique)
						id = {b.id}
						name = {b.member_name}
						title = {b.board_title}
						regDate = {b.created_at}
						read = {b.board_read}
						ref_level = {b.ref_level}
						ref_step = {b.ref_step}
						stateRefresh={boards}
					/>
				))
			}
			</tbody>
		</table>

		{/* <Pagination /> */}
		<Pagination boardsPerPage={boardPerPage} totalBoards={boards.length} currentPage={currentPage} paginate={paginate}></Pagination>
		{/* <Pagination boardsPerPage={boardPerPage} totalBoards={boards.length} paginate={setCurrentPage}></Pagination> */}
		{/* <Pagination limit={limit} page={page} totalBoards={boards.length} setPage={setPage}/> */}

		<div className="d-flex justify-content-end">
			<Link className="btn btn-primary" to="/board/create" role="button">글쓰기</Link>
		</div>
		</div>
	  </div>
	)
	//}
}

export default Boards;