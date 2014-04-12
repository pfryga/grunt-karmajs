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

// describe('Functions', function(){
//   describe('#testFunction()', function() {
//     it('should return true', function() {
//       assert.equal(true, true);
//     })
//   })
// })

// define([], function() {
// 		'use strict';
// 	    describe('just checking', function() {

// 	        it('works for app', function() {
// 	            assert.equal('1', 1);
// 	        });

// 	    });
// });