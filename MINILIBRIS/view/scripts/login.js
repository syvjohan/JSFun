$(document).ready(function(){

	$('#btnLogin').click(function() {

		var uname = document.getElementById('username').value;
		var pwd = document.getElementById('password').value;

		if (uname == "" || pwd == "" ) {
			document.getElementById('errorMsgLogin').innerHTML = "Input cannot be empty";
			return;
		}

		doUserExist(uname, pwd);
	});

	$('#resetDbToDefault').click(function() {
		$.ajax({
			type: 'get',
			url: "../controller/persons.php",
			cache: false,
			data: { 'resetDb' : 1 },
			success: function (response) {
					alert("Database has been reseted to default!");			
			},
			error : function() {
				document.getElementById('errorMsgLogin').innerHTML = "Could not reset database";
			}
		});
	})

	function resetInput(uname, pwd) {
		document.getElementById('username').value = "";
		document.getElementById('password').value = "";
	}

	function doUserExist(username, password) {
		$.ajax({
			type: 'get',
			url: "../controller/persons.php",
			cache: false,
			data: { 'username' : username,
					'password' : password },
			success: function (response) {
				if (response) {
					if (response == 1) {
						setCookie("username", username, 1)
						document.location.href = "../view/search.html";
					} else {
						document.getElementById('errorMsgLogin').innerHTML = "Wrong username and password!";
						resetInput(username, password);
					}
				} else {
					document.getElementById('errorMsgLogin').innerHTML = "Could not localize user in database";
					resetInput(username, password);
				}
			},
			error : function() {
				document.getElementById('errorMsgLogin').innerHTML = "Could not connect to database";
				resetInput(username, password);
			}
		});
	}

	function setCookie(cookieName, cookieValue, nDays) {
		var today = new Date();
		var expire = new Date();
		if (nDays==null || nDays==0) {
			 nDays=1;
		}
		expire.setTime(today.getTime() + 3600000*24*nDays);
		document.cookie = cookieName+"="+escape(cookieValue)
            + ";expires="+expire.toGMTString();
	}
});
