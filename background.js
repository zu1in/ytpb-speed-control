const log = console.log;

chrome.webNavigation.onCompleted.addListener(function (details) {
    chrome.tabs.sendMessage(details.tabId, { action: 'inject' });
    log("⏩ iframe LOADED");
}, {
        url: [{
            // make sure we're targeting youtube player only
            hostContains: '.youtube.'
        }]
    }
);

chrome.commands.onCommand.addListener(function (command) {

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        log("⏩ Command received: " + command + " @ " + tabs[0].id);

        chrome.tabs.sendMessage(tabs[0].id, { action: command });
    });
});

log("⏩ BG script init OK");
