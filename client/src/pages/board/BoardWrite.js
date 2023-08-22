import React, { useState } from "react";
import axios from "axios";

const WriteForm = () => {
	const [values, setValues] = useState({
		board_title: '',
		board_contents: '',
		ref: '0',
		ref_step: '0',
		ref_level: '0',
	});

	const changeValue = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value
		});
	}

	const saveBoard = (e) => {
		e.preventDefault();		//submit이 action을 타지 않고 자기 할일을 그만 한다.
		axios.post("/api/boards/save", values)
		.then(res => console.log(res))
		.catch(err => console.log(err));
		

		// fetch("https://localhost:5000/api/boards", {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-type": "application/json; charset=utf-8"
		// 	},
		// 	body:JSON.stringify(values)
		// })
		// .then(res => res.json())
		// .then(res => {
		// 	console.log(res);
		// });
	}

	return (
		<div className="d-flex justify-content-center align-items-center">
			<div className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
				<h3>글쓰기</h3>
				<form className="form-inline needs-validation" noValidate onSubmit={saveBoard}>
					<input type='TEXT' name='ref' onChange={ changeValue } value='0'/>
					<input type='TEXT' name='ref_step' onChange={ changeValue }/>
					<input type='TEXT' name='ref_level' onChange={ changeValue }/>
					<table className="table table-bordered">
						<tbody>
							<tr>
								<td className="col-3 table-active">제목</td>
								<td className='col-9'>
									<input className="form-control col-12 w-100" type="text" name='board_title' required placeholder='제목' onChange={ changeValue }/>
									<div className="invalid-feedback">제목을 입력하세요.</div>
								</td>
							</tr>
							<tr>
								<td className="table-active">내용</td>
								<td>
									<textarea className="form-control w-100" rows="3" name='board_contents' required onChange={ changeValue }></textarea>
									<div className="invalid-feedback">내용을 입력하세요.</div>
								</td>
							</tr>
							<tr>
								<td className="table-active">첨부파일</td>
								<td><input className="form-control-upload col-6" type="file" name=''/></td>
							</tr>
						</tbody>
					</table>

					<div className="col text-left">
						<button className="btn btn-danger mb-2" type="button">삭제</button>
					</div>

					<div className="col text-right">
						<button className="btn btn-primary mb-2" type="submit">저장</button>
						<button className="btn btn-outline-primary mb-2" type="button">목록</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default WriteForm;