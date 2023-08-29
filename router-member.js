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
const upload = multer({dest: './upload/member'});	//루트에 upload폴더


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

router.get('/login', (req, res) => {
	//res.send('/api/user');
	//res.send({message: 'Hello Express!'});
});

//회원 저장
router.post('/save', (req, res) => {
	const { userId, userPw, userName, userMail } = req.body;
	
	//if(userId && userPw && userName && userMail){
		 //return true;
	//}else{
	//	return(res.json({Message: "VALIDATE"}));
		 //return false;
	//}

	const sql = `
			INSERT INTO TBL_MEMBER (M_ID, M_PASS, M_NAME, M_MAIL, M_AUTH
			) VALUES (?, ?, ?, ?, 1)
		`
	connection.query(sql, [userId, userPw, userName, userMail], (err, result) => {
		if(err) return res.json({Message: "ERROR"});
		return res.json(result);
		//console.log("err", err);
		//res.send(`/${id}`);
	});
});

module.exports = router;