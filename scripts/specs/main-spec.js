var specs = [],
    karmaStarted = false;

for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/Spec\.js$/.test(file)) {
            specs.push(file);
        }
    }
}

requirejs.config({
    baseUrl: '.',
    deps: specs,
    callback: function () {
        if (!karmaStarted) {
            window.__karma__.start();
            karmaStarted = true;
        }
    }
});