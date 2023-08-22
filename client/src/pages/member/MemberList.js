import React, {useEffect, useState, Component } from 'react';
import axios from "axios";

import Member from '../../components/Member';


//const MemberList = () => {
class MemberList extends Component {	
	
	//생성자
	constructor(props){
		super(props);
		this.state = {
		  members: '',
		  completed: 0
		}
	  }
	
	  stateRefresh = () => {
		//state를 초기화 시킴
		this.setState({
			members: '',
		  completed: 0
		});
		this.callApi()
		  .then(res => this.setState({members: res}))
		  .catch(err => console.log(err));
	  }
	
	  componentDidMount() {
		this.callApi()
		  .then(res => this.setState({members: res}))
		  .catch(err => console.log(err));
	  }
	
	  callApi = async() => {
		const response = await fetch('/api/users');
		const body = await response.json();
		//console.log(body);
		return body;

		/*
		const response = await axios.get('http://localhost:5000/api/user');
		const body = await response.data;
		console.log(body);
		return body;
		*/
	  }
	  

	//   const [members, setMembers] = useState([]);

	//   useEffect(() => {
	// 		fetch('http://localhost:5000/api/user')
	// 			.then(res => res.json())
	// 			.then(res => {
	// 				//console.log(1, res);
	// 				setMembers(res);
	// 			});
	// 		}, []);

	render() {
		return(
			<div>
				<h1>Member목록</h1>

				<table className="table table-striped table-hover">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">이름</th>
							<th scope="col">직업</th>
							<th scope="col">생년월일</th>
							<th scope="col">성별</th>
							<th scope="col">Handle</th>
						</tr>
					</thead>
					<tbody>
						{
							// members.map(m => (
							// 	<Member
						 	// 		key = {m.id}    //map을 사용하면 key값은 필수(unique)
						 	// 		id = {m.id}
						 	// 		image = {m.image}
						 	// 		name = {m.name}
						 	// 		birthday = {m.birthday}
						 	// 		gender = {m.gender}
						 	// 		job = {m.job}
						 	// 	/>
							// ))
						}
					{
						this.state.members ? this.state.members.map(m => {
							return(
								<Member
									stateRefresh={this.stateRefresh}
									key = {m.id}    //map을 사용하면 key값은 필수(unique)
									id = {m.id}
									image = {m.image}
									name = {m.name}
									birthday = {m.birthday}
									gender = {m.gender}
									job = {m.job}
								/>
								);
							})
						: ""
					}
					</tbody>
				</table>
				<button type="button" className="btn btn-primary">글쓰기</button>
				<button type="button" className="btn btn-secondary">수정하기</button>
				<button type="button" className="btn btn-danger">삭제하기</button>
			</div>
		);
	}
}

export default MemberList;