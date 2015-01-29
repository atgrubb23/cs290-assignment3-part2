function getGists() {
  var numPages = document.getElementsByName('filterNumPages')[0].value;
  for (var i = 1; i <= numPages; i++) {
    var httpRequest = new XMLHttpRequest();
    if (!httpRequest) {
      throw 'Unable to connect to the server';
    }
    var url = 'https://api.github.com/gists/public?page=' + i;
    httpRequest.onreadystatechange = function() {
      if (this.readyState === 4) {
        var gists = JSON.parse(this.responseText);
        createGistsList(document.getElementById('gistsList'), gists);
      }
    }
    httpRequest.open('GET', url);
    httpRequest.send();
  }
}

function createGistsList(ul, obj) {
  for (var prop in obj) {
    var url = obj[prop].url;
    var description = obj[prop].description;
    for (var files in obj[prop]) {
      for (var key in obj[prop][files]) {
        var language = obj[prop][files][key].language;
        if (typeof language !== 'undefined') {
          if(typeof language === 'object') {
            language = 'Null';
          }
          createGistsEntry(ul, url, description, language);
        }
      };
    };     
  };
}

//add functionality for creating descriptions/urls
//add functionality for making descriptions/urls links and clickable
//start: Thu Jan 29 12:15:30 MST 2015
//end: Thu Jan 29 13:05:33 MST 2015
//start: Thu Jan 29 16:02:11 MST 2015
//end: Thu Jan 29 16:49:13 MST 2015
function createGistsEntry(ul, url, description, language) {
  var nestedUl = document.createElement('ul');
  for (i = 0; i < 3; i++) {
    var li = document.createElement('li');
    if (i === 0) {
      li.innerText = url;
    }
    else if (i === 1) {
      li.innerText = description;
    }
    else if (i === 2) {
      li.innerText = language;
    }
    nestedUl.appendChild(li);
  }
  var input = document.createElement('input');
  input.type = 'button';
  input.value = 'Favorite';
  input.onclick = function() {
    console.log('Saving a favorite...');
    //localStorage.setItem('aFavorite', document.getElementsByName('gistsEntry')[0].value);
  };
  var pythonChecked = document.getElementsByName('filterPython')[0].checked;
  var jsonChecked = document.getElementsByName('filterJSON')[0].checked;
  var javascriptChecked = document.getElementsByName('filterJavascript')[0].checked;
  var sqlChecked = document.getElementsByName('filterSQL')[0].checked;
  if (!pythonChecked && !jsonChecked && !javascriptChecked && !sqlChecked) {
    ul.appendChild(nestedUl);
    nestedUl.appendChild(input);
    return;    
  }
  if (pythonChecked && language === 'Python') {
    ul.appendChild(nestedUl);
    nestedUl.appendChild(input);
    return;
  }
  if (jsonChecked && language === 'JSON') {
    ul.appendChild(nestedUl);
    nestedUl.appendChild(input);
    return;
  }
  //check 'JavaScript' string for accuracy
  if (javascriptChecked && language === 'JavaScript') {
    ul.appendChild(nestedUl);
    nestedUl.appendChild(input);
    return;
  }
  if (sqlChecked && language === 'SQL') {
    ul.appendChild(nestedUl);
    nestedUl.appendChild(input);
    return;
  }
}

function saveFavoriteGists() {
  var favorite = document.getElementsByName('gistsEntry')[0].value;
  localStorage.setItem('favoriteGists', favorite);
}