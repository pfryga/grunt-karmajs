define(['jquery',
        'text!templates/istScripts/simpleBodySpec.html',
        'text!templates/istScripts/headerSpec.html',
        'text!templates/istScripts/toolbarSpec.html',
        'text!templates/istScripts/newsletterSpec.html',
        'text!templates/istScripts/footerSpec.html',
        'src/istScripts'
        ],
    function(jQuery, simpleBodySpec, headerSpec, toolbarSpec, newsletterTpl, footerTpl) {
    	describe('istScripts', function() {
            it('should enable simple header', function () {
                jQuery('body').empty().append(headerSpec, toolbarSpec);
                showMenu();
                enableSimpleHeader();
                var iStoreToolbarMenuNav = jQuery('#iStoreToolbarMenu .nav');
                assert.equal( iStoreToolbarMenuNav.attr('href'), '#menu' );
                assert.equal( iStoreToolbarMenuNav.hasClass('show'), false, 'new container has not class show');
                iStoreToolbarMenuNav.trigger('click');
                assert.equal( iStoreToolbarMenuNav.hasClass('show'), true, 'after click, this container has class show' );
            });

            it('should enable simple footer', function () {
                jQuery('body').empty().append(newsletterTpl, footerTpl);
                enableSimpleFooter();
                var elements = jQuery('.footerSection1, .footerSection2, .footerSection3, .footerSection4, .footerSection5'),
                    footerSection6 = jQuery('.footerSection6'),
                    additionalText = jQuery('.footerSection7'),
                    iStoreFooter = jQuery('#iStoreFooter'),
                    iStoreBox = jQuery('#iStoreFooter .iStoreBox');
                assert.equal( footerSection6.hasClass('shown'), false );
                footerSection6.trigger('click');
                assert.equal( footerSection6.hasClass('shown'), true );
                assert.equal( jQuery('#iStoreShopNewsletter .submit').html(), '' );
                assert.equal( footerSection6.hasClass('copyrights'), true );
            });

            it('should show menu in simple layput', function () {
                jQuery('body').empty().append(headerSpec, toolbarSpec);
                showMenu();
                var iStoreToolbarMenuNav = jQuery('#iStoreToolbarMenu .nav');
                assert.equal( iStoreToolbarMenuNav.attr('href'), '#menu' );
                assert.equal( iStoreToolbarMenuNav.hasClass('show'), false );
                iStoreToolbarMenuNav.trigger('click');
                assert.equal( iStoreToolbarMenuNav.hasClass('show'), true );
                iStoreToolbarMenuNav.trigger('click');
                assert.equal( iStoreToolbarMenuNav.hasClass('show'), false );
            });
        });
});