sentReq('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json')
    .then(function(resp) {
        let source = cityTemplate.innerHTML;
        let templateFn = Handlebars.compile(source);
        let template = templateFn({ list: resp.sort(compare)});
        results.innerHTML = template;
    });

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

function compare(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  // a must be equal to b
  return 0;
}
