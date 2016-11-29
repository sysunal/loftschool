timer(3000).then(() => console.log('я вывелась через 3 секунды'));

sentReq('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json')
    .then(function(resp) {
        var city = [];
        for(var i = 0; i < resp.length; i++) {
            city.push(resp[i].name);
        }
        container.textContent = city.sort();
    });


function timer(time) {
    return new Promise(function(resolve, reject) {
        setTimeout(() => { resolve(); }, time);
    });
}

function sentReq(url) {
    return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', url);
        req.responseType = 'json';
        req.send();
        req.addEventListener('load',function() {
            resolve(req.response);
        });
        req.addEventListener('error',function() {
            reject();
        });
    })
}
