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
  input.value = 'Favorite!';
  input.onclick = 'saveFavoriteGists(gistsEntry)';
  displayGistsEntries(ul, nestedUl, input);
}

function displayGistsEntries(ul, entry, button) {
  var pythonChecked = document.getElementsByName('filterPython')[0].checked;
  var jsonChecked = document.getElementsByName('filterJSON')[0].checked;
  var javascriptChecked = document.getElementsByName('filterJavascript')[0].checked;
  var sqlChecked = document.getElementsByName('filterSQL')[0].checked;
  if (!pythonChecked && !jsonChecked && !javascriptChecked && !sqlChecked) {
    ul.appendChild(entry);
    entry.appendChild(button);
    return;    
  }
  if (pythonChecked && gistsEntry.getLanguage() === 'Python') {
    ul.appendChild(entry);
    entry.appendChild(button);
    return;
  }
  if (jsonChecked && gistsEntry.getLanguage() === 'JSON') {
    ul.appendChild(entry);
    entry.appendChild(button);
    return;
  }
  if (javascriptChecked && gistsEntry.getLanguage() === 'JavaScript') {
    ul.appendChild(entry);
    entry.appendChild(button);
    return;
  }
  if (sqlChecked && gistsEntry.getLanguage() === 'SQL') {
    ul.appendChild(entry);
    entry.appendChild(button);
    return;
  }
}

function saveFavoriteGists(gistsEntry) {
  localStorage.setItem('id', gistsEntry.getId());
}