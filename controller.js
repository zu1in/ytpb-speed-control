(function () {
    const log = console.log;

    window.addEventListener("YTPBAction", function (e) {
        var cmd = e.detail.action;

        log("⏩ YTPBAction received: " + cmd);

        var player = document.querySelector(".html5-video-player");
        var isCurrentlyPlaying = player ? player.classList.contains("playing-mode") : false;

        if (player && isCurrentlyPlaying) {
            var rates = player.getAvailablePlaybackRates();
            var curRateInd = rates.indexOf(player.getPlaybackRate());

            curRateInd += (cmd == "speedUp") ? 1 : -1;

            if (curRateInd >= rates.length) curRateInd = rates.length - 1;
            if (curRateInd < 0) curRateInd = 0;

            var newRate = rates[curRateInd];
            player.setPlaybackRate(newRate);
            log("⏩ new rate: " + player.getPlaybackRate());

            var info = document.getElementById("ytpb-info");
            var text = document.getElementById("ytpb-text");
            if (info && text) {
                text.innerHTML = "×" + newRate;
                info.classList.remove("grow");
                info.offsetWidth;// force reflow
                info.classList.add("grow");
            }
        }
    });

    log("⏩ INJECT loaded.");
}());