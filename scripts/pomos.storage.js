var storage = function() {
  var self = this;

  self.isEnabled = function() {
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
      return false;
    }
  };

  self.clear = function() {
    if (!self.isEnabled()) {
      return;
    }

    localStorage.clear();
  };

  self.storeStartPomodoro = function() {
    if (!self.isEnabled()) {
      return;
    }

    var stat = self.getTodayStatistics();
    stat['pomodorosStarted'] += 1;
    self.storeTodayStatistics(stat);
  };

  self.storeEndPomodoro = function() {
    if (!self.isEnabled()) {
      return;
    }

    var stat = self.getTodayStatistics();
    stat['pomodorosFinished'] += 1;
    self.storeTodayStatistics(stat);
  };

  self.storeStartShort = function() {
    if (!self.isEnabled()) {
      return;
    }

    var stat = self.getTodayStatistics();
    stat['shortStarted'] += 1;
    self.storeTodayStatistics(stat);
  };

  self.storeEndShort = function() {
    if (!self.isEnabled()) {
      return;
    }

    var stat = self.getTodayStatistics();
    stat['shortFinished'] += 1;
    self.storeTodayStatistics(stat);
  };

  self.storeStartLong = function() {
    if (!self.isEnabled()) {
      return;
    }

    var stat = self.getTodayStatistics();
    stat['longStarted'] += 1;
    self.storeTodayStatistics(stat);
  };

  self.storeEndLong = function() {
    if (!self.isEnabled()) {
      return;
    }

    var stat = self.getTodayStatistics();
    stat['longFinished'] += 1;
    self.storeTodayStatistics(stat);
  };

  self.storeTodayStatistics = function(stat) {
    if (!self.isEnabled()) {
      return;
    }

    var today = self.getToday();

    localStorage['stat-' + today] = ko.toJSON(stat);
  };

  self.getTodayStatistics = function() {
    if (!self.isEnabled()) {
      return;
    }

    var today = self.getToday();

    var stat = localStorage['stat-' + today];

    if (stat != null) {
      stat = JSON.parse(stat);
    } else {
      stat = {
        'pomodorosStarted': 0,
        'shortStarted': 0,
        'longStarted': 0,
        'pomodorosFinished': 0,
        'shortFinished': 0,
        'longFinished': 0
      };
    }

    return stat;
  };

  self.getToday = function() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    return yyyy + pad(mm, 2) + pad(dd, 2);
  }

  return self;
}();
