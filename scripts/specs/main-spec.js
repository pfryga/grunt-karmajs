var specs = [];

for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/Spec\.js$/.test(file)) {
            specs.push(file);
        }
    }
}

requirejs.config({
    baseUrl: '/base/scripts/specs',
    paths: {
        'jquery': '../../bower_components/jquery/dist/jquery',
        'text': '../../bower_components/requirejs-text/text',
        'src': '../../scripts/src'
    },
    shim: {
        'noModuleScript': ['jquery']
    },
    deps: specs,
    callback: function () {
        window.__karma__.start()
    }
});

