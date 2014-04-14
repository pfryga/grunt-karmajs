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