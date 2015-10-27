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
				console.log("error: resetDbToDefault");
			}
		});
	})

	function resetInput(uname, pwd) {
		document.getElementById('username').value = "";
		document.getElementById('password').value = "";
	}

	function doUserExist(uname, pwd) {
		$.ajax({
			type: 'get',
			url: "../controller/persons.php",
			cache: false,
			data: { 'username' : uname,
					'password' : pwd },
			success: function (response) {
				//goto order.
				document.location.href = "../view/order.html";
			},
			error : function() {
				document.getElementById('errorMsgLogin').innerHTML = "Could not localize user in database";
				resetInput(uname, pwd);
			}
		});
	}
});
