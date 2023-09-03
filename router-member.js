const fs = require('fs');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');		//env

//로그인
//import session from 'express-session';
//import cookieParser from 'cookie-parser';
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
const secret = process.env.SESSION_SECRET || 'secret';

//app.use(cors());
app.use(express.json());

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}));
//app.use(cookieParser());
//app.use(cookieParser(secret));

app.use(session({
	//secret: process.env.SESSION_SECRET,
	secret: secret,
	resave: false,
	saveUninitialized: false,
	cookie: {
		secure: false,
		maxAge: 1000 * 60 * 60 * 24		//1일
	}
}));


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

var router = express.Router();

//session
router.get("/session", (req, res) => {
	//session을 받아오는 로직
	res.status(200).json("session information");
});

router.get('/', (req, res) => {
	res.send({message: 'Hello Members!'});
});

//회원 로그인
router.post('/login', (req, res) => {
	const userId = req.body.userId;
	const userPwd = req.body.userPwd;

	const sql = `SELECT * FROM TBL_MEMBER WHERE M_ID = ? AND M_PASS = ? `
	connection.query(sql, [userId, userPwd], (err, result) => {
		//if(err) return res.json({Message: "Error"});
		if(!req.session){
			req.session = {}
		}
		console.log("session : ", req.session);
		if(result.length > 0){
			req.session.M_SEQ = result[0].M_SEQ;
			req.session.M_NAME = result[0].M_NAME;
			//console.log("session : ", req.session.M_NAME);
			return res.json({Login: true, M_SEQ: req.session.M_SEQ, M_NAME: req.session.M_NAME});
		}else{
			return res.json({Login: false});
		}

		//return res.json(result);
		//res.send(`/${id}`);
		//console.log(result);

		// if (!result) {
		// 	return res.json({
		// 		loginSuccess: false,
		// 		message: "제공된 이메일에 해당하는 유저가 없습니다."
		// 	})
		// }else{
		// 	return res.json({
		// 		loginSuccess: true,
		// 		message: "유저가 있습니다."
		// 	})
		// }
		
	});
});

//로그아웃
router.get('/logout', async function (req, res, next) {
	res.send({message: 'Hello Members!'});
	//console.log("LOGOUT: ", req.data);
	/*
    try {
        if (session.user) { //세션정보가 존재하는 경우
			sessionStorage.removeItem("M_SEQ");
			sessionStorage.removeItem("M_NAME");
            //res.redirect('/');
        }
    }
    catch (e) {
      console.log(e)
    }
  	//res.redirect('/');
  */
})

//회원 저장
router.post('/save', (req, res) => {
	const { userId, userPwd, userName, userMail } = req.body;
	//console.log(req.body.body);
	//console.log(userId);

	//if(userId && userPwd && userName && userMail){
		 //return true;
	//}else{
	//	return(res.json({Message: "VALIDATE"}));
		 //return false;
	//}

	const sql = `
			INSERT INTO TBL_MEMBER (M_ID, M_PASS, M_NAME, M_MAIL, M_AUTH
			) VALUES (?)
		`
	const data = [
		userId,
		userPwd,
		userName,
		userMail,
		'1'
	];
	
	connection.query(sql, [data], (err, result) => {
		if(err) return res.json({Message: "ERROR"});
		return res.json(result);
		//console.log("err", err);
		//res.send(`/${id}`);
	});
});

module.exports = router;