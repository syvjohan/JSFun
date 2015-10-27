<?php
	include "../model/setup.php";

	if (isset($_GET['username']) && isset($_GET['password'])) {
		$uname = $_GET['username'];
		$pwd = $_GET['password'];

		if (cmpUsers($uname, $pwd)) {
				return 1;
			} else {
				return 0;
			}
	}

	if (isset($_GET['resetDb'])) {
		$setup = new setup;
		$setup->init();
	}

	function cmpUsers($uname, $pwd) {
		$setup = new setup;
		$setup->connectToDb();

		$result = $setup->get("SELECT username, password FROM persons
		 		WHERE username='$uname' AND password='$pwd'");

		$setup->closeConnection();

		if ($uname == NULL || $pwd == NULL) {
			return false;
		}

		return true;
	}
?>