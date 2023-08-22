import React from 'react';

function Member(props){
	return (
		<tr>
			<td>{props.id}</td>
			<td>{props.name}</td>
			<td>{props.job}</td>
			<td>{props.birthday}</td>
			<td>{props.gender}</td>
			<td>&nbsp;</td>
		</tr>
	)
}

export default Member;
