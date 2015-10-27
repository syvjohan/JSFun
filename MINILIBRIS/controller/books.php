<?php
	include "../model/setup.php";

	if(isset($_GET['keyword'])) {
		$keyword = $_GET['keyword'];
		$option = $_GET['option'];

	}

	function getBooks($keyword, $option) {
		$setup = new setup;
		$setup->connectToDb();

		$result = "";

		if ($option == "title") {
			$result = $setup->get("SELECT * FROM books WHERE title = '$option'");
		} 
		else if ($option == "keyword") {
			$collection = $setup->get("SELECT * FROM books");

			$i = 0;
			foreach ($collection as $c) {
				if (preg_match('/$option/', $c.title)) {
					$result[i] = $c;
					$i += 1;
				}
			}
		} 
		else if ($option == "category") {
			$result = $setup->get("SELECT * FROM books WHERE category = '$option");
		} 
		else if ($option == "all") {
			$result = $setup->get("SELECT * FROM books");
		}
		
		$setup->closeConnection();

		if ($result == "") {
			return false;
		}
		return $result;
	}

?>
