define(
	[
		'tpl!templates/testSpec.html'
	],
	function(template) {
		'use strict';
	    describe('just checking', function() {

	        it('works for app', function() {
	        	var content = document.getElementById('testID').innerHTML;
	        	// var content = $('#testID p').html();
	            assert.equal('1', content);
	        });

	    });

});