Handlebars.registerHelper('formatDate', function(bdate) {
    if ((typeof bdate != "undefined")) {
        //date = bdate;
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
    let today = new Date();
    aDate.setDate(aDate.getDate() - 1);
    bDate.setDate(bDate.getDate() - 1);
    if ((typeof a.bdate != "undefined")) {
        aDate.setDate(a.bdate.split(".")[0]);
        aDate.setMonth(a.bdate.split(".")[1] - 1);
        if (aDate >= today) {
            aDate.setFullYear(aDate.getFullYear() - 1);
        }
        aDate.setDate(aDate.getDate() - today.getDate());
        aDate.setMonth(aDate.getMonth() - today.getMonth());
    }
    if ((typeof b.bdate != "undefined")) {
        bDate.setDate(b.bdate.split(".")[0]);
        bDate.setMonth(b.bdate.split(".")[1] - 1);
        if (bDate >= today) {
            bDate.setFullYear(bDate.getFullYear() - 1);
        }
        bDate.setDate(bDate.getDate() - today.getDate());
        bDate.setMonth(bDate.getMonth() - today.getMonth());
    }

  if (aDate < bDate) {
    return -1;
  }
  if (aDate > bDate) {
    return 1;
  }
  // a must be equal to b
  return 0;
}
