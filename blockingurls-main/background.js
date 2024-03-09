chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason === "install") {
        chrome.runtime.openOptionsPage();
    }
});

chrome.runtime.setUninstallURL("http://your-uninstall-survey-or-page.com");
