import React from 'react';
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
import List from './pages/List';


function App() {
//class App extends Component {

  return (
    <Router>
      <div className="App">
        <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/movie" element={<MovieList/>}/>
          <Route path="/user" element={<MemberList/>}/>
          <Route path="/board" element={<BoardList/>}/>
          <Route path="/board/create" element={<BoardWrite/>}/>
        </Routes>
        <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
