function LoginValidation(values){
	let error = {};

	//const email_pattern = /^(([^<>()\\[\].,;:\s@"]+(\.[^<>()\\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
	const password_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

	// if(values.userEmail === ""){
	// 	error.email = "이메일 주소가 없습니다.";
	// }else if(!email_pattern.test(values.userEmail)){
	// 	error.email = "올바른 이메일 형식으로 입력하세요.";
	// }else{
	// 	error.email = "";
	// }

	if(values.userId === ""){
		error.userId = "아이디를 입력하세요.";
	}else{
		error.userId = "";
	}

	/*
	if(values.userPwd === ""){
		error.userPwd = "비밀번호를 입력하세요.";
	}else if(!password_pattern.test(values.userPwd)){
		error.userPwd = "암호는 8자 이상의 문자와 숫자를 하나 이상 포함해야 합니다.";
	}else{
		error.userPwd = "";
	}
	*/
	return error;
}

export default LoginValidation;