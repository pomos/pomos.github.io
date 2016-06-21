var summaryViewModel = function() {
  var self = this;

  self.closing = false;

	self.hasNotes = ko.observable(false);
	self.notes = ko.observable();

  $(function() {
    $('#summaryDialog').on('hide.bs.modal', function(e) {
      if (!self.closing) {
        storage.cancelPomodoro();
      }
    });
  });

  self.openSummaryDialog = function() {

		var notes = storage.getNotes();

		if (notes == undefined || notes == null || notes.length == 0) {
			self.hasNotes(false);
			self.notes('');
		} else {
			self.hasNotes(true);
			self.notes(notes.replace(/\n/g, "<br />"));
		}

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
