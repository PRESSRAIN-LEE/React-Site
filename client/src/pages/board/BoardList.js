import React, {useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import queryString from 'query-string';

//import Board from '../../components/Board';
//import Pagination from '../../components/Pagination';
//import Pagination from '../../components/Pagination1';
import Pagination from 'react-js-pagination'
//import ReactPaginate from 'react-paginate';

//import Search from '../../components/Search1';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';

function Boards(){
	const navigate = useNavigate();
	const [inputs, setInputs] = useState({
		queryItem: "",
		queryText: "",
	});
	const { queryItem, queryText } = inputs;
	console.log("queryText: ", queryText);

	useEffect(() => {
		const fetchData = async () => {
			 axios.get(`/api/boards${window.location.search}`)
			.then(res => {
				if(res.data.Status === "SUCCESS"){
					setData(res.data.Results[0]);
					setBoardCount(res.data.Results[1][0].CNT);
					setPageSize(res.data.pagination[0].pageSize);
					setCurrentPage(Number(res.data.pagination[0].currentPage));
					//setPage(Number(res.data.pagination[0].currentPage));
					setPageBlock(res.data.pagination[0].pageBlock);
					
					//setBoardListNum(boardCount - (pageSize * (page - 1)));
					//setBoardListNum(res.data.Results[1][0].CNT - (res.data.pagination[0].pageSize * (res.data.pagination[0].currentPage)));
					setBoardListNum1(res.data.Results[1][0].CNT);
					setBoardListNum2(res.data.pagination[0].pageSize)
					setBoardListNum3(res.data.pagination[0].currentPage);

					setTotalPageCount(res.data.pagination[0].totalPageCount);
					//setPageNumbers(res.data.pagination[0].pageNumbers);

					//setSearch()
					//console.log("inputs: ", inputs);
				}else{
					//
				}
			})
			.catch(err => console.log(err));
		};
		fetchData();
	}, []);

	const [data, setData] = useState([]);

	//const [pagination, setPagination] = useState([]);			//pagination
	const [pageSize, setPageSize] = useState(10);				//한페이지에 보여줄 리스트 row수(기본 10개) - router에서 설정
	const [currentPage, setCurrentPage] = useState(1);			//현재 페이지 숫자
	const [pageBlock, setPageBlock] = useState(10);				//한페이지에 보여줄 페이징 갯수(기본 10)
	const [totalPageCount, setTotalPageCount] = useState(0);		//전체 페이지 수
	const [boardCount, setBoardCount] = useState(0);				//전체게시 글 수
	//const [pageNumbers, setPageNumbers] = useState(0);			//페이지 숫자들

	//const [page, setPage] = useState(1);

	//const [boardListNum, setBoardListNum] = useState();			//리스트 글번호
	const [boardListNum1, setBoardListNum1] = useState();			//리스트 글번호
	const [boardListNum2, setBoardListNum2] = useState();			//리스트 글번호
	const [boardListNum3, setBoardListNum3] = useState();			//리스트 글번호
	
	//const [search, setSearch] = useState([]);			//리스트 검색

	//const [queryItem, setQueryItem] = useState("");
	//const [queryText, setQueryText] = useState("");
	

	// useEffect(() => {
	// }, [currentPage]);

	//if (boardCount <= 20) return; 

	//console.log("currentPage1: ", currentPage)
	// console.log("pageGroup: ", pageGroup);
	// console.log("totalPage: ", totalPage);
	// console.log("first: ", first);
	// console.log("last: ", last);
	// console.log("next: ", next);
	// console.log("prev: ", prev);
	// console.log("===================================");

	// if (prev > 0) {
	// 	console.log("A");
	// }
	//for (var i = first; i <= last; i++) {
		//console.log("C"+i);
	//}
	// if (last < totalPage) {
	// 	console.log("C");
	// }

	// const pagePrev = () => {
	// 	<li className="page-item">
	// 		<a className="page-link" href="#" aria-label="Previous">
	// 			<span aria-hidden="true">&laquo;</span>
	// 		</a>
	// 	</li>
	// };
	// const pageNumber = () => {
	// 	const result = [];
	// 	// for (var i = 0; i < first; i++) {
	// 	// 	result.push(
	// 	// 		<li className="page-item" key={i}>
	// 	// 			<a className="page-link" href="#" aria-label="Previous">
	// 	// 				<span aria-hidden="true">&laquo;</span>
	// 	// 			</a>
	// 	// 		</li>
	// 	// 	);
	// 	// }
	// 	for (var i = first; i <= last; i++) {
	// 		result.push(
	// 			<li className="page-item" key={i}>
	// 				<a href="#" className="page-link">{i}</a>
	// 			</li>
	// 		);
			
	// 	}

	// 	// for (var i = last; i <= last; i++) {
	// 	// 	result.push(
	// 	// 		<li className="page-item" key={i}>
	// 	// 			<a className="page-link" href="#" aria-label="Next">
	// 	// 				<span aria-hidden="true">&raquo;</span>
	// 	// 			</a>
	// 	// 		</li>
	// 	// 	);
	// 	// }
	// 	return result;
	// };

	// useEffect(() => {
	// 	pageNumber()
	// }, []);

	// const pageNext = () => {
	// 	//
	// };
	
	const queryObj = queryString.parse(window.location.search);
	const { id, page } = queryObj;
	console.log("id: ", id);

	// const loadData = async () => {
	// 	const response = await axios.get('/api/boards');
	// 	setBoards(response.data);
	// };

	const onChangeInput = (e) =>{
		e.preventDefault();
		const { value, name } = e.target;
		// const nextInputs = {
		// 	...inputs,
		// 	[name]: value,
		// };
		// setInputs(nextInputs);
		setInputs((inputs) => {
			return {...inputs, [name]: value};
		});
	};

	const onSearch = () =>{
		//console.log("queryText: ", queryText);
		window.location.href=`/board?queryItem=${queryItem}&queryText=${queryText}`;
	}

	const goView = (id) => {
		//window.location.href=`/hit?id=${id}`
		console.log("ID: ", id);
		axios.get("/api/boards/hit/" + id)
		.then(res => {
			console.log(res);
			//navigate('/board');
			if(res.data.Status === true){
				navigate(`/board/detail/${id}`);
			}
		})
		.catch(err => console.log(err));
	}
	const goEdit = () => {}

	const pageClick = (page) => {
		setCurrentPage(page);
		//setCurrentPage((page) => Number(page)+1);
		window.location.href=`/board?page=${page}`
	}

	//const handlePageChange = (page) => { setCurrentPage(page); };

	return (
	  <div className="justify-content-center align-items-center">
	  	<div>
		<h1>목록</h1>
		
		{/* //https://onethejay.tistory.com/196 */}

		{/* <Search/> */}
		<div>
			<Form.Select name="queryItem" id="queryItem" onChange={ onChangeInput } className="mb-3">
				<option value="">-선택-</option>
				<option value="title">제목</option>
				<option value="contents">내용</option>
			</Form.Select>
			<Form.Control className="form-inline" type="text" placeholder="Normal text" name="queryText" value={queryText} id="queryText" onChange={ onChangeInput } />
			<Button variant="primary" onClick={onSearch} >검색</Button>
		</div>

{queryText}

		<div className="row">
			<div className="col">
				총 {boardCount}건 {currentPage} / {totalPageCount}페이지
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
				data.map((board, index) => {
					return <tr key={index}>
						<td>{boardListNum1 - (boardListNum2 * (boardListNum3 - 1)) - index}</td>
						<td>
							{
								board.ref_step > 0 ?
									[...Array(parseInt(board.ref_level))].map((n, index) => {
										return <span style={{ whiteSpace: 'pre-wrap'}} key={index}> { " " } </span>
									})
								
									: ""
							}
							{/* <Link to={`/board/detail/${props.id}`}> */}
							<Link onClick={() => goView(board.id) } to="">
							{/* <Link onClick={ addHit } to={`/board/detail/${ board.id }`}></Link> */}
								{
									board.ref_level > 0 ? '답변: ' + board.board_title : board.board_title
								}
							</Link>
						</td>
						<td>{ board.M_NAME }</td>
						<td>{ board.created_at }</td>
						<td>{ board.board_read }</td>
						<td>
							<Button size="sm" type="button" className="btn mb-2 mx-1" variant="success" onClick={ goEdit }>수정</Button>
							{/* <BoardBtnDel 
								stateRefresh={board.stateRefresh} 
								id={board.id}
							/> */}
						</td>
					</tr>
				})}
			</tbody>
		</table>

		{/* <ReactPaginate
			previousLabel={"previous"}
			nextLabel={"next"}
			breakLabel={"..."}
			pageCount={25}
			marginPagesDisplayed={2}
			pageRangeDisplayed={6}
			onPageChange={handlePageClick}
			containerClassName={'pagination justify-content-center'}
			pageClassName={'page-item'}
			pageLinkClassName={'page-link'}
			previousClassName={'page-item'}
			previousLinkClassName={'page-link'}
			nextClassName={'page-item'}
			nextLinkClassName={'page-link'}
			breakLinkClassName={'page-link'}
			activeClassName={'active'}
			//renderOnZeroPageCount={null}
		/> */}

		{/* 페이징 */}
		<nav aria-label="Page navigation example">
			<ul className="pagination justify-content-center">
				{/* <li className="page-item">
					<a className="page-link" href="#" aria-label="Previous">
						<span aria-hidden="true">&laquo;</span>
					</a>
				</li> */}
				{
					// numbers.map((n, i) => (
					// 	<li className={`page-item  ${currentPage === (n+1) ? "active" : ""}`} key={i} >
					// 		<a href="#" className="page-link">{n}</a>
					// 	</li>
					// ))
				}

				{/* <li className="page-item">
					<a className="page-link" href="#" aria-label="Next">
						<span aria-hidden="true">&raquo;</span>
					</a>
				</li> */}

				{/* {pageNumber()} */}

				{/* {pageNumbers.map(number => (
					<li key={number} className="page-item"> */}
						{/* <a onClick={() => paginate(number)} className="page-link" style={currentPage == number ? {color: '#17a2b8'} : null}>
							{number}
						</a> */}
					{/* </li>
				))}
			 */}
				{/* <li className="page-item">
					<a className="page-link" href="#" aria-label="Previous">
					<span aria-hidden="true">&laquo;</span>
					</a>
				</li>
				<li className="page-item"><a className="page-link" href="/board?page=1">1</a></li>
				<li className="page-item"><a className="page-link" href="/board?page=2">2</a></li>
				<li className="page-item"><a className="page-link" href="/board?page=3">3</a></li> */}
				{/* <li className="page-item">
				<a className="page-link" href="#" aria-label="Next">
					<span aria-hidden="true">&raquo;</span>
				</a>
				</li> */}
			</ul>
		</nav>

		<Pagination
          activePage={currentPage}
          //activePage={page}
          itemsCountPerPage={pageSize}
          totalItemsCount={boardCount}
          pageRangeDisplayed={pageBlock}
		  activeLinkClass = {"active"}
		  activeClass = {"active"}
		  innerClass = {"pagination justify-content-center"}
		  itemClass = {"page-item"}
		  //itemClassFirst = {"page-link"}
		  //itemClassPrev = {"page-link"}
		  //itemClassLast = {"page-link"}
		  //itemClassNext = {"page-link"}
		  disabledClass = {"disabled"}
		  linkClass = {"page-link"}
		  linkClassFirst = {"page-link"}
		  linkClassPrev = {"page-link"}
		  linkClassNext = {"page-link"}
		  linkClassLast = {"page-link"}
		  firstPageText = {"처음"}
		  prevPageText = {"이전"}
		  nextPageText = {"다음"}
		  lastPageText = {"마지막"}
		  hideFirstLastPages = {false}
          onChange={pageClick}>
          {/* onChange={handlePageChange} */}
        </Pagination>

		{/* 페이징: <Pagination
        pageBlock={pageBlock}
		page={currentPage}
		pageSize = {pageSize}
		boardCount = {boardCount}
		totalPageCount = {totalPageCount}
		
		// totalBoards={boards.length}
		// pageClick={pageClick}

		//page_size={boardPerPage}
      ></Pagination> */}

		<div className="d-flex justify-content-end">
			<Link className="btn btn-primary" to="/board/create" role="button">글쓰기</Link>
		</div>
		</div>
	  </div>
	)
}

export default Boards;