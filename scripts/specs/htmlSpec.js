define(['jquery', 'text!templates/htmlSpec.html'], function (jQuery, template) {
	describe('get external template and use', function() {

        it('works with external template', function() {
        	jQuery('body').append(template);
		    var contentBlock = jQuery('#testID').html();

            assert.equal('Plik HTML dla testu', contentBlock);
        });

    });
});