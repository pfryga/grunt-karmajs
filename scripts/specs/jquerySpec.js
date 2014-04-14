define(['jquery'], function (jQuery) {
    describe('get jQuery and use', function() {

        it('works for example', function() {
        	var el = document.createElement("div");
        	el.id = "myDiv";
        	document.body.appendChild(el);
        	jQuery('#myDiv').html('jeden');
		    var contentBlock = jQuery('#myDiv').html();

            assert.equal('jeden', contentBlock);
        });

    });
});