import React, { Component, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import Button from 'react-bootstrap/Button';

function BoardReply() {
	const navigate = useNavigate();

	//const [board, setBoard] = useState([]);
	const {idx} = useParams();

	useEffect(() => {
		axios.get('/api/boards/detail/' + idx)
		.then(res => {
			//console.log(1, res);
			//setBoard(res.data[0]);
			setValues ({
				...values,
				board_title: res.data[0].board_title,
				board_content: res.data[0].board_content,
				member_name: res.data[0].member_name,
				ref: res.data[0].ref,
				ref_step: res.data[0].ref_step,
				ref_level: res.data[0].ref_level,
			});
		})
		.catch(err => console.log(err))
	}, [idx]);

	const [values, setValues] = useState({
		board_title: '',
		board_content: '',
		member_seq: '2',
		member_name: '',
		ref: '',
		ref_step: '',
		ref_level: '',
	});

	const goList = () => {
		navigate("/board");
	}

	const changeValue = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value
		});
	}

	const saveBoard = (e) => {
		e.preventDefault();
		axios.post('/api/boards/replySave/' + idx, values)
		.then(res => {
			console.log(2, res);
			navigate('/board');
		})
		.catch(err => console.log(err));
	}

	return (
		<div className="justify-content-center align-items-center">
		<div className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
			<h3>글 답변</h3>
			<form onSubmit={saveBoard}>
				<input type='HIDDEN' name='member_seq' onChange={ changeValue } value={values.member_seq}/>		{/* 회원SEQ */}

				<table className="table table-bordered">
					<tbody>
						<tr>
							<td className="col-3 table-active">이름</td>
							<td className='col-9'>
								<input className="form-control col-12 w-100" type="text" required placeholder='이름' name="member_name" onChange={ e => setValues({...values, member_name: e.target.value})} value={values.member_name}/>
								<div className="invalid-feedback">이름을 입력하세요.</div>
							</td>
						</tr>
						<tr>
							<td className="col-3 table-active">제목</td>
							<td className='col-9'>
								<input className="form-control col-12 w-100" type="text" name='board_title' required placeholder='제목' onChange={ changeValue } value={ values.board_title}/>
								<div className="invalid-feedback">제목을 입력하세요.</div>
							</td>
						</tr>
						<tr>
							<td className="table-active">내용</td>
							<td>
								<textarea className="form-control w-100" rows={5} name='board_content' required onChange={ changeValue } defaultValue={values.board_content}></textarea>
								<div className="invalid-feedback">내용을 입력하세요.</div>
							</td>
						</tr>
						<tr>
							<td className="table-active">첨부파일</td>
							<td><input className="form-control-upload col-6" type="file" name=''/></td>
						</tr>
					</tbody>
				</table>

				<div className="col text-right">
					<Button size="sm" className="btn mb-2 mx-1" type="submit" variant="success">저장</Button>
					<Button size="sm" className="btn mb-2 mx-1" type="button" onClick={goList} variant="primary">목록</Button>
				</div>
			</form>
		</div>
	</div>
	)
}

export default BoardReply;
