<?php
	include "../model/setup.php";

	if(!empty($_GET['username'])) {
		$username = $_GET['username'];
		checkRemarks($username);
	}

	if(!empty($_POST['username']) && !empty($_POST['bookId'])) {
		$username = $_POST['username'];
		$bookId = $_POST['bookId'];

		if(!checkBookStatus($bookId)) {
			$futureTimestamp = getFutureTimestamp();
			$currentTimestamp = getCurrentTimestamp();

			borrowBook($username, $bookId, $futureTimestamp, $currentTimestamp);
			echo "1";
			return;
		} 
		echo "0";
	}

	if(!empty($_GET['rBookId']) && !empty($_GET['rUsername'])) {
		$bookId = $_GET['rBookId'];
		$username = $_GET['rUsername'];
		if(!checkBookStatus($bookId)) {
			$futureTimestamp = getFutureTimestamp();
			$currentTimestamp = getCurrentTimestamp();
			echo json_encode(getInfoToPrint($username, $bookId, $currentTimestamp, $futureTimestamp));
			return;
		}
		echo "0";
	}

	function checkRemarks($username) {
		$setup = new setup;
		$container = $setup->get("SELECT * FROM orders WHERE username='$username'");
		while ($row = mysqli_fetch_row($container)) {
			if($row[4] < getCurrentTimestamp()) {
				echo "1";
				return;
			}
		}
		echo "0";
	}

	function borrowBook($username, $bookId, $returnTime, $currentTime) {
		$setup = new setup;
		$setup->post("INSERT INTO orders VALUES (NULL, '$username', '$bookId', '$currentTime', '$returnTime')");
	}

	function checkBookStatus($bookId) {
		$setup = new setup;
		$container = $setup->get("SELECT * FROM orders WHERE bookId='$bookId'");
		while ($row = mysqli_fetch_row($container)) {
			return 1;
		}
		return 0;
	}

	function getFutureTimestamp() {
		return date("Y-m-d", strtotime("+15 day"));
	}

	//UNIX time.
	function getCurrentTimestamp() {
 		$t = time();
	  	return date("Y-m-d", $t);
	}

	function getInfoToPrint($username, $bookId, $futureTimestamp, $currentTimestamp) {
		$setup = new setup;
		$arr = NULL;
		$containerPersons = $setup->get("SELECT * FROM persons WHERE username='$username'");
		$containerBooks = $setup->get("SELECT * FROM books WHERE id='$bookId'");
	
		while ($row = mysqli_fetch_row($containerPersons)) {
			$arr = array($row[2], $row[3], $row[4]);		
		}

		while ($row = mysqli_fetch_row($containerBooks)) {
			array_push($arr, $row[1]);
		}

		array_push($arr, $currentTimestamp, $futureTimestamp);

		return $arr;
	}

?>