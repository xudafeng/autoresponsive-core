/* ================================================================
 * autoresponsive-common by xdf(xudafeng[at]126.com)
 *
 * first created at : Mon Jun 02 2014 20:15:51 GMT+0800 (CST)
 *
 * ================================================================
 * Copyright 2014 xdf
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var LinkedList = require('./linkedlist');
var Util = require('./util');

var GridSort = (function () {
  function GridSort(options) {
    _classCallCheck(this, GridSort);

    this.containerWidth = options.containerWidth;
    this.gridWidth = options.gridWidth;
    this.init();
  }

  _createClass(GridSort, [{
    key: 'init',
    value: function init() {
      var curQuery = new LinkedList({});
      var span = Math.ceil(this.containerWidth / this.gridWidth);

      for (var i = 0; i < span; i++) {
        curQuery.add(0);
      }

      this.curQuery = curQuery;
    }
  }, {
    key: 'changeProps',
    value: function changeProps(props) {
      Util.merge(this, props);
    }
  }, {
    key: 'getPosition',
    value: function getPosition(width, height) {
      var num = Math.ceil(width / this.gridWidth);
      var cur = this.getCurrentPointer(num);

      for (var i = cur[0], len = num + cur[0], newH = cur[1] + height; i < len; i++) {
        this.curQuery.update(i, newH);
      }
      return [cur[0] * this.gridWidth, cur[1]];
    }
  }, {
    key: 'getCurrentPointer',
    value: function getCurrentPointer(num) {
      var min = Infinity;
      var idx = 0;
      var len = this.curQuery.size();

      for (var i = 0; i <= (len < num ? 0 : len - num); i++) {
        var max = -Infinity;
        var curValue = undefined;

        for (var j = 0; j < num; j++) {
          curValue = this.curQuery.get(i + j);

          if (curValue >= min) {
            i += j + 1;

            if (i > len - num) {
              max = min;
              break;
            }
            j = -1;
            max = -Infinity;
            continue;
          }

          if (curValue > max) {
            max = curValue;
          }
        }

        if (min > max) {
          min = max;
          idx = i;
        }
      }
      return [idx, min];
    }
  }]);

  return GridSort;
})();

module.exports = GridSort;