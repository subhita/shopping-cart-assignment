var data = require("./handlebars.js");

var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'data/categories/index.get.json');
ourRequest.onload = function() {
  console.log(ourRequest);
  if (ourRequest.status >= 200 && ourRequest.status < 400) {
    // This is where we'll do something with the retrieved data
    var data = JSON.parse(ourRequest.responseText);
    console.log(data);
    createHTML(data);
  } else {
    console.log("We connected to the server, but it returned an error.");
  }
};

ourRequest.onerror = function() {
  console.log("Connection error");
};

ourRequest.send();

function createHTML(petsData) {
  var rawTemplate = document.getElementById("categories-template").innerHTML;
  var compiledTemlate = data.compile(rawTemplate);
  var ourData = compiledTemlate(petsData);

  var petsContainer = document.getElementById("categories-id");
    console.log(ourData);
  petsContainer.innerHTML = ourData;
}


 