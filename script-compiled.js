'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
  function Player() {
    _classCallCheck(this, Player);

    this.ex = 'player test';
  }

  _createClass(Player, [{
    key: 'test',
    value: function test() {
      console.log(this.ex);
    }
  }]);

  return Player;
}();

document.addEventListener('DOMContentLoaded', function () {
  var player = new Player();
  player.test();
});
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Video = function () {
  function Video() {
    _classCallCheck(this, Video);

    this.newvid = document.createElement('div');
    this.studvid = document.createElement('div');
    this.funvid = document.createElement('div');

    this.newvid.setAttribute('class', 'video');
    this.studvid.setAttribute('class', 'video');
    this.funvid.setAttribute('class', 'video');
  }

  _createClass(Video, [{
    key: 'test',
    value: function test() {
      console.log(this.ex);
    }
  }]);

  return Video;
}();

document.addEventListener('DOMContentLoaded', function () {
  var video = new Video();
  video.load();
});

//# sourceMappingURL=script-compiled.js.map