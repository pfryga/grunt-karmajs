var specs = [];

for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/Spec\.js$/.test(file)) {
            specs.push(file);
        }
    }
}

requirejs.config({
    baseUrl: '',
    deps: specs,
    paths: {
        templates: 'templates',
        underscore: '../../bower_components/underscore/underscore',
        text: '../../bower_components/requirejs-text/text',
        tpl: '../../bower_components/requirejs-tpl/tpl'
    },
    callback: function () {
        window.__karma__.start();
    }
});