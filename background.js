function getFiltersUrl(callback) {
  browser.storage.local.get('config', function (keys) {
    console.log("config=" + JSON.stringify(keys));
    if (!keys || !keys.config || !keys.config.filtersUrl) {
      callback("");
    } else {
      callback(keys.config.filtersUrl);
    }
  });
}

function saveConfig(config, callback) {
  browser.storage.local.set({config: config}, callback);
}

function handleClick() {
  getFiltersUrl(function (url) {
    console.log('Fetching filters at ' + url + '...');
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
  });
}

function init() {
  browser.browserAction.onClicked.addListener(handleClick);
}

getFiltersUrl(function (url) {
  if (!url) {
    saveConfig({filtersUrl: 'https://people.mozilla.org/~fmarier/block.txt'}, init);
  } else {
    init();
  }
});
