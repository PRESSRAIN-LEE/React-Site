import React from "react";
//const fs = require('fs');	//DB연결
//import fs from "fs";


const MemberList = () => {
	return(
		<div className="container">
			<h1>Member목록</h1>

			<table className="table table-striped table-hover">
				<thead>
					<tr>
					<th scope="col">#</th>
					<th scope="col">First</th>
					<th scope="col">Last</th>
					<th scope="col">Handle</th>
					</tr>
				</thead>
				<tbody>
					<tr>
					<th scope="row">1</th>
					<td>Mark</td>
					<td>Otto</td>
					<td>@mdo</td>
					</tr>
					<tr>
					<th scope="row">2</th>
					<td>Jacob</td>
					<td>Thornton</td>
					<td>@fat</td>
					</tr>
					<tr>
					<th scope="row">3</th>
					<td colspan="2">Larry the Bird</td>
					<td>@twitter</td>
					</tr>
				</tbody>
			</table>
		</div>
	);

}

export default MemberList;