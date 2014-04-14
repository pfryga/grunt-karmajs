var specs = [];

for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/Spec\.js$/.test(file)) {
            console.log('pushing: ' + file);
            specs.push(file);
        }
    }
}

requirejs.config({
    baseUrl: '/base/script/specs',
    paths: {
        'jquery': '../../bower_components/jquery/dist/jquery'
    },
    deps: specs,
    callback: function () {
        window.__karma__.start()
    }
});