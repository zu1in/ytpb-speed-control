chrome.tabs.onUpdated.addListener(function (tabId, info) {
    if (info.status == "complete") {
        chrome.tabs.sendMessage(tabId, { action: 'inject' });
        console.log("⏩ tab is LOADED!");
    }
});

chrome.commands.onCommand.addListener(function (command) {

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log("⏩ Command received: " + command + " @ " + tabs[0].id);

        chrome.tabs.sendMessage(tabs[0].id, { action: command });
    });
});

console.log("⏩ BG script init OK");
