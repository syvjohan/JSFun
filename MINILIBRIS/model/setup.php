<?php
	Include "testData.php";

	class setup {
		private $conn = null;

		public function __construct() {}

		public function reset() {
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

		private function connectToDb() {
			$this->conn = mysqli_connect('localhost', 'root', 'pwdlocalhost', 'minilibris') or die("Could not connect");
		}

		private function insertIntoDb() {
			$data = new testData;

			$dataPersons = $data->getPersonsData();
			foreach ($dataPersons as $item) {
				mysqli_query($this->conn, $item) or die("POST query failed");
			}

			$dataBooks = $data->getBooksData();
			foreach ($dataBooks as $item) {
				mysqli_query($this->conn, $item) or die("POST query failed");
			}
		}

		//General function for getting data from database. Does not include reseting Db
		public function get($query) {
			$this->connectToDb();
			$result = mysqli_query($this->conn, $query) or die("GET query failed");
			$this->closeConnection();
			return $result;
		}

		//General function for posting new data into database. Does not include reseting Db.
		public function post($query) {
			$this->connectToDb();
			$result = mysqli_query($this->conn, $query) or die("POST query failed");
			$this->closeConnection();
			return $result;
		}

		private function closeConnection() {
			mysqli_close($this->conn);
		}
	}

	$s = new setup;
?>