Handlebars.registerHelper('formatDate', function(bdate) {
    if ((typeof bdate != "undefined")) {
        return 'Дата рождения: ' + bdate;
    }
    return 'Дата рождения не указана';
});

new Promise(function(resolve) {
  if (document.readyState == 'complete') {
    resolve();
  } else {
    window.onload = resolve;
  }
}).then(function() {
  return new Promise(function(resolve, reject) {
    VK.init({
      apiId: 5791657
    });

    VK.Auth.login(function(response) {
      if (response.session) {
        resolve(response);
      } else {
        reject(new Error('Не удалось авторизоваться'));
      }
  }, 2);
  });
}).then(function() {
  return new Promise(function(resolve, reject) {
    VK.api('users.get', {'name_case': 'gen'}, response => {
      if (response.error) {
        reject(new Error(response.error.error_msg));
      } else {
        headerInfo.textContent = `Друзья на странице ${response.response[0].first_name} ${response.response[0].last_name}`;

        resolve();
      }
    });
  });
}).then(function() {
  return new Promise(function(resolve, reject) {
    VK.api('friends.get', {fields: 'bdate, photo_100'}, function(serverAnswer) {
      if (serverAnswer.error) {
        reject(new Error(serverAnswer.error.error_msg));
      } else {
        let source = friendItemTemplate.innerHTML;
        let templateFn = Handlebars.compile(source);
        let template = templateFn({ list: serverAnswer.response.sort(compare) });
        results.innerHTML = template;

        resolve();
      }
    });
  });
}).catch(function(e) {
  alert(`Ошибка: ${e.message}`);
});

function compare(a, b) {
    let aDate = new Date();
    let bDate = new Date();
    aDate = prepareDate(aDate , a.bdate);
    bDate = prepareDate(bDate , b.bdate);

    if (aDate < bDate) {
        return -1;
    }
    if (aDate > bDate) {
        return 1;
    }
    // a must be equal to b
    return 0;
}

function prepareDate(xDate, baseDate) {
    let today = new Date();
    xDate.setDate(xDate.getDate() - 1);
    if ((typeof baseDate != "undefined")) {
        xDate.setDate(baseDate.split(".")[0]);
        xDate.setMonth(baseDate.split(".")[1] - 1);
        if (xDate >= today) {
            xDate.setFullYear(xDate.getFullYear() - 1);
        }
        xDate.setDate(xDate.getDate() - today.getDate());
        xDate.setMonth(xDate.getMonth() - today.getMonth());
    }
    return xDate;
}
