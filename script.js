function getGists() {
  var numPages = document.getElementsByName('filterNumPages')[0].value;
  for (var i = 1; i <= numPages; i++) {
    var httpRequest = new XMLHttpRequest();
    if (!httpRequest) {
      throw 'Unable to connect to the server';
      return;
    }
    var url = 'https://api.github.com/gists/public?page=' + i;
    httpRequest.onreadystatechange = function() {
      if (this.readyState === 4) {
        var gistsPage = JSON.parse(this.responseText);
        createGistsList(document.getElementById('gistsList'), gistsPage);
      }
    }
    httpRequest.open('GET', url);
    httpRequest.send();
  }
}

function Gists() {
  this.id = '';
  this.url = '';
  this.description = '';
  this.language = '';
  this.getId = function() {
    return this.id;
  }
  this.getUrl = function() {
    return this.url;
  }
  this.getDescription = function() {
    return this.description;
  }
  this.getLanguage = function() {
    return this.language;
  }
  this.setId = function(id) {
    this.id = id;
  }
  this.setUrl = function(url) {
    this.url = url;
  }
  this.setDescription = function(description) {
    this.description = description;
  }
  this.setLanguage = function(language) {
    this.language = language;
  }
}

function createGistsList(ul, gistsPage) {
  var gistsEntry = new Gists();
  for (var prop in gistsPage) {
    gistsEntry.setId(gistsPage[prop].id);
    gistsEntry.setUrl(gistsPage[prop].url);
    gistsEntry.setDescription(gistsPage[prop].description);
    for (var files in gistsPage[prop]) {
      for (var key in gistsPage[prop][files]) {
        language = gistsPage[prop][files][key].language;
        if (typeof language !== 'undefined') {
          gistsEntry.setLanguage(gistsPage[prop][files][key].language);
        }
        else if(typeof language === 'object') {
          gistsEntry.setLanguage('Null');
        }
      };
    };
    createGistsEntries(ul, gistsEntry);
  };
}

//add functionality for creating descriptions/urls
//add functionality for making descriptions/urls links and clickable
//start: Thu Jan 29 12:15:30 MST 2015
//end: Thu Jan 29 13:05:33 MST 2015
//start: Thu Jan 29 16:02:11 MST 2015
//end: Thu Jan 29 16:49:13 MST 2015
function createGistsEntries(ul, gistsEntry) {
  var nestedUl = document.createElement('ul');
  nestedUl.innerText = gistsEntry.getId();
  for (i = 0; i < 3; i++) {
    var li = document.createElement('li');
    if (i === 0) {
      var anchor = document.createElement('a');
      anchor.href = gistsEntry.getUrl();
      anchor.target = '_blank';
      anchor.innerText = gistsEntry.getUrl();
      li.appendChild(anchor);
      nestedUl.appendChild(li);
    }
    else if (i === 1) {
      li.innerText = 'Description: ' + gistsEntry.getDescription();
      nestedUl.appendChild(li);
    }
    else if (i === 2) {
      li.innerText = 'Language: ' + gistsEntry.getLanguage();
      nestedUl.appendChild(li);
    }
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
  if (pythonChecked && gistsEntry.getLanguage() === 'Python') {
    ul.appendChild(nestedUl);
    nestedUl.appendChild(input);
    return;
  }
  if (jsonChecked && gistsEntry.getLanguage() === 'JSON') {
    ul.appendChild(nestedUl);
    nestedUl.appendChild(input);
    return;
  }
  //check 'JavaScript' string for accuracy
  if (javascriptChecked && gistsEntry.getLanguage() === 'JavaScript') {
    ul.appendChild(nestedUl);
    nestedUl.appendChild(input);
    return;
  }
  if (sqlChecked && gistsEntry.getLanguage() === 'SQL') {
    ul.appendChild(nestedUl);
    nestedUl.appendChild(input);
    return;
  }
}

function saveFavoriteGists() {
  var favorite = document.getElementsByName('gistsEntry')[0].value;
  localStorage.setItem('favoriteGists', favorite);
}