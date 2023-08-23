import React, { useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

function BoardHit(){
	const {idx} = useParams();
	useEffect(() => {
		axios.get('/api/boards/hit/' + idx)
		.then(res => console.log(res))
		.catch(err => console.log(err))
	}, []);

	return (
		""
	);
}

export default BoardHit;