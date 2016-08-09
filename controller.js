window.addEventListener("YTPBAction", function (e) {
    var cmd = e.detail.action;

    console.log("⏩ YTPBAction received: " + cmd);

    var player = document.querySelector(".html5-video-player");
    if (player) {
        var rates = player.getAvailablePlaybackRates();
        var curRateInd = rates.indexOf(player.getPlaybackRate());

        curRateInd += (cmd == "speedUp") ? 1 : -1;

        if (curRateInd >= rates.length) curRateInd = rates.length - 1;
        if (curRateInd < 0) curRateInd = 0;

        var newRate = rates[curRateInd];
        player.setPlaybackRate(newRate);
        console.log("⏩ new rate: " + player.getPlaybackRate());
    }
});

console.log("⏩ INJECT complete.");
