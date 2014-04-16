define(['src/example', 'jquery'], function(App, $) {

    describe('just checking', function() {

        it('works for app', function() {
            var app = new App(1);
            assert.equal(1, app.el);
        });

    });

});