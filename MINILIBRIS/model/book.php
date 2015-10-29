<?php

class book {
	private $id;
	private $title;
	private $author;
	private $category;

	public function __construct() {
		$this->id = "";
		$this->title = "";
		$this->author = "";
		$this->category = "";
	}

	public function getId() {
		return $this->id;
	}

	public function getTitle() {
		return $this->title;
	}

	public function getAuthor() {
		return $this->author;
	}

	public function getCategory() {
		return $this->category;
	}

	public function setId($id) {
		$this->id = $id;
	}

	public function setTitle($title) {
		$this->title = $title;
	}

	public function setAuthor($author) {
		$this->author = $author;
	}

	public function setCategory($category) {
		$this->category = $category;
	}
}
?>