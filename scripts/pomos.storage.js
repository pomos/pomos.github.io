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

  self.cancelPomodoro = function() {
    if (!self.isEnabled()) {
      return;
    }

    var stat = self.getTodayStatistics();
    stat['pomodorosStarted'] -= 1;
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

  self.storeStartLong = function() {
    if (!self.isEnabled()) {
      return;
    }

    var stat = self.getTodayStatistics();
    stat['longStarted'] += 1;
    self.storeTodayStatistics(stat);
  };

  self.storeInternalInterrupt = function() {
    if (!self.isEnabled()) {
      return;
    }

    var stat = self.getTodayStatistics();
    stat['pomodorosInternalInterrupted'] += 1;
    self.storeTodayStatistics(stat);
  };

  self.storeExternalInterrupt = function() {
    if (!self.isEnabled()) {
      return;
    }

    var stat = self.getTodayStatistics();
    stat['pomodorosExternalInterrupted'] += 1;
    self.storeTodayStatistics(stat);
  };

  self.storeTodayStatistics = function(stat) {
    if (!self.isEnabled()) {
      return;
    }

    var today = self.getToday();

    localStorage['stat-' + today] = ko.toJSON(stat);
  };

	self.addNote = function(note) {
		if (!self.isEnabled()) {
			alert('Local storage not enabled. Unable to save note');
      return;
    }

		if (localStorage['note'] == null) {
			localStorage['note'] = '- ' + note;
		} else {
			localStorage['note'] += '\n- ' + note;
		}
	};

	self.getNotes = function() {
		if (!self.isEnabled()) {
			return '';
    }

		var note = localStorage['note'];
		localStorage.removeItem('note');

		return note;
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
        'pomodorosInternalInterrupted': 0,
        'pomodorosExternalInterrupted': 0
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

  self.setSetting = function(name, value) {
    if (!self.isEnabled()) {
      return;
    }

    var settings = localStorage['settings'];

    if (settings != null) {
      settings = JSON.parse(settings);
    } else {
      settings = {
        'theme': '',
        'version': ''
      }
    }

    settings[name] = value;

    localStorage['settings'] = ko.toJSON(settings);

    console.log('Saved settings', settings);
  }

  self.getSetting = function(name) {
    if (!self.isEnabled()) {
      return;
    }

    var settings = localStorage['settings'];

    if (settings != null) {
      settings = JSON.parse(settings);
      return settings[name];
    } else {
      return null;
    }
  };

  return self;
}();
