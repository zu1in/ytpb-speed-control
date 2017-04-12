const log = console.log;

chrome.webNavigation.onCompleted.addListener(function (details) {
    chrome.tabs.sendMessage(details.tabId, { action: 'inject', origin: 'frameLoaded' });
    log("⏩ iframe LOADED");
}, {
        url: [{
            // make sure we're targeting youtube player only
            hostContains: '.youtube.'
        }]
    }
);

chrome.tabs.onUpdated.addListener(function (tabId, info) {
    if (info.status == "complete") {
        chrome.tabs.sendMessage(tabId, { action: 'inject', origin: 'tabUpdated' });
        log("⏩ tab is LOADED!");
    }
});

chrome.commands.onCommand.addListener(function (command) {

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        log("⏩ Command received: " + command + " @ " + tabs[0].id);

        chrome.tabs.sendMessage(tabs[0].id, { action: command });
    });
});

log("⏩ BG script init OK");
