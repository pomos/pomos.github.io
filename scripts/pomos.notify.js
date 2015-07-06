var notify = function() {
  var self = this;

  self.preload = function() {
    try {
      if (Notification.permission !== "granted") {
        Notification.requestPermission();
      }

      self.active = true;
    } catch (e) {
      self.active = false;
    }
  };

  self.sendNotification = function(title, text) {
    if (!self.active) {
      return;
    }

    var data = {
      icon: 'icons/tomato-48.png',
      body: text,
    };

    try {
      new Notification(title, data);
    } catch (e) {
      console.log(e);
    }
  };

  return self;
}();


document.addEventListener('DOMContentLoaded', function () { notify.preload() });
