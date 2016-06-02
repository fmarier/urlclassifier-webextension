function handleClick() {
  browser.urlClassifier.setFilters('||fmarier.org/img/francois_marier.jpg');
}

browser.browserAction.onClicked.addListener(handleClick);
