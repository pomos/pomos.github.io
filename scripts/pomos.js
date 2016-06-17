function drawFavicon(value) {
  var link = document.querySelector("link[rel~='icon']");

  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "shortcut icon");
    document.head.appendChild(link);
  }

  var faviconUrl = link.href || window.location.origin + "/icons/tomato-32.ico";

  function onImageLoaded() {
    var canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    var context = canvas.getContext("2d");
    context.font="12px Verdana";
    context.fillText(value, 0, 12);
    context.fill();
    link.type = "image/x-icon";
    link.href = canvas.toDataURL();
  };

  var img = document.createElement("img");
  img.addEventListener("load", onImageLoaded);
  img.src = faviconUrl;
};

function resetFavicon() {
     $("#favicon").attr('href', 'icons/tomato-32.png');
};

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

var mainViewModel = function(window) {
  var self = this;

  self.content = ko.observable('');
  self.mode = '';
  self.logs = ko.observableArray();

  self.theme = ko.observable();

  self.minutes = 0;
  self.seconds = 0;

  self.interval = null;

  self.isTicking = ko.observable(false);

  self.startPomodoro = function () {
    uiHelper.showTimer(function() {
      self.mode = 'pomodoro';
      self.minutes = 25;
      self.seconds = 0;

      self.startTicking();

      self.addLog('info', 'Started pomodoro');
      storage.storeStartPomodoro();
    });
  };

  self.startShortBreak = function() {
    uiHelper.showTimer(function() {
      self.mode = 'short';
      self.minutes = 5;
      self.seconds = 0;

      self.startTicking();

      self.addLog('info', 'Started short');
      storage.storeStartShort();
    });
  };

  self.startLongBreak = function() {
    uiHelper.showTimer(function() {
      self.mode = 'long';
      self.minutes = 15;
      self.seconds = 0;

      self.startTicking();

      self.addLog('info', 'Started long');
      storage.storeStartLong();
    });
  };

  self.stop = function() {
    if (self.mode.length > 0) {
      self.addLog('warning', 'Stopped ' + self.mode);
    }

    self.mode = '';
    self.minutes = 0;
    self.seconds = 0;

    self.stopTicking();
  };

  self.startTicking = function() {
    self.isTicking(true);
    notify.sendNotification('Started ' + self.mode, 'Left: ' + self.minutes + ' minutes');

    self.updateContent();

    if (self.interval != null) {
      clearInterval(self.interval);
    }

    self.interval = setInterval(self.tick, 1000);
  };

  self.stopTicking = function() {
    self.isTicking(false);
    uiHelper.hideTimer();
    clearInterval(self.interval);
    self.updateContent();
    resetFavicon();
  };

  self.tick = function() {
    if (self.mode != '') {
      self.seconds -= 1;

      if (self.seconds < 0) {
        self.seconds = 59;
        self.minutes -= 1;
      }

      if (self.minutes < 0) {
        self.finished();
        return;
      }

      if (self.minutes > 0) {
        drawFavicon(self.minutes);
      } else {
        drawFavicon(self.seconds);
      }

      if (self.minutes == 10 && self.seconds == 0) {
        notify.sendNotification('Pending ' + self.mode, 'Left: ' + self.minutes + ' minutes');
      }

      self.updateContent();
    }
  };

  self.finished = function() {
    notify.sendNotification('Finished ' + self.mode + '!', '');
    self.addLog('success', 'Finished ' + self.mode);

    if (self.mode == 'pomodoro') {
      storage.storeEndPomodoro();
    } else if (self.mode == 'short') {
      storage.storeEndShort();
    } else if (self.mode == 'long') {
      storage.storeEndLong();
    }

    self.mode = '';
    self.minutes = 0;
    self.seconds = 0;

    self.stopTicking();
  };

  self.updateContent = function() {
    if (self.mode == '') {
      self.content('');
    } else {
      self.content(pad(self.minutes, 2) + ':' + pad(self.seconds, 2));
    }
  };

  self.addLog = function(level, text) {
    var currentdate = new Date();
    var time = pad(currentdate.getHours(), 2) + ":"
          + pad(currentdate.getMinutes(), 2) + ":"
          + pad(currentdate.getSeconds(), 2);

    self.logs.unshift({ 'level': level, 'text': text, 'time': time });

    if (self.logs().length > 3) {
      self.logs.pop();
    }
  };

  self.showLogElement = function(elem) {
    if (elem.nodeType === 1) {
      $(elem).hide().slideDown();
    }
  };

  self.hideLogElement = function(elem) {
    if (elem.nodeType === 1) {
      $(elem).slideUp(function() { $(elem).remove(); });
    }
  };

  self.clearLog = function() {
    self.logs.removeAll();
  };

  self.loadTheme = function() {
    var v = storage.getSetting('theme');
    self.theme(v);
    console.log('Theme: ', v);
    $('#customCss').attr('href', v);
  };

  self.saveTheme = function() {
    storage.setSetting('theme', self.theme());
    self.loadTheme();
  };

  self.checkVersion = function() {
    var storageVersion = storage.getSetting('version');

    if (version != storageVersion) {
      $('#changelogDialog').modal('show')
      storage.setSetting('version', version);
    }
  };

  self.start = function() {
    self.loadTheme();

    if (storage.getSetting('start') == null) {
      $('#aboutDialog').modal('show');
      storage.setSetting('start', true);
    } else {
      self.checkVersion();
    }
  };

  return self;
}();
