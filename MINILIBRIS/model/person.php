<?php

class person {
	private $username;
	private $password;
	private $firstname;
	private $lastname;
	private $address;
	private $phonenumber;

	public function __construct() {
		$username = "";
		$password = "";
		$firstname = "";
		$lastname  = "";
		$address = "";
		$phonenumber = "";
	}

	public function getUsername() {
		return $this->username;
	}

	public function getPassword() {
		return $this->password;
	}

	public function getFirstname() {
		return $this->firstname;
	}

	public function getLastname() {
		return $this->lastname;
	}

	public function getAddress() {
		return $this->address;
	}

	public function getPhonenumber() {
		return $this->phonenumber;
	}

	public function setUsername($ussername) {
		$this->username = $username;
	}

	public function setPassword($password) {
		$this->password = $password;
	}

	public function setFirstname($firstname) {
		$this->firstname = $firstname;
	}

	public function setLastname($lastname) {
		$this->lastname = $lastname;
	}

	public function setAddress($address) {
		$this->address = $address;
	}

	public function setPhonenumber($phonumber) {
		$this->phonenumber = $phonenumber;
	}
}

?>