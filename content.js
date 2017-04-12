(function () {
    const log = console.log;

    var Extension = function () {

        Extension.prototype.injectController = function () {
            var controllerPresent = document.getElementById("YPBSController");
            if (controllerPresent) {
                log("⏩ Skipping inject: CONTROLLER is present.");
                return;
            }

            var p = document.querySelector('.html5-video-player');
            if (p) {
                // JS
                var script = document.createElement('script');
                script.id = "YPBSController";
                script.src = chrome.extension.getURL('controller.js');
                script.onload = function () {
                    log("⏩ CONTROLLER script loaded.");
                };
                (document.head || document.documentElement).appendChild(script);

                // CSS
                var css = document.createElement('link');
                css.href = chrome.extension.getURL('info.css');
                css.rel = "stylesheet";
                css.type = "text/css";
                (document.head || document.documentElement).appendChild(css);

                // HTML
                var container = document.createElement('div');
                container.id = "ytpb-info-container";
                container.innerHTML = "<div id='ytpb-info'><p id='ytpb-text'>00</p></div>";
                document.body.insertBefore(container, document.body.childNodes[0]);

                log("⏩ INJECT COMPLETE");
            } else {
                log("⏩ Skipping inject: No player found.");
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
        log("⏩ CONTENT script init OK.");

        chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
            // NOTE: there may be many of these messages. As many as number of iframes in the document.
            var msgSource = sender.tab ? "content script: " + sender.tab.url : "extension";
            log("⏩ onMessage: request = '" + request.action + "' sender = '" + msgSource + "'");

            if (request.action == 'speedUp' || request.action == 'slowDown') {
                ExtensionInstance.sendCommand(request.action);
            } else
                if (request.action == 'inject') {
                    ExtensionInstance.injectController();
                }
        });
    } else {
        log("⏩ Something went wrong :(");
    }

}());