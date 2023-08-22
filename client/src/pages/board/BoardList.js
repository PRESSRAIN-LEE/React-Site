import React, {useEffect, useState, Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

import Board from '../../components/Board';

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

	  useEffect(() => {
			fetch('/api/boards')
				.then(res => res.json())
				.then(res => {
					//console.log(1, res);
					setBoards(res);
				})
				.catch(err => console.log(1, err));
			}, []);

	//render() {
	return (
	  <div className="d-flex justify-content-center align-items-center">
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
					<th scope="col">#</th>
					<th scope="col">제목</th>
					<th scope="col">이름</th>
					<th scope="col">등록일</th>
					<th scope="col">조회</th>
					<th scope="col">&nbsp;</th>
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
					/>
				))
			}

			</tbody>
		</table>
		<div className="d-flex justify-content-end">
			<Link className="btn btn-primary" to="/board/create" role="button">글쓰기</Link>
		</div>
		</div>
	  </div>
	)
	//}
}

export default Boards;