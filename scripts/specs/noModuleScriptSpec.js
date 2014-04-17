define(['jquery', 'text!templates/noModuleSpec.html', 'src/noModuleScript'], function(jQuery, template) {
	describe('external no module function', function() {
        it('execute the external function', function() {
            assert.equal(true, returnTrue());
        });
        it('function makes changes in HTML', function() {
            jQuery('body').append(template);

            var itemList = jQuery('#itemList'),
            	itemListCountOldElem = itemList.find('li'),
            	itemListElemContent = 'new element content',
            	termsInfo = jQuery('#termsInfo'),
            	exampleSpan = jQuery('#exampleSpan');

            appendNextElem(itemListElemContent);
            var itemListCountNewElem = itemList.find('li'),
            	tempItemContent = jQuery('#itemList').find('li').eq(itemListCountOldElem.size()).html();
            	// jQuery('#itemList').find('li') jest szybsze od jQuery('#itemList li')
            assert.equal(itemListCountNewElem.size(), itemListCountOldElem.size() + 1);
            assert.lengthOf(itemListCountOldElem, 4);
            assert.lengthOf(itemListCountNewElem, 5);
            assert.equal(tempItemContent, itemListElemContent);
            assert.typeOf(tempItemContent, 'string');
            assert.equal(termsInfo.hasClass('hidden'), true);
            assert.equal(!(termsInfo.hasClass('hidden')), false);
            assert.equal(exampleSpan.css('display'), 'none');
        });
    });
});