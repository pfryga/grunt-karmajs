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
        it('function makes changes in HTML', function() {
            jQuery('body').append(newsletterTpl, simpleBodySpec);

            var resolution = checkResolution();
        });

        it('should enable simple footer', function () {
            jQuery('body').append(footerTpl);
            enableSimpleFooter();
            jQuery('.footerSection6').trigger('click');
            assert.equal( jQuery('.footerSection6').hasClass('shown'), true );
            assert.equal( jQuery('#iStoreShopNewsletter .submit').html(), '' );
            assert.equal( jQuery('.footerSection6').hasClass('copyrights'), true );
        });

        it('should show menu in simple layput', function () {
            jQuery('body').append(headerSpec, toolbarSpec);
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