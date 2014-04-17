define(['src/noModuleScript'], function() {
	describe('external no module function', function() {
        it('works for app', function() {
            assert.equal(true, returnTrue());
        });
    });
});