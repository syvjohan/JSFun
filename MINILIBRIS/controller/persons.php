<?php
	include "../model/setup.php";

	if (!empty($_GET['username']) && !empty($_GET['password'])) {
		$uname = $_GET['username'];
		$pwd = $_GET['password'];

		cmpUsers($uname, $pwd);
	}

	if (!empty($_GET['usernameExist'])) { 
		$username = $_GET['usernameExist'];
		usernameExist($username);
	}

	if (!empty($_POST['fname']) && !empty($_POST['lname']) && !empty($_POST['address']) &&
	 	!empty($_POST['phone']) && !empty($_POST['uname']) && !empty($_POST['pwd'])) {
		
		$fname = $_POST['fname'];
		$lname = $_POST['lname'];
		$address = $_POST['address'];
		$phone = $_POST['phone'];
		$uname = $_POST['uname'];
		$pwd = $_POST['pwd'];
		registerNewUser($fname, $lname, $address, $phone, $uname, $pwd);
	}

	if (!empty($_GET['resetDb'])) {
		$setup = new setup;
		$setup->reset();
	}

	function registerNewUser($fname, $lname, $address, $phone, $uname, $pwd) {
		$setup = new setup;
		$setup->post("INSERT INTO persons VALUES ('$uname', '$pwd', '$fname', '$lname', '$address', '$phone')");
	}

	function usernameExist($username) {
		$setup = new setup;
		$result = $setup->get("SELECT username FROM persons WHERE username='$username'");
		
		$exist = "0";
		while ($row = mysqli_fetch_row($result)) {
			$exist = "1";
		}
		echo ($exist);
	}

	function cmpUsers($uname, $pwd) {
		$setup = new setup;
		$result = $setup->get("SELECT username, password FROM persons WHERE username='$uname' AND password='$pwd'");

		$exist = "0";
		while ($row = mysqli_fetch_row($result)) {
			$exist = "1";
		}
		echo ($exist);
	}
?>