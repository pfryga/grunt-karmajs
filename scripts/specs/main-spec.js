var specs = [],
    karmaStarted = false;
    console.log('Karma Stop');

for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/Spec\.js$/.test(file)) {
            console.log('pushing ' + file);
            specs.push(file);
        }
    }
}

console.log(specs);
console.log(requirejs);
requirejs.config({
    // baseUrl: '/base/scripts/specs',
    deps: specs,
    callback: function () {
        console.log('weszlo 1');
        if (!karmaStarted) {
            console.log('weszlo 2');
            window.__karma__.start();
            karmaStarted = true;
            console.log('Karma Start');
        }
    }
});

// require(['HelloWorldAlerter'], function(HelloWorldAlerter) {
//     console.log('poszło');
//     var alerter = new HelloWorldAlerter();
//     alerter.run();
// });