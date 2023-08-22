const fs = require('fs');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

const router = express.Router();

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

router.get('/', (req, res) => {
	//res.send('/api/user');
	//res.send({message: 'Hello Members!'});

	connection.query(
		"SELECT * FROM CUSTOMER WHERE isDeleted = 0",
		(err, rows, fields) => {	//rows에 디비내용을 저장
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

module.exports = router;