import React, {useState} from 'react';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router, 
  Routes,
  Route
} from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import MovieList from './pages/movie/MovieList';
import MemberList from './pages/member/MemberList';

import BoardList from './pages/board/BoardList';
import BoardWrite from './pages/board/BoardWrite';
import BoardView from './pages/board/BoardView';
import BoardEdit from './pages/board/BoardEdit';
import BoardReply from './pages/board/BoardReply';
import BoardSearch from './pages/board/BoardSearch.js';

import Login from './pages/login/Login';
import LoginModal from './pages/login/LoginModal';
import Join from './pages/login/Join';

//import List from './pages/List';


function App() {
//class App extends Component {

const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

/*세션 추가*/
  const [isLogin, setIsLogin] = useState("");
  const session = () => {
    axios({
      url: "/session",
      method: "GET",
      withCredentials: true,
    });
  }

  const logout = () => {
    axios({
      url: "/logout",
      method: "POST",
      withCredentials: true,
    })
    .then((result) => {
      if(result.status === 200){
        setIsLogin(false);
      }
    });
  }
/*세션 추가*/

  return (
    <Router>
      <div className="App">
        <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/movie" element={<MovieList/>}/>
          <Route path="/user" element={<MemberList/>}/>
          
          {/* 게시판 */}
          <Route path="/board" element={<BoardList/>}/>
          <Route path="/board/create" element={<BoardWrite/>}/>
          <Route path="/board/detail/:idx" element={<BoardView/>}/>
          <Route path="/board/edit/:idx" element={<BoardEdit/>}/>
          <Route path="/board/reply/:idx" element={<BoardReply/>}/>
          <Route path="/board/search" element={<BoardSearch/>}/>

          {/* 회원가입, 로그인 */}
          {/* <Route path="/login" element={<Login/>}/>
          <Route path="/join" element={<Join/>}/>
          <Route path="/join-modal" element={<joinModal/>}/>
          <Route path="/login-modal" element={<LoginModal/>}/> */}

        </Routes>
        <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
