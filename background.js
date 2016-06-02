function handleClick() {
  var url = 'https://people.mozilla.org/~fmarier/block.txt';
  var myRequest = new Request(url);
  fetch(myRequest).then(function(response) {
    if (response.ok) {
      response.text().then(function (text) {
        browser.urlClassifier.setFilters(text);
      });
    } else {
      console.log('Failed to fetch filters at ' + url + ': ' + response.statusText);
    }
  });
}

browser.browserAction.onClicked.addListener(handleClick);
