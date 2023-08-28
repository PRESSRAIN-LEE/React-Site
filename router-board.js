const fs = require('fs');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

var router = express.Router();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const multer = require('multer');		//multer객체 사용(라이브러리 불러옴)
const upload = multer({dest: './upload'});	//루트에 upload폴더


//DB연결 설정
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');	//mysql 라이브러리

const connection = mysql.createConnection({
	"host": conf.host,
	"user": conf.user,
	"password": conf.password,
	"port": conf.port,
	"database": conf.database
});
connection.connect();		//실제 연결

//목록
router.get('/', (req, res) => {
	//res.send('/api/boards');
	//res.send({message: 'Hello Members!'});
	//console.log(req.body);

	const sql = `
			SELECT id, member_name, board_title, board_read, DATE_FORMAT(created_at, '%Y-%m-%d') AS created_at 
			, ref, ref_level, ref_step
			FROM TBL_BOARD 
			WHERE 1 = 1
			AND board_state = 'Y' 
			ORDER BY ref DESC, ref_level ASC, id DESC
			LIMIT 0, 10;
		`;
	connection.query(sql, (err, rows, fields) => {	//rows에 디비내용을 저장
			if(err){
				console.log("DB 실패");
				// console.log(err);
			}else{
				//console.log(rows);
				res.send(rows);
			};
		}
	);

	/*
	const sql = "SELECT * FROM CUSTOMER WHERE isDeleted = 0";
	connection.query(sql, (err, rows, fields) => {
		console.log("err", err);
		console.log("rows", rows);
		console.log("fields", fields);
	});*/
});

//글쓰기 (계층형 게시판 구현)
router.get('/create', (req, res) => {
	const sql = `
		SELECT IFNULL(MAX(ref), 0) + 1 AS ref, 0 AS ref_step, 0 AS ref_level, 1 AS member_seq 
		FROM TBL_BOARD 
		WHERE 1 = 1 
		`;
	connection.query(sql, (err, rows, fields) => {	//rows에 디비내용을 저장
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
	connection.query(sql, [values], (err, result) => {
		//if(err) return res.json(err);
		if(err) return res.json({Message: "ERROR"});
		return res.json(result);
		//console.log(err);
	})
});

//조횟수 증가
 router.put('/hit/:idx', (req, res) => {
 	const id = req.params.idx;
	const up_sql = `UPDATE TBL_BOARD SET 
				board_read = board_read + 1 
				WHERE id = ? `;
	//console.log(1, up_sql);
	connection.query(up_sql, [id], (err, result) => {
		//if(err) return res.json({Message: "Error!!"});
		//return res.json(result);
		//res.send(`/${id}`);
	});
 });

//읽기
router.get('/detail/:idx', (req, res) => {
	const id = req.params.idx;
	 const sql = `
			SELECT * 
			FROM TBL_BOARD 
			WHERE 1 = 1 
			AND id = ?
			`;
	 connection.query(sql, [id], (err, rows, fields) => {	//rows에 디비내용을 저장
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

//수정페이지 이동
router.get('/edit/:idx', (req, res) => {
	const id = req.params.idx;
	const sql = `
			SELECT * 
			FROM TBL_BOARD 
			WHERE 1 = 1 
			AND id = ?
			`;
	connection.query(sql, [id], (err, rows, fields) => {	//rows에 디비내용을 저장
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
	connection.query(sql, [member_name, 
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
	connection.query(sql, [id], (err, rows, fields) => {	//rows에 디비내용을 저장
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
	connection.query(sql_select, [id], (err, result) => {
		refTemp = result[0].ref;
		ref_stepTemp = result[0].ref_step;
		ref_levelTemp = result[0].ref_level;

		//result_1 = res.json(result);
		//console.log('result: ', result_1);
		//console.log('ref: ', result[0].ref);
		//console.log('ref_step', ref_stepTemp);
		//console.log('ref_level', ref_levelTemp);

		const sql_reply = "UPDATE TBL_BOARD SET ref_step = ref_step + 1 WHERE ref_step > ? AND ref = ? "
		connection.query(sql_reply, [ref_stepTemp, refTemp], (err, result) => {
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
		connection.query(sql, [values], (err, result) => {
			//if(err) return res.json(err);
			if(err) return res.json({Message: "ERROR"});
			return res.json(result);
			//console.log(err);
		});
	});
});


//삭제
//참고 동영상: https://www.youtube.com/watch?v=y5NvOade3sk
router.put('/delete/:idx', (req, res) => {
	const id = req.params.idx;
	//console.log(id);

	const up_sql = `UPDATE TBL_BOARD SET 
				board_state = 'N' 
				WHERE id = ? `;
		connection.query(up_sql, [id], (err, result) => {
		if(err) return res.json({Message: "ERROR"});
		return res.json(result);
		//console.log("result : " + (err));
	});
});

module.exports = router;