var statisticsViewModel = function() {
  var self = this;

  self.pomosStarted = ko.observable();
  self.pomosFinished = ko.observable();
  self.pomosInternalInterrupted = ko.observable();
  self.pomosExternalInterrupted = ko.observable();
  self.pomosPercent = ko.observable();

  self.shortStarted = ko.observable();

  self.longStarted = ko.observable();

  self.load = function() {
    var stats = storage.getTodayStatistics();

    self.pomosStarted(stats['pomodorosStarted']);
    self.pomosFinished(stats['pomodorosFinished']);
    self.pomosInternalInterrupted(stats['pomodorosInternalInterrupted']);
    self.pomosExternalInterrupted(stats['pomodorosExternalInterrupted']);

    if (stats['pomodorosStarted'] > 0) {
      self.pomosPercent(Math.round(100 * stats['pomodorosFinished'] / stats['pomodorosStarted']) + '%');
    } else {
      self.pomosPercent('-');
    }

    self.shortStarted(stats['shortStarted']);
    self.longStarted(stats['longStarted']);
  };

  return self;
}();
