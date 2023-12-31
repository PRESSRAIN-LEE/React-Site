- React와 React bootstrap으로 개발합니다.

# React(client) Install
`client폴더에서 진행`
- `1.` node js가 설치 되어 있어야 함
- `1-1.` https://nodejs.org/ko 다운로드 및 설치
- `2.` 대상 폴더로 이동(※현재 선택된 폴더의 하위에 프로젝트 생성- 아래에서 만드는 폴더가 생성 됨)
- `3. ` Command 창을 열어 아래의 명령어를 입력한다.
- `3-1.` 명령어 : npx create-react-app "프로젝트명(폴더명)"
- `4.` vs code에서 open folder를 이용하여 앞에서 설치한 디렉토리를 열어준다.
- `5.` 명령어 : npm start로 웹페이지 띄우기
- `6.` localhost:3000 웹페이지 열림
- `7.` .gitignore에 의해 node_modules는 github에 올릴때 제외됨
- `7-1.` node_modules 폴더는 삭제 되어도 npm install로 복구 가능 (package.json 파일 필수)
- `8.` public/index.html -> div id=root
- `8-1.` src폴더에서 모든 개발작업이 이루어진다.
- `9.` 라우터 구현을 위해 react-router-dom(리액트 라우터 돔) 설치 (V5) (https://reactrouter.com/)
- `9-1.` npm install react-router-dom
- `10.` axios설치
- `10-1.` npm install axios
- `11.` mysql설치
- `11-1.` npm install mysql
- `12.` query-string 설치
- `12-1.` npm install query-string
- `13.` npm install sweetalert2 (각종 메시지 창: https://sweetalert2.github.io/)
- `14.` npm install jquery		//jquery


## node.js(server)설치 (root에서)
`root에서 진행`
- `0.` npm install express body-parser nodemon mysql cors (설치할 라이브러리들)....
- `1.` client에 있는 .gitignore파일을 root에 복사
- `2.` package.json파일 작성 (npm init -y 를 사용해서 작성해도 됨)
- `3.` npm install (-g) nodemon => node_modules폴더 생성 됨
- `4.` server.js파일 작성
- `5.` npm install express body-parser
- `6.` npm install -D concurrently
- `7.` /.gitignore 파일 수정 - 디비 연결 파일 추가
- `7-1.` database.json 추가
- `8.` npm install express-session cookie-parser 추가(로그인 관련)
- `9.` npm install dot env 추가(로그인 세션)
- `10.` npm i react-paginate
- `11.` npm install path fs mime iconv-lite		//첨부파일 관련
- `12.` npm install jsonwebtoken	//JWT 관련(사용하기전에 신중히 고려할 점 - 어설프게 사용하면 안한것만도 못한 결과가 발생 할 가능성이 많음)
- `13.` npm install bcrypt	//암호화 관련
- `14.` npm install session-file-store	//세션저장



### Upload 설치 (multer)
- npm install multer

#### router 분리
라우터 분리: https://codegear.tistory.com/52

##### bootstrap
`npm i react-bootstrap bootstrap`
`npm install react-bootstrap bootstrap`

- bootstrap (https://www.bootstrapcdn.com/)

`Navbar`
- https://getbootstrap.com/docs/5.3/components/navbar/#how-it-works


###### 개발 완료
`1. 사용자단`
- `1.` 목록(계층형-답변형) (계속 updagrade 예정)
- `2.` 글 상세 보기
- `3.` 조회 수 증가 (글 상세페이지에서 새로고침을 해도 증가되지 않고 오로지 글 목록에서 클릭하고 왔을 때만 증가함)
- `4.` 게시판 글 수정
- `5.` 게시판 답변 기능
- `6.` 회원가입(아이디 중복 체크 - 예정)
- `7.` 로그인, 로그아웃
- `8.` 게시판 Pagenation


`2. 관리자단`


# 개발 진행 & 개발 예정
`1. 사용자단`
- 회원가입(아이디 중복 체크)
- 정보수정

- 게시판 검색
- 게시판 글쓰기 (첨부파일) - multer
- 게시판 삭제(상세페이지, 목록) - 첨부파일이 있으면 같이 삭제 처리
- 첨부파일 다운로드
- comment 기능 (참고: https://binaryjourney.tistory.com/22)
- 에디터 추가
- 아이디 찾기 / 비번 초기화
- 게시글에 좋아요 (카운트)
- 출석(캘린더)
- 포인트 기능

`2. 관리자 기능`
- 로그인(관리자)
- 로그인 정보수정
- 회원 관리(CRUD)
- 게시판 관리(CRUD,답변, 좋아요)
- 포인트 관리(포인트 가감)


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


# 동영상
`동영상 - 참고`
https://www.youtube.com/watch?v=y4Pd3M1ZIXk&list=PLB7CpjPWqHOuf62H44TMkMIsqfkIzcEcX&index=1


`동영상`
https://www.youtube.com/@user-tv9kt8gu6n/search?query=%EB%A6%AC%EC%95%A1%ED%8A%B8%20%EA%B2%8C%EC%8B%9C%ED%8C%90

`git`



참고 git: 
https://github.com/ed-roh/react-admin-dashboard

동영상: 
https://www.youtube.com/watch?v=wYpCWwD1oz0



`material ui 설치`
npm install @mui/material @emotion/react @emotion/styled @mui/x-data-grid @mui/icons-material react-router-dom@6 react-pro-sidebar formik yup @fullcalendar/core @fullcalendar/daygrid @fullcalendar/timegrid @fullcalendar/list @nivo/core @nivo/pie @nivo/line @nivo/bar @nivo/geo