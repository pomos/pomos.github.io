function NotesViewModel() {
	var self = this;

	self.note = ko.observable();

	$(function() {
		$('#notesDialog').on('show.bs.modal', function (e) {
			setTimeout(function() { $('#notesText').focus(); }, 500);
		});
	});

	self.openDialog = function() {
		self.note('');
		$('#notesDialog').modal('show');
	};

	self.onSave = function() {
		$('#notesDialog').modal('hide');

		var text = self.note().trim();

		if (text.length > 0) {
			storage.addNote(text);
		}
	};

	self.onCancel = function() {
		$('#notesDialog').modal('hide');
	}
};

var notesViewModel = new NotesViewModel();
