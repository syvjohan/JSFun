$(document).ready(function(){

	$('#btnRegister').click(function() {
		var fname = document.getElementById('firstname').value;
		var lname = document.getElementById('lastname').value;
		var address = document.getElementById('address').value;
		var phone = document.getElementById('phonenumber').value;
		var uname = document.getElementById('username').value;
		var pwd = document.getElementById('password').value;

		if (onlyLetters(fname) && fname.length >= 3) {
			if (onlyLetters(lname) && lname.length >= 3) {
				if (evalAddress(address) && address.length >= 6) {
					if (onlyDigits(phone) && phone.length >= 10) {
						if (evalUsername(uname)) {
							if (evalPassword(pwd)) {
								console.log("hej");
								registerNewUser(fname, lname, address, phone, uname, pwd);
							} else {
								document.getElementById('errorMsgRegister').innerHTML = "Password shall contain: small, large letters, digits and length >= 6)";
								document.getElementById('password').value = "";
							}
						} else {
							document.getElementById('username').value = "";
						}
					} else {
						document.getElementById('phone').value = "";
						document.getElementById('errorMsgRegister').innerHTML = "Phonenumber shall contain only digits!";
					}
				} else {
					document.getElementById('address').value = "";
					document.getElementById('errorMsgRegister').innerHTML = "Address invalid";
				}
			} else {
				document.getElementById('lastname').value = "";
				document.getElementById('errorMsgRegister').innerHTML = "Last name shall only contain letters!";
			}
		} else {
			document.getElementById('firstname').value = "";
			document.getElementById('errorMsgRegister').innerHTML = "First name shall only contain letters!";
		}

	});

	function onlyLetters(str) {
		$.trim(str);
		return /^[a-zA-Z]+$/.test(str);
	}

	function onlyDigits(str) {
		$.trim(str);
		return str.match(/^[0-9]+$/) != null;
	}

	function evalAddress(str) {
		$.trim(str);
		return /[^a-zA-Z0-9]/.test(str);
	}

	function evalPassword(str) {
		$.trim(str);
		if (str.length >= 8 && str.match(/[a-z]/) && str.match(/[A-Z]/) && str.match(/[0-9]/)) {
			return true;
		}
		return false;
	}

	function evalUsername(str) {
		$.trim(str);
		if (str.length >= 5) {
			if(userExist(str)) {
				return false;
			} else {
				return true;
			}
		}
		document.getElementById('errorMsgRegister').innerHTML = "Username to short( username.length >= 6)";
		return false;
	}

	function userExist(usernameExist) {
		$.ajax({
			type: 'get',
			url: "../controller/persons.php",
			cache: false,
			data: { 'usernameExist' : usernameExist },
			success: function (response) {
				if (response) {
					console.log(response);
					if (response == 1) {
						return true;
					} else {
						return false;
					}
				}
			},
			error : function() {
				document.getElementById('errorMsgRegister').innerHTML = "Could not connect to database";
			}
		});
	}

	function registerNewUser(fname, lname, address, phone, uname, pwd) {
		$.ajax({
			type: 'post',
			url: "../controller/persons.php",
			cache: false,
			data: { 'fname': fname,
					'lname': lname,
					'address': address,
					'phone': phone,
					'uname': uname,
					'pwd': pwd },
			success: function (response) {
				if (response) {
					document.getElementById('errorMsgRegister').innerHTML = "Username already exist!";
				} else {
					document.location.href = "../view/search.html";
				}
			},
			error : function() {
				document.getElementById('errorMsgRegister').innerHTML = "Could not connect to database";
				resetInput(uname, pwd);
			}
		});
	}

});