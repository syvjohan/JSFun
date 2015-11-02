$(document).ready(function(){

	var bookId;
	var username;
	getCookieValues();

	function getCookieValues() {
		var c = document.cookie;
		var findUsername = c.indexOf("username");
		var findBookId = c.indexOf("bookId");
		var findSplit = c.indexOf(';');

		username = c.substring(findUsername +9, findSplit);
		bookId = c.substring(findBookId +7, c.length);
	}

	$('#btnAccept').click(function() {
		console.log("accept");
		borrowBook();
	});

	$('#btnDecline').click(function() {
		console.log("decline");
		document.location.href = "../view/search.html";
	});

	//check remarks.
		$.ajax({
			type: 'get',
			url: "../controller/order.php",
			cache: false,
			data: { 'username' : username, },
			success: function(response) {
				if (response == 1) {
					setTimeout(function() {
						document.location.href = "../view/login.html";
					}, 5000);
					document.getElementById('errorMsgOrder').innerHTML = "You are not allowed to order books because you have books that have exceeded return date! <br>Returning to Login page...</br>";
				} else {
					bookStatus();
				}
			},
			error : function() {
			}
		});

	function bookStatus() {
		$.ajax({
			type: 'get',
			url: "../controller/order.php",
			cache: false,
			data: { 'rBookId' : bookId,
					'rUsername' : username },
			success: function(response) {
				if (response == 0) {
					setTimeout(function() {
						document.location.href = "../view/search.html";	
					}, 5000);
					document.getElementById('errorMsgOrder').innerHTML = "Book is already loaned.";

				} else {
					buildInformation(response);
				}
			},
			error : function() {
			}
		});
	}

	function borrowBook() {
		$.ajax({
			type: 'post',
			url: "../controller/order.php",
			cache: false,
			data: { 'username' : username, 
					'bookId' : bookId },
			success: function(response) {
				if (response == 1) {
					$('#confirmationMsg').text("Order has been accepted. You will be redirected back to search page in 5 sec");
					setTimeout(function() {
						document.location.href = "../view/search.html";	
					}, 5000);
				} else {
					$('#errorMsgOrder').text("Something went wrong during connection to database, plz try to accept again.");
				}
			},
			error : function() {
			}
		});
	}

	function showInformation(firstname, lastname, address, bookTitle, collectionDate, returnDate) {
		document.getElementById('firstname').innerHTML = firstname;
		document.getElementById('lastname').innerHTML = lastname;
		document.getElementById('address').innerHTML = address;
		document.getElementById('bookTitle').innerHTML = bookTitle;
		document.getElementById('collectionDate').innerHTML = collectionDate;
		document.getElementById('returnDate').innerHTML = returnDate;

		document.getElementById('btn').style.visibility = "visible";
	}

	function buildInformation(jsonObj) {
		var firstname;
		var lastname;
		var address;
		var bookTitle;
		var collectionDate;
		var returnDate;

		var start = 0;
		var end = -1;
		var count = 0;
		for (var i = 0; i != 6; ++i) {
			start = jsonObj.indexOf('"', end +1);
			end = jsonObj.indexOf('"', start +1);
			var str = jsonObj.substring(start +1, end);
			if (count == 0) {
				firstname = str;
			} else if(count == 1) {
				lastname = str;
			} else if(count == 2) {
				address = str
			} else if(count == 3) {
				bookTitle = str;
			} else if(count == 4) {
				collectionDate = str;
			} else if(count == 5) {
				returnDate = str;
			}
			++count;
		}

		showInformation(firstname, lastname, address, bookTitle, returnDate, collectionDate);
	}

});