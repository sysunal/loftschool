Handlebars.registerHelper('formatDate', function(bdate) {
    var date = new Date(0);
    if ((typeof bdate != "undefined")) {
        //date = bdate;
        return 'Дата рождения: ' + bdate;
    }
    //let today = new Date();

    let age = date.getMonth() + 1;
    return 'Дата рождения: ' + date.getDate() + '.' + age + '.' + date.getFullYear();
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
        console.log(serverAnswer.response);
        let source = friendItemTemplate.innerHTML;
        let templateFn = Handlebars.compile(source);
        let template = templateFn({ list: serverAnswer.response });

        results.innerHTML = template;

        resolve();
      }
    });
  });
}).catch(function(e) {
  alert(`Ошибка: ${e.message}`);
});
