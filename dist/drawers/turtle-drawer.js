(function() {
  var umd,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  umd = function(factory) {
    if (typeof exports === 'object') {
      return module.exports = factory(require('../color'));
    } else if (typeof define === 'function' && define.amd) {
      return define(['color'], factory);
    } else {
      this.TURTLE = this.TURTLE || {};
      return this.TURTLE.TurtleDrawer = factory(this.TURTLE.Color);
    }
  };

  umd(function(Color) {
    var TurtleDrawer;
    return TurtleDrawer = (function() {
      TurtleDrawer.prototype.angle = 0;

      TurtleDrawer.prototype.x = 800;

      TurtleDrawer.prototype.y = 200;

      TurtleDrawer.prototype._color = new Color(0, 0, 0, 1.0);

      TurtleDrawer.prototype._lineWidth = 1;

      function TurtleDrawer(canvas) {
        this.canvas = canvas;
        this.lineWidth = bind(this.lineWidth, this);
        this.forward = bind(this.forward, this);
        this.ctx = this.canvas.getContext('2d');
      }

      TurtleDrawer.prototype.finish = function() {};

      TurtleDrawer.prototype.forward = function(px, mod) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineWidth = this._lineWidth;
        this.ctx.strokeStyle = this._color.toString();
        this.x += (px + mod) * Math.cos(this.angle * (Math.PI / 180));
        this.y += (px + mod) * Math.sin(this.angle * (Math.PI / 180));
        this.ctx.lineTo(this.x, this.y);
        this.ctx.stroke();
        return this;
      };

      TurtleDrawer.prototype.color = function(color, mod) {
        this._color = color;
        return this;
      };

      TurtleDrawer.prototype.moveX = function(x, mod) {
        if (mod == null) {
          mod = 0;
        }
        this.x += x + mod;
        return this;
      };

      TurtleDrawer.prototype.moveY = function(y, mod) {
        if (mod == null) {
          mod = 0;
        }
        this.y += y + mod;
        return this;
      };

      TurtleDrawer.prototype.setX = function(x, mod) {
        if (mod == null) {
          mod = 0;
        }
        this.x = x + mod;
        return this;
      };

      TurtleDrawer.prototype.setY = function(y, mod) {
        if (mod == null) {
          mod = 0;
        }
        this.y = y + mod;
        return this;
      };

      TurtleDrawer.prototype.lineWidth = function(px, mod) {
        if (mod == null) {
          mod = 0;
        }
        this._lineWidth = px + mod;
        return this;
      };

      TurtleDrawer.prototype.turn = function(deg, mod) {
        this.angle += deg - 1 + mod;
        return this;
      };

      return TurtleDrawer;

    })();
  });

}).call(this);
