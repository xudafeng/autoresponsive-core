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

"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LinkedList = (function () {
  function LinkedList(cfg) {
    _classCallCheck(this, LinkedList);

    this.length = 0;
    this.head = null;
    this.tail = null;
    this.type = cfg.type || true;
    this.query = [];
  }

  _createClass(LinkedList, [{
    key: "add",
    value: function add(value) {
      if (this.type) {
        this.query.push(value);
        return;
      }
      var node = {
        value: value,
        next: null,
        prev: null
      };
      if (this.length === 0) {
        this.head = this.tail = node;
      } else {
        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
      }
      this.length++;
    }
  }, {
    key: "remove",
    value: function remove(index) {
      if (index > this.length - 1 || index < 0) {
        return null;
      }
      var node = this.head;
      var i = 0;
      if (index === 0) {
        this.head = node.next;
        if (this.head == null) {
          this.tail = null;
        } else {
          this.head.previous = null;
        }
      } else if (index === this.length - 1) {
        node = this.tail;
        this.tail = node.prev;
        this.tail.next = null;
      } else {
        while (i++ < index) {
          node = node.next;
        }
        node.prev.next = node.next;
        node.next.prev = node.prev;
      }
      this.length--;
    }
  }, {
    key: "get",
    value: function get(index) {
      if (this.type) {
        return this.query[index];
      }
      return this.node(index).value;
    }
  }, {
    key: "node",
    value: function node(index) {
      if (index > this.length - 1 || index < 0) {
        return null;
      }
      var node = this.head;
      var i = 0;
      while (i++ < index) {
        node = node.next;
      }
      return node;
    }
  }, {
    key: "update",
    value: function update(index, value) {
      if (this.type) {
        this.query[index] = value;
        return;
      }
      this.node(index).value = value;
    }
  }, {
    key: "size",
    value: function size() {
      return this.query.length || this.length;
    }
  }]);

  return LinkedList;
})();

module.exports = LinkedList;