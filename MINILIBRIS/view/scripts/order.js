$(document).ready(function(){

	$('#search').click(function() {
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

	function getBooks(keyword, option) {
	$.ajax({
			type: 'get',
			url: "../controller/books.php",
			cache: false,
			data: { 'keyword' : keyword,
					'option' : option },
			success: function (response) {
				console.log("response",response);
			},
			error : function() {
				console.log("error getBooks..");
			}
		});
	}

});