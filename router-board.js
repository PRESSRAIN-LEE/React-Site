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

	const sql = `
			SELECT * 
			FROM TBL_BOARD WHERE 1 = 1
			ORDER BY ref DESC, ref_level ASC, id DESC
			LIMIT 0, 10
		`;
	connection.query(sql,(err, rows, fields) => {	//rows에 디비내용을 저장
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

//글쓰기 저장
router.post('/save', (req, res) => {
	//console.log(req);
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
		req.body.board_contents
	 ]
	 connection.query(sql, [values], (err, result) => {
		if(err) return res.json(err);
		return res.json(result);
	 })
});

//조횟수 증가
 router.get('/hit/:idx', (req, res) => {
 	
	
 	const id = req.params.idx;
// 	const up_sql = `UPDATE TBL_BOARD SET 
// 				board_read = board_read + 1 
// 				WHERE id = ? `;
// 	console.log(1, up_sql);
res.send(`/board/${id}`);
// 	connection.query(up_sql, [id], (err, result) => {
// 		if(err) return res.json({Message: "Error!!"});
// 		return res.json(result);
// 		//res.send(`/${id}`);
// 	});
 });

//읽기
router.get('/:idx', (req, res) => {
	 const id = req.params.idx;
	// // const up_sql = `UPDATE TBL_BOARD SET 
	// // 			board_read = board_read + 1 
	// // 			WHERE id = ? `;
	
	// // connection.query(up_sql, [id], (err, result) => {
	// // 	if(err) return res.json({Message: "Error!!"});
	// // 	return res.json(result);
	// // });
	//res.send(`/hit/${id}`);
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
	 			console.log(rows);
	 			res.send(rows);
	 		};
	 	}
	 );
	
});

module.exports = router;