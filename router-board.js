//const fs = require('fs');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');

const uploadDir = path.join(__dirname, '../../upload/board');
var mime = require('mime');
const fs = require('fs');


const app = express();
const port = process.env.PORT || 5000;

var router = express.Router();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const multer = require('multer');		//multer객체 사용(라이브러리 불러옴)
const upload = multer({dest: './upload'});	//루트에 upload폴더

//DB연결 설정
const mysqlConn = require('./db/DbConn')();
const db = mysqlConn.init();

//목록
router.get('/', (req, res) => {
	//res.send('/api/boards');
	//res.send({message: 'Hello Members!'});
	//console.log(req.body);

	//const queryObj = queryString.parse(window.location.search);
	//const { queryText } = queryObj;
	//console.log("queryText: ", queryText);
	//console.log("location.search:", location.search);

	// const { page, page_size } = req.query;
	// let start_limit = 0;	// 1페이지는 무조건 0부터 시작
	// let end_limit = page_size;
	// if (page === "" || page === undefined || typeof page === "undefined" || page === null) {
	// 	//const start_limit = 0 * page_size;
	// }else{
	// 	start_limit = (page - 1) * page_size;
	// }
	
	// console.log("list-(start_limit, page_size)", start_limit, ", ", end_limit);

	let {queryItem, queryText, page} = req.query;
	if(!queryItem || queryItem === "undefined"){
		searchItem = "";
	}else{
		searchItem = queryItem ? queryItem : "";
	}
	if(!queryText || queryText === "undefined"){
		searchText = "";
	}else{
		searchText = queryText ? queryText : "";
	}
	currentPage = page ? page : 1;

	console.log("searchItem: ", searchItem);
	console.log("searchText: ", searchText);

	const pageSize = 5;	//한페이지에 보여줄 리스트 row수
	const pageBlock = 5;	//한페이지에 보여줄 페이징 갯수
	let startLimit = 0;
	if (currentPage === "" || currentPage === undefined || typeof currentPage === "undefined" || currentPage === null) {
		startLimit = 0 * pageSize; 	// 1페이지는 무조건 0부터 시작
	}else{
		startLimit = (currentPage - 1) * pageSize; // 1페이지는 무조건 0부터 시작
	}
	console.log("req.query : ", req.query);

	let subSql = "";
	switch (searchItem){
		case "title":
			subSql += "AND INSTR(board_title, ?) > 0 ";
			break;
		case "contents":
			subSql += "AND INSTR(board_content, ?) > 0 ";
			break;
		default:
			subSql += "AND (INSTR(board_title, ?) > 0 ";
			subSql += "		OR INSTR(board_content, ?) > 0) ";
	}
	
	let sql = "";
		sql += "SELECT id, ref_level, ref_step, board_title, board_read, board_file1, board_file2, DATE_FORMAT(created_at, '%Y-%m-%d') AS created_at";
		sql += ", M_ID, M_NAME ";
		sql += "	FROM TBL_BOARD A INNER JOIN TBL_MEMBER B ON A.member_seq = B.M_SEQ "
		sql += "	WHERE 1 = 1 ";
		sql += "	AND board_state = 'Y' ";
		//sql += "	AND INSTR(board_title, ?) > 0 "
		sql += 		subSql;
		sql += "	ORDER BY ref DESC, ref_level ASC, id DESC ";
		sql += "	LIMIT ?, ? ";

	let sql2 = "; ";
		sql2 += "SELECT COUNT(*) CNT ";
		sql2 += "FROM TBL_BOARD A INNER JOIN TBL_MEMBER B ON A.member_seq = B.M_SEQ  ";
		sql2 += "WHERE 1 = 1 ";
		sql2 += "AND board_state = 'Y' ";
		//sql2 += "AND INSTR(board_title, ?) > 0 ";
		sql2 += subSql;

		let sqlParams = [];
		if(searchItem){
			sqlParams = [searchText, startLimit, pageSize, searchText];
		}else{
			sqlParams = [searchText, searchText, startLimit, pageSize, searchText, searchText];
		}

		db.query(sql + sql2, sqlParams, (err, rows, fields) => {	//rows에 디비내용을 저장
			const totalPageCount = Math.ceil(rows[1][0].CNT/pageSize);
			let pageNumbers = [];
			for (var i=0; i< totalPageCount; i++){
			//for (var data of totalPageCount){
				pageNumbers.push(i);
			};
			//console.log("A: ", pageNumbers);

			if(err) return res.json({Error: "SQL QUERY ERROR"});
			return res.json({
				Status: "SUCCESS", 
				Results: rows,
				pagination: [{
					pageSize: pageSize,
					pageBlock: pageBlock,
					totalPageCount: Number(totalPageCount),
					currentPage: currentPage,
					pageBlock: pageBlock,
					pageNumbers: pageNumbers,
				}],
				Search: [{
					queryItem: searchItem,
					queryText: searchText,
				}]
			});
			// if(err){
			// 	console.log("DB 에러");
			// 	//console.log(err);
			// }else{
			// 	//console.log(rows);
			// 	res.send(rows);
			// };
		}
	);
});

//글 카운트 - 사용안함
router.get('/count', (req, res) => {
	const sql = `
		SELECT COUNT(*) TOTAL_COUNT
		FROM TBL_BOARD 
		WHERE 1 = 1 
		AND board_state = 'Y' 
		`;
		db.query(sql, (err, result, fields) => {
			if(err) return res.json({Error: "SQL QUERY ERROR"});
			return res.json(result);
			//console.log("result: ", result);
			
		// if(err){
		// 	console.log("DB연결 실패");
		// 	// console.log(err);
		// }else{
		// 	//console.log("rows: ", rows);
		// 	res.send(rows);
		// };
	});
});

//검색
//router.get('/search', (req, res) => {
//});

//글쓰기 (계층형 게시판 구현)
router.get('/create', (req, res) => {
	const sql = `
		SELECT IFNULL(MAX(ref), 0) + 1 AS ref, 0 AS ref_step, 0 AS ref_level, 1 AS member_seq 
		FROM TBL_BOARD 
		WHERE 1 = 1 
		`;
	db.query(sql, (err, rows, fields) => {	//rows에 디비내용을 저장
		if(err){
			console.log("DB 실패");
			// console.log(err);
		}else{
			//console.log(rows);
			res.send(rows);
		};
	});
});

//글쓰기 저장
router.post('/save', (req, res) => {
	//console.log(10, req.body.ref);
	console.log(1, req.body.ref_level);
	console.log(2, req.body.ref_step);
	const sql = `
			INSERT INTO TBL_BOARD (ref, ref_level, ref_step, member_seq, member_name, board_title, board_content)
			VALUES (?)
		`
	const values = [
		req.body.ref,
		req.body.ref_level,
		req.body.ref_step,
		req.body.member_seq,
		req.body.member_name,
		req.body.board_title,
		req.body.board_content
	]
	db.query(sql, [values], (err, result) => {
		//if(err) return res.json(err);
		if(err) return res.json({Message: "ERROR"});
		return res.json(result);
		//console.log(err);
	})
});

//조횟수 증가
 router.get('/hit/:idx', (req, res) => {
	//console.log(1, "id=====================");
	//res.render("./pages/board/BoardList");
 	const id = req.params.idx;
	//console.log(1, id);
	const up_sql = `UPDATE TBL_BOARD SET 
				board_read = board_read + 1 
				WHERE id = ? `;
	//console.log(1, id);
	db.query(up_sql, [id], (err, result) => {
		if(err) return res.json({Message: "Error!!"});
		//return res.json(result);
		//res.send(`/board/detail/${id}`);
		//navigate('/board');
		res.send({Status: true, data: result});
		//console.log(2, result);
	});
 });

//읽기
router.get('/detail/:idx', (req, res) => {
	const id = req.params.idx;
	 const sql = `
			SELECT *, DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') AS created_at 
			FROM TBL_BOARD 
			WHERE 1 = 1 
			AND id = ?
			`;
	 db.query(sql, [id], (err, rows, fields) => {	//rows에 디비내용을 저장
		if(err) return res.json({Message: "Error!!"});
		res.send({Status: true, results: rows});
	 		// if(err){
	 		// 	console.log("DB 실패");
	 		// 	// console.log(err);
	 		// }else{
	 		// 	//console.log(rows);
	 		// 	res.send(rows);
	 		// };
	 	}
	 );
});

//첨부파일 다운로드
router.get('/attach/:id/:order', (req, res) => {
	const { id, order } = req.params;
	const upload_folder = 'upload/board/';
	var getDownloadFilename = require('./lib/getDownloadFilename').getDownloadFilename;
	
	//테이블에서 seq로 파일 검색
	const sql = `SELECT board_file1, board_file1_ori, board_file2, board_file2_ori FROM TBL_BOARD WHERE id = ? `
	db.query(sql, [id], (err, results) => {
		//if(err) throw err;
		try {
			let file1 = upload_folder + results[0].board_file1;
			let file1Ori = upload_folder + results[0].board_file1_ori;
			let file2 = upload_folder + results[0].board_file2;
			let file2Ori = upload_folder + results[0].board_file2_ori;

			let file = "";
			let fileOri = "";
			switch(order){
				case "1":
					file = file1;
					fileOri = file1Ori;
					break;
				case "2":
					file = file2;
					fileOri = file2Ori;
					break;
			}
			if (fs.existsSync(file)) { // 파일이 존재하는지 체크
				var filename = path.basename(fileOri);	// 파일 경로에서 파일명(확장자포함)만 추출
				var mimetype = mime.getType(file);		// 파일의 타입(형식)을 가져옴

				//res.setHeader('Content-disposition', 'attachment; filename=' + filename1Ori); // 다운받아질 파일명 설정
				res.setHeader('Content-disposition', 'attachment; filename=' + getDownloadFilename(req, filename)); // 다운받아질 파일명 설정
				res.setHeader('Content-type', mimetype); // 파일 형식 지정

				var filestream = fs.createReadStream(file);
				filestream.pipe(res);
			}else{
				res.send('해당 파일이 없습니다.');  
				return;
			}
		}catch(e){
			console.log(e);
			res.send('파일을 다운로드하는 중에 에러가 발생하였습니다.');
			return;
		}
	});
});

//첨부파일 삭제
router.get('/fileDelete/:id/:order', (req, res) => {
});


//수정페이지 이동
router.get('/edit/:idx', (req, res) => {
	const id = req.params.idx;
	const sql = `
			SELECT * 
			FROM TBL_BOARD 
			WHERE 1 = 1 
			AND id = ?
			`;
	db.query(sql, [id], (err, rows, fields) => {	//rows에 디비내용을 저장
	 		if(err){
	 			console.log("DB 실패");
	 			// console.log(err);
	 		}else{
	 			//console.log(rows);
	 			res.send(rows);
	 		};
	 	}
	);
});

//수정-저장
router.put('/update/:idx', (req, res) => {
	//console.log("저장");	//VS터미널 출력창에 출력

	const id = req.params.idx;
	const { member_name, board_title, board_content } = req.body;

	const sql = `UPDATE TBL_BOARD SET 
					member_name = ?
					, board_title = ?
					, board_content = ?
				WHERE id = ? `;
	db.query(sql, [member_name, 
							board_title,
							board_content,
							id], (err, result) => {
		if(err) return res.json({Message: "ERROR"});
		return res.json(result);
		//console.log("err", err);
		//res.send(`/${id}`);
	});
});

//답변 페이지 이동
router.get('/reply/:idx', (req, res) => {
	const id = req.params.idx;
	const sql = `
			SELECT * 
			FROM TBL_BOARD 
			WHERE 1 = 1 
			AND id = ?
		`;
	db.query(sql, [id], (err, rows, fields) => {	//rows에 디비내용을 저장
		if(err){
			console.log("DB 실패");
			// console.log(err);
		}else{
			//console.log(rows);
			res.send(rows);
		};
	});
});

//글쓰기- 답변 저장
router.post('/replySave/:idx', (req, res) => {
	const id = req.params.idx;
	const { member_seq, member_name, board_title, board_content } = req.body;

	//console.log(10, req.body.ref);
	//console.log('ref', ref);
	//console.log('ref_level', ref_level + 1);
	//console.log('ref_step', ref_step + 1);
	//console.log('id', id);

	//답변용 업데이트
	const sql_select = "SELECT * FROM TBL_BOARD WHERE 1 = 1 AND id = ? "
	db.query(sql_select, [id], (err, result) => {
		refTemp = result[0].ref;
		ref_stepTemp = result[0].ref_step;
		ref_levelTemp = result[0].ref_level;

		//result_1 = res.json(result);
		//console.log('result: ', result_1);
		//console.log('ref: ', result[0].ref);
		//console.log('ref_step', ref_stepTemp);
		//console.log('ref_level', ref_levelTemp);

		const sql_reply = "UPDATE TBL_BOARD SET ref_step = ref_step + 1 WHERE ref_step > ? AND ref = ? "
		db.query(sql_reply, [ref_stepTemp, refTemp], (err, result) => {
			if(err) return res.json({Message: "ERROR"});
			//return res.json(result);
			//console.log("err:", err);
		});

		ref_level_1 = ref_levelTemp + 1;
		ref_step_1 = ref_stepTemp + 1;
		//console.log("ref_level_1: ", ref_level_1);
		//console.log("ref_step_1: ", ref_step_1);
	
		const sql = `
				INSERT INTO TBL_BOARD (ref, ref_level, ref_step, member_seq, member_name, board_title, board_content)
				VALUES (?)
			`
		const values = [
			//req.body.ref,
			refTemp,
			ref_level_1,
			ref_step_1,
			member_seq,
			member_name,
			board_title,
			board_content
		]
		db.query(sql, [values], (err, result) => {
			//if(err) return res.json(err);
			if(err) return res.json({Message: "ERROR"});
			return res.json(result);
			//console.log(err);
		});
	});
});


//삭제
//참고 동영상: https://www.youtube.com/watch?v=y5NvOade3sk
router.get('/delete/:idx', (req, res) => {
	const id = req.params.idx;
	//console.log(id);

	const up_sql = `UPDATE TBL_BOARD SET 
				board_state = 'N' 
				WHERE id = ? `;
		db.query(up_sql, [id], (err, result) => {
		if(err) return res.json({Message: "ERROR"});
		res.send({Status: true, results: result});
		//return res.json(result);
		//console.log("result : " + (err));
	});
});

module.exports = router;