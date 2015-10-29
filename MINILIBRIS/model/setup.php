<?php
	Include "testData.php";

	class setup {
		private $conn = null;

		public function __construct() {}

		public function init() {
			$this->deleteAllContent();
			$this->insertDefaultData();
			$this->redirectBackToLoginPage();
		}

		public function redirectBackToLoginPage() {
			echo "Database reseted to default data. Redirecting...";
			header( "refresh:1; url=../view/login.html" );
			exit;
		}

		public function deleteAllContent() {
			$this->connectToDb();
			$this->eraseContent();
			$this->closeConnection();
		}

		private function eraseContent() {
			mysqli_query($this->conn, "DELETE FROM books") or die("Query failed, erase books content");
			mysqli_query($this->conn, "DELETE FROM persons") or die("Query failed, erase books content");
			//mysqli_query($this->conn, "DELETE FROM order") or die("Query failed, erase order content");
		}

		public function insertDefaultData() {
			$this->connectToDb();
			$this->insertIntoDb();
			$this->closeConnection();
		}

		public function connectToDb() {
			$this->conn = mysqli_connect('localhost', 'root', '', 'minilibris') or die("Could not connect");
		}

		private function insertIntoDb() {
			$data = new testData;

			$dataPersons = $data->getPersonsData();
			foreach ($dataPersons as $item) {
				$this->post($item);
			}

			$dataBooks = $data->getBooksData();
			foreach ($dataBooks as $item) {
				$this->post($item);
			}
		}

		//General function for getting data from database, all get request goes through here
		public function get($query) {
			$container = mysqli_query($this->conn, $query) or die("GET query failed");
			return $container;
		}

		//General function for posting new data into database all posting request goest through here.
		public function post($query) {
			mysqli_query($this->conn, $query) or die("POST query failed");
		}

		public function closeConnection() {
			mysqli_close($this->conn);
		}
	}

	$s = new setup;
?>