console.log("hello data");

jQuery(document).ready( function($) {

	$.ajax({
		url: "http://localhost:8888/trackyourmayor/admin/api/all_data.php",
		success: function( data ) {
//			alert( 'Your home page has ' + $(data).find('div').length + ' div elements.');
            console.log(data);
		}
	})

})