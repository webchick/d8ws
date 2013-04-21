
var nodes = getFrontPage();
console.log(nodes);

/**
 * Get list of nodes from front page view.
 *
 * @todo Generalize this for any REST export view.
 *
 * @return array
 *   Array of JSON objects containing nodes.
 */
function getFrontPage() {
  // Get list of nodes from front page.
  xmlHttp = new XMLHttpRequest();
  xmlHttp.open('GET', '../node/rest', false);
  xmlHttp.setRequestHeader('Accept', 'application/hal+json');
  xmlHttp.send();

  // Check for common gotchas.
  if (xmlHttp.status == 404) {
    console.log('Did you forget to turn on REST module?');
    console.log('And did you add a "REST export" display on the front page view with a path of "node/rest"?');
    return false;
  }
  else if (xmlHttp.status == 500) {
    console.log('Did you remember to turn on the HAL module?');
    return false;
  }
  else if (xmlHttp.status == 200) {
    // OMG it worked! Let's grab us some JSON.
    nodes = JSON.parse(xmlHttp.response);
    if (nodes.length == 0) {
      console.log('Oops. Did you create any nodes?');
    }
    return nodes;
  }
}

/*
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
*/
