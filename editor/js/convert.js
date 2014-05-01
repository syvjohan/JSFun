function formatTextStyle(el, tag){
	var selectedText = document.selection?document.selection.createRange().text:el.value.substring(el.selectionStart,el.selectionEnd);
	if(selectedText!=''){
		var newText='<'+tag+'>'+selectedText+'</'+tag+'>';
		el.value=el.value.replace(selectedText,newText)
	}
} 

function formatBullet(el, tag) {
	var selectedText = document.selection?document.selection.createRange().text:el.value.substring(el.selectionStart,el.selectionEnd);
	if(selectedText!=''){
		var newText= tag+'<li>'+selectedText+'</li>'+'</'+tag+'>';
		el.value=el.value.replace(selectedText,newText)
	}
}

function convertText(id) {
	var elem = document.getElementById(id);
	var content = elem.value;
	

		//alert(content);	
	
			
}










