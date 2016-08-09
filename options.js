// options
"use strict";

document.addEventListener('DOMContentLoaded', function() {
    // restore_options();

    // global enable
    document.querySelector('.is_on input').addEventListener('change', function(e) {
        save_options();
    });

});

function showStatus(text) {
    var status = document.getElementById('status');
    status.textContent = text;
    status.style.display = 'block';
    setTimeout(function() {
        status.textContent = '';
        status.style.display = 'none';
    }, 2000);
}


// Saves options to chrome.storage.sync.
function save_options() {

    chrome.storage.sync.set({
        cmdUp: shortcutUp,
        cmdDown: shortcutDown
    }, function() {
        showStatus("Settings saved.")
    });
}

// Get options from chrome.storage.sync.
/*function restore_options() {
    chrome.storage.sync.get({
        cmdUp: shortcutUp,
        cmdDown: shortcutDown
    }, function(items) {
        		document.querySelector('.is_on input').checked = items.enabled;
        		providersCurrent = items.providers;
        		if (providersCurrent.length < providersDefault.length) {
        			providersCurrent = mergeProviders(providersCurrent);
        		}

        		generateProvidersList();
        
    });
}
*/