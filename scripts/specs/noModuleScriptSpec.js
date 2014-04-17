define(['jquery', 'text!templates/noModuleSpec.html', 'src/noModuleScript'], function(jQuery, template) {
	describe('external no module function', function() {
        it('execute the external function', function() {
            assert.equal(true, returnTrue());
        });
        it('function makes changes in HTML', function() {
            jQuery('body').append(template);

            var itemList = jQuery('#itemList'),
            	itemListCountOldElem = itemList.find('li').size();
            appendNextElem('next element');
            var itemListCountNewElem = itemList.find('li').size();
            assert.equal(itemListCountNewElem, itemListCountOldElem + 1);
        });
    });
});