timer(3000).then(() => console.log('я вывелась через 3 секунды'));


function timer(time) {
    var promise = new Promise(function(resolve, reject) {
        setTimeout(() => { resolve(1); }, time);
    });

    return promise;
}

var req = new XMLHttpRequest();
req.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json', true);
req.onload = function() {
    var resp = JSON.parse(req.response);
    var city = [];
    for(var i = 0; i < resp.length; i++) {
        city[i] = resp[i].name;
    }
    console.log(city.sort());
};
req.send();
