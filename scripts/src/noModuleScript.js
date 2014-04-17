function returnTrue() {
    return true;
}

function appendNextElem(content) {
	var itemList = jQuery('#itemList');
	itemList.append('<li>' + content + '</li>');
}