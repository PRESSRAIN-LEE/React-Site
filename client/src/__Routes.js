import React, { Component } from 'react';

import Home from './components/Home';
import Movie from './components/Movie';
import Member from './components/Member';
import Board from './components/Board';



export default class Routes extends Component {
  render() {
	return (
		{
			path: "/",
			element: Home
		},
		{
			path: "/movie",
			element: Movie
		},
		{
			path: "/user",
			element: Member
		},
		{
			path: "/board",
			element: Board
		}
	)
  }
}
