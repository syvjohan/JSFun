<?php
	include "../model/setup.php";

	if(!empty($_GET['keyword'])) {
		$keyword = $_GET['keyword'];
		$option = $_GET['option'];
		getBooks($keyword, $option);
	}

	function getBooks($keyword, $option) {
		$setup = new setup;

		$books = NULL;

		if ($option == "title") {
			$container = $setup->get("SELECT * FROM books WHERE title='$keyword'");
			$books = toArray($container);
		} 
		else if ($option == "keyword") {
			$collection = $setup->get("SELECT * FROM books");
			$books = NULL;
			$count = 0;
			if ($collection->num_rows > 0) {
				 while($row = $collection->fetch_assoc()) {
					if (findWord($row["title"], $keyword)) {
						$arr = array($row["id"], $row["title"], $row["author"], $row["category"]);
						$books[] = $arr;
						++$count;
					}
				}
				$books[] = $count;
			}
		} 
		else if ($option == "category") {
			$container = $setup->get("SELECT * FROM books WHERE category='$keyword'");
			$books = toArray($container);
		} 
		else if ($option == "all") {
			$container = $setup->get("SELECT * FROM books");
			$books = toArray($container);
		} 

		echo json_encode($books);
	}

	function toArray($container) {
		$books = NULL;
		$count = 0;
		if ($container->num_rows > 0) {
			 while($row = $container->fetch_assoc()) {
    			$arr = array($row["id"], $row["title"], $row["author"], $row["category"]);
    			$books[] = $arr;
    			++$count;
    		}
		}
		$books[] = $count;
		
		return $books;
	}

	function findWord($searchStr, $findWord) {
		$searchStr = strtolower($searchStr);
		$findWord = strtolower($findWord);
		if (strpos($searchStr, $findWord, 0) !== false) {
			return true;
		}
		return false;
	}

?>