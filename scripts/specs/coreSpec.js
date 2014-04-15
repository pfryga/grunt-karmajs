define(['src/core', 'jquery'], function(App, $) {

    describe('just checking', function() {

        it('works for app', function() {
            var el = $('<div></div>');

            var app = new App(el);
            app.render();

            assert.equal('require.js up and running', el.text());
        });

    });

});