(function() {
  var umd,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice;

  umd = function(factory) {
    if (typeof exports === 'object') {
      return module.exports = factory(require('../color', 'turtle-drawer'));
    } else if (typeof define === 'function' && define.amd) {
      return define(['color', 'turtle-drawer'], factory);
    } else {
      this.TURTLE = this.TURTLE || {};
      return this.TURTLE.OffsetColorDrawer = factory(this.TURTLE.Color, this.TURTLE.TurtleDrawer);
    }
  };

  umd(function(Color, TurtleDrawer) {
    var OffsetColorDrawer;
    return OffsetColorDrawer = (function(superClass) {
      extend(OffsetColorDrawer, superClass);

      function OffsetColorDrawer(canvas) {
        var fn, i, j, name, ref;
        this.offsetX = 30;
        this.offsetY = 30;
        this.drawers = [];
        for (i = j = 0; j <= 2; i = j += 1) {
          this.drawers[i] = new TurtleDrawer(canvas);
        }
        ref = new TurtleDrawer(canvas);
        for (name in ref) {
          fn = ref[name];
          if (typeof fn === 'function') {
            (function(_this) {
              return (function(name, fn) {
                return _this[name] = function() {
                  var _arg, drawer, k, len, ref1, results;
                  _arg = 1 <= arguments.length ? slice.call(arguments, 0) : [];
                  ref1 = this.drawers;
                  results = [];
                  for (k = 0, len = ref1.length; k < len; k++) {
                    drawer = ref1[k];
                    results.push((function(drawer) {
                      return drawer[name].apply(drawer, _arg);
                    })(drawer));
                  }
                  return results;
                };
              });
            })(this)(name, fn);
          }
        }
        this.color = function(_color, mod) {
          this._color = _color;
          this.drawers[0].color(new Color(this._color.r, 0, 0, this._color.opacity / 3));
          this.drawers[1].color(new Color(0, this._color.g, 0, this._color.opacity / 3));
          this.drawers[2].color(new Color(0, 0, this._color.b, this._color.opacity / 3));
          return this;
        };
        this.setX = function(x, mod) {
          if (mod == null) {
            mod = 0;
          }
          this.drawers[0].setX(x, mod);
          this.drawers[1].setX(x + this.offsetX, mod);
          this.drawers[2].setX(x + this.offsetX * 2, mod);
          return this;
        };
        this.moveX = function(x, mod) {
          if (mod == null) {
            mod = 0;
          }
          this.drawers[0].moveX(x, mod);
          this.drawers[1].moveX(x + this.offsetX, mod);
          this.drawers[2].moveX(x + this.offsetX * 2, mod);
          return this;
        };
        this.setY = function(y, mod) {
          if (mod == null) {
            mod = 0;
          }
          this.drawers[0].setY(y, mod);
          this.drawers[1].setY(y + this.offsetY, mod);
          this.drawers[2].setY(y + this.offsetY * 2, mod);
          return this;
        };
        this.moveY = function(y, mod) {
          if (mod == null) {
            mod = 0;
          }
          this.drawers[0].moveY(y, mod);
          this.drawers[1].moveY(y + this.offsetY, mod);
          this.drawers[2].moveY(y + this.offsetY * 2, mod);
          return this;
        };
        this;
      }

      return OffsetColorDrawer;

    })(TurtleDrawer);
  });

}).call(this);
