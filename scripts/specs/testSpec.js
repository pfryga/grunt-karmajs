// define(
// 	[
// 		'tpl!templates/testSpec'
// 	],
// 	function(template) {
// 		'use strict';
// 	    describe('just checking', function() {

// 	        it('works for app', function() {
// 	        	var content = document.getElementById('testID').innerHTML;
// 	            assert.equal('1', content);
// 	        });

// 	    });

// });

// describe('Functions', function(){
//   describe('#testFunction()', function() {
//     it('should return true', function() {
//       assert.equal(true, true);
//     })
//   })
// })

define(['jquery'], function (jQuery) {
    describe('just checking', function() {

        it('works for app', function() {
        	var el = document.createElement("div");
        	el.id = "myDiv";
        	document.body.appendChild(el);
        	jQuery('#myDiv').html('jeden');
		    var contentBlock = jQuery('#myDiv').html();

            assert.equal('jeden', contentBlock);
        });

    });
});