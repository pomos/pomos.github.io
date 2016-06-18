var summaryViewModel = function() {
  var self = this;

  self.closing = false;

  $(function() {
    $('#summaryDialog').on('hide.bs.modal', function(e) {
      if (!self.closing) {
        storage.cancelPomodoro();
      }
    });
  });

  self.openSummaryDialog = function() {
    self.closing = false;
    $('#summaryDialog').modal('show');
  };

  self.onFinished = function() {
    self.closing = true;
    $('#summaryDialog').modal('hide');
    storage.storeEndPomodoro();
  };

  self.onExternal = function() {
    self.closing = true;
    $('#summaryDialog').modal('hide');
    storage.storeExternalInterrupt();
  };

  self.onInternal = function() {
    self.closing = true;
    $('#summaryDialog').modal('hide');
    storage.storeInternalInterrupt();
  };

  self.onCancel = function() {
    self.closing = true;
    $('#summaryDialog').modal('hide');
    storage.cancelPomodoro();
  };

  return self;
}();
