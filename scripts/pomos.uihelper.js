var uiHelper = function() {
  var self = this;

  self.hideTimer = function(onFinished) {
    $('#timer').animate({ height: '20px' }, 300, onFinished);
  };

  self.showTimer = function(onFinished) {
    $('#timer').animate({ height: '140px' }, 300, onFinished);
  };

  return self;
}();
