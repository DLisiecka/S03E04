(function() {

    function findIn(parent, elem) {
        return parent.querySelector(elem);
    }

    function Player(container) {

        this.video = findIn(container, "video");
        this.playPause = findIn(container, ".player__play");
        this.timeCurrent = findIn(container, ".player__time-current");
        this.timeTotal = findIn(container, ".player__time-total");
        this.timeline = findIn(container, ".player__timeline input");
        this.volume = findIn(container, ".player__volume input");

        this.setCurrentVolume();
        this.assignEventListeners();

    }

    Player.prototype.assignEventListeners = function() {

        this.video.onclick = this.play.bind(this);
        this.playPause.onclick = this.play.bind(this);
        this.video.ondurationchange = this.setDuration.bind(this);
        this.video.addEventListener("timeupdate", this.updateCurrentTime.bind(this), false);
        this.video.addEventListener("timeupdate", this.updatePlayingProgress.bind(this), false);
        this.video.onended = this.resetPlayer.bind(this);
        this.timeline.oninput = this.setCurrentPlayback.bind(this);
        this.volume.oninput = this.adjustVolume.bind(this);

    };

    Player.prototype.play = function(e) {

        if(this.video.paused) {
            this.video.play();

            this.playPause.classList.add("pause");
        } else {
            this.video.pause();

            this.playPause.classList.remove("pause");
        }

    };

    Player.prototype.updatePlayingProgress = function() {
        var percentPlayed = (this.video.currentTime / this.video.duration) * 100;

        this.timeline.value = percentPlayed;
    };

    Player.prototype.setCurrentPlayback = function(e) {

        var newTime = this.video.duration * parseInt(e.target.value) / 100;

        this.video.currentTime = newTime;
    }

    Player.prototype.setDuration = function() {
        this.timeTotal.textContent = this.formatTime(this.video.duration);
    };

    Player.prototype.updateCurrentTime = function() {
        this.timeCurrent.textContent = this.formatTime(this.video.currentTime);
    };

    Player.prototype.setCurrentVolume = function() {
        this.volume.value = (this.video.volume * 100);
    };

    Player.prototype.adjustVolume = function(e) {
        this.video.volume = parseInt(e.target.value) / 100;
    }

    Player.prototype.resetPlayer = function() {
        this.playPause.classList.remove("pause");
    };

    Player.prototype.formatTime = function(seconds) {

        var seconds = Math.round(seconds),
            minutes = Math.floor(seconds / 60),
            remainingSeconds = seconds - minutes * 60;

        if(remainingSeconds == 0)
            remainingSeconds = "00";
        else if(remainingSeconds < 10)
            remainingSeconds = "0" + remainingSeconds;

        return minutes + ":" + remainingSeconds;
    };

        var player = new Player(document.querySelector("#player"));;
})();