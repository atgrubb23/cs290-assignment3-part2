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
    for (var files in obj[prop]) {
      for (var key in obj[prop][files]) {
        var language = obj[prop][files][key].language;
        if (typeof language !== 'undefined') {
          createGistEntry(ul, language);
          var li = document.createElement('li');

        }
      };
    };     
  };
}

//add functionality for creating descriptions/urls
//add functionality for making descriptions/urls links and clickable
//start: Thu Jan 29 12:15:30 MST 2015
//begin: Thu Jan 29 13:05:33 MST 2015
function createGistEntry(ul, language) {
  var li = document.createElement('li');
  var pythonChecked = document.getElementsByName('filterPython')[0].checked;
  var jsonChecked = document.getElementsByName('filterJSON')[0].checked;
  var javascriptChecked = document.getElementsByName('filterJavascript')[0].checked;
  var sqlChecked = document.getElementsByName('filterSQL')[0].checked;
  if (!pythonChecked && !jsonChecked && !javascriptChecked && !sqlChecked) {
    li.innerText = language;
    ul.appendChild(li);
    return;    
  }
  if (pythonChecked && language === 'Python') {
    li.innerText = language;
    ul.appendChild(li);
    return;
  }
  if (jsonChecked && language === 'JSON') {
    li.innerText = language;
    ul.appendChild(li);
    return;
  }
  //check 'JavaScript' string for accuracy
  if (javascriptChecked && language === 'JavaScript') {
    li.innerText = language;
    ul.appendChild(li);
    return;
  }
  if (sqlChecked && language === 'SQL') {
    li.innerText = language;
    ul.appendChild(li);
    return;
  }
}