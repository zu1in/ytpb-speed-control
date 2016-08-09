var Extension = function () {

    Extension.prototype.injectController = function () {
        var controllerPresent = document.getElementById("YPBSController");
        if (controllerPresent) {
            console.log("⏩ CONTROLLER is present. Skipping inject.");
            return;
        }

        var p = document.querySelector('.html5-video-player');
        if (p) {
            var s = document.createElement('script');
            s.id = "YPBSController";
            s.src = chrome.extension.getURL('controller.js');
            s.onload = function () {
                console.log("⏩ CONTROLLER script loaded.");
            };
            (document.head || document.documentElement).appendChild(s);
        }
    };

    Extension.prototype.sendCommand = function (cmd) {
        var evt = document.createEvent("CustomEvent");
        evt.initCustomEvent("YTPBAction", true, true, { action: cmd });
        document.dispatchEvent(evt);
    };
};

var ExtensionInstance = new Extension();

if (ExtensionInstance) {
    console.log("⏩ CONTENT script init OK.");

    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        // NOTE: there may be many of these messages. As many as number of iframes in the document.
        console.log("⏩ onMessage: request = '" + request.action + "' sender = '" + sender.tab + "'");

        if (request.action == 'speedUp' || request.action == 'slowDown') {
            ExtensionInstance.sendCommand(request.action);
        } else
            if (request.action == 'inject') {
                ExtensionInstance.injectController();
            }
    });
}
