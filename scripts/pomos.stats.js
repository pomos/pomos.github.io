var statisticsViewModel = function() {
  var self = this;

  self.pomosStarted = ko.observable();
  self.pomosFinished = ko.observable();
  self.pomosPercent = ko.observable();

  self.shortStarted = ko.observable();
  self.shortFinished = ko.observable();
  self.shortPercent = ko.observable();

  self.longStarted = ko.observable();
  self.longFinished = ko.observable();
  self.longPercent = ko.observable();

  self.load = function() {
    var stats = storage.getTodayStatistics();

    self.pomosStarted(stats['pomodorosStarted']);
    self.pomosFinished(stats['pomodorosFinished']);

    if (stats['pomodorosStarted'] > 0) {
      self.pomosPercent(Math.round(100 * stats['pomodorosFinished'] / stats['pomodorosStarted']) + '%');
    } else {
      self.pomosPercent('-');
    }

    self.shortStarted(stats['shortStarted']);
    self.shortFinished(stats['shortFinished']);

    if (stats['shortStarted'] > 0) {
      self.shortPercent(Math.round(100 * stats['shortFinished'] / stats['shortStarted']) + '%');
    } else {
      self.shortPercent('-');
    }

    self.longStarted(stats['longStarted']);
    self.longFinished(stats['longFinished']);

    if (stats['longStarted'] > 0) {
      self.longPercent(Math.round(100 * stats['longFinished'] / stats['longStarted']) + '%');
    } else {
      self.longPercent('-');
    }
  };

  return self;
}();
