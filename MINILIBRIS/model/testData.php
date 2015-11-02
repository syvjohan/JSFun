<?php

	class testData {
		private $containerBooks = array();
		private $containerPersons = array();
		private $containerOrders = array();

		public function __construct() {
			$this->fillContainerBooks();
			$this->fillContainerPersons();
			$this->fillContainerOrders();
		}

		private function fillContainerBooks() {
			$this->containerBooks[] = "INSERT INTO books VALUES (NULL, 'Otroligt hogt och extremt djupt', 'Annelie Pompe', 'Vetenskap')";
			$this->containerBooks[] = "INSERT INTO books VALUES (NULL, 'Mordar-Anders och hans vanner', 'Jonas Jonasson', 'Biografier')";
			$this->containerBooks[] = "INSERT INTO books VALUES (NULL, 'Sno kan brinna', 'Katarina Mazetti', 'Skonlitteratur')";
		}	

		private function fillContainerPersons() {
			$this->containerPersons[] = "INSERT INTO persons VALUES ('syvjohan', 'johantest', 'johan', 'nilsson', 'lingonstigen 4B', '07023436577')";
			$this->containerPersons[] = "INSERT INTO persons VALUES ('syvpeter', 'petertest', 'peter', 'karlsson', 'blabarstigen 22B', '070274322699')";
			$this->containerPersons[] = "INSERT INTO persons VALUES ('syvnils', 'nilstest', 'nils', 'larsson', 'hallonstigen 33C', '07023157577')";
		}

		private function fillContainerOrders() {
			$this->containerOrders[] = "INSERT INTO orders VALUES (NULL, 'syvjohan', '1', '2012-05-10', '2012-05-25')";
		}

		public function getBooksData() {
			return $this->containerBooks;
		}

		public function getPersonsData() {
			return $this->containerPersons;
		}

		public function getOrdersData() {
			return $this->containerOrders;
		}
	}

?>