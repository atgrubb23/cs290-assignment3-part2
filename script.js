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
        console.log(obj[prop][files]);
      };
      
  };
  //var li = document.createElement('li');
  //li.innerText = gists;
  //ul.appendChild(li);
}
