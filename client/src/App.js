import React from 'react';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router, 
  Routes,
  Route
} from 'react-router-dom';
import Home from './components/Home';
import Movie from './components/Movie';
import MemberList from './pages/MemberList';
import Board from './components/Board';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>}>
          </Route>
        </Routes>
        <Routes>
          <Route path="/movie" element={<Movie/>}>
          </Route>
        </Routes>
        <Routes>
          <Route path="/user" element={<MemberList/>}>
          </Route>
        </Routes>
        <Routes>
          <Route path="/board" element={<Board/>}>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
