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

var elem = document.getElementById('filtersUrl');
getFiltersUrl(function (url) {
  elem.value = url;
});

elem.onchange = function () {
  saveConfig({filtersUrl: elem.value}, function () {
    console.log("Updated filtersUrl to " + elem.value);
  });
};
