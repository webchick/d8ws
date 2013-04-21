// Get list of nodes from front page.
xmlHttp = new XMLHttpRequest();
xmlHttp.open('GET', '../node/rest', false);
xmlHttp.setRequestHeader('Accept', 'application/hal+json');
xmlHttp.send();
json = xmlHttp.response;
results = JSON.parse(json);

// Print list of nodes.
for (var i = 0; i < results.length; i++) {
  var node = results[i];
  printNode(node);
}

function printNode(node) {
  var ul = document.getElementById("list");
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(node.title[0].value));
  ul.appendChild(li);
  console.log(node.title[0].value);
  console.log(node);
}
