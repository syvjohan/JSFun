$(document).ready(function(){

	$('#btnSearch').click(function() {
		//erase old content in table.
		var Table = document.getElementById('showBooks').innerHTML = "";

		//get user option.
		var option = $('#searchOpt').children(":selected").attr("value");
		var keyword = document.getElementById("input").value;

		if (option == "searchBookTitle") {
			getBooks(keyword, "title");
		} else if (option == "searchKeyword") {
			getBooks(keyword, "keyword");
		} else if (option == "searchCategory") {
			getBooks(keyword, "category");
		} else if (option == "showAllBooks") {
			getBooks(keyword, "all");
		} else {
			return;
		}
	});

	//Row click Books.
	$('tr').live('click', function() {
		var clickedRow = $(this).index();
     	var table = document.getElementById('showBooks');
     	console.log(table.rows[clickedRow +1].cells[0].innerHTML);
     });

	function getBooks(keyword, option) {
		$.ajax({
			type: 'get',
			url: "../controller/books.php",
			cache: false,
			data: { 'keyword' : keyword,
					'option' : option },
			success: function(response) {
				if (response) {
					extractBooks(response);
				}
			},
			error : function() {
				document.getElementById('errorMsgLogin').innerHTML = "Could not connect to database";
				resetInput(uname, pwd);
			}
		});
	}

	function getBooksLen(books) {
		var e = books.lastIndexOf(']');
		var s = books.lastIndexOf(',');
		return books.substring(s +1, e);
	}

	function extractBooks(books) {
		console.log(books);
		var len = getBooksLen(books);
		if (len >= 0) {
			var bookStart = 0;
			var bookEnd = 0;
			var c = 0;
			do {
				bookStart = books.indexOf('[', bookEnd +1);
				bookEnd = books.indexOf(']', bookStart +1);
				var book = books.substring(bookStart +1, bookEnd);

				var id;
				var author;
				var title;
				var category;

				var start = 0;
				var end = -1;
				var count = 0;
				var d = 0;
				do {
					start = book.indexOf('"', end +1);
					end = book.indexOf('"', start +1);
					var item = book.substring(start +1, end);
					if (count == 0) {
						id = item;
						++count;
					} else if (count == 1) {
						title = item;
						++count;
					} else if (count == 2) {
						author = item;
						++count;
					} else if (count == 3) {
						category = item;
						++count;
					} 
					++d;
				} while(d != 4);
				count = 0;
				insertRow(id, title, author, category);

				++c;
			} while(c != len);

			insertTableHead();
		}
	}

	function insertTableHead() {
		var table = document.getElementById('showBooks');
		var header = table.createTHead();
		var newRow = header.insertRow(0); 

		newRow.insertCell(0).innerHTML = "<b>Id</b>";
		newRow.insertCell(1).innerHTML = "<b>Author</b>";
		newRow.insertCell(2).innerHTML = "<b>Title</b>";
		newRow.insertCell(3).innerHTML = "<b>Category</b>";
	}

	function insertRow(id, title, author, category) {
		var table = document.getElementById('showBooks');
		var newRow = table.insertRow(table.rowIndex +1);

		newRow.insertCell(0).innerHTML = id;
		newRow.insertCell(1).innerHTML = author;
		newRow.insertCell(2).innerHTML = title;
		newRow.insertCell(3).innerHTML = category;
	}
});