(function() {
  var umd,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  umd = function(factory) {
    if (typeof exports === 'object') {
      return module.exports = factory(require('./drawers/turtle-drawer'));
    } else if (typeof define === 'function' && define.amd) {
      return define(['turtle-drawer'], factory);
    } else {
      this.TURTLE = this.TURTLE || {};
      return this.TURTLE.Turtle = factory(this.TURTLE.TurtleDrawer);
    }
  };

  umd(function(TurtleDrawer) {
    var Turtle;
    return Turtle = (function() {
      function Turtle(canvas) {
        this.canvas = canvas;
        this.keepDrawing = bind(this.keepDrawing, this);
        this.doDraw = bind(this.doDraw, this);
        this.draw = bind(this.draw, this);
        this.job = bind(this.job, this);
        this.ctx = this.canvas.getContext('2d');
        this.ctx.globalCompositeOperation = "source-over";
        this.drawer = new TurtleDrawer(this.canvas);
        this.commands = [];
      }

      Turtle.prototype.setBlendMode = function(val) {
        return this.ctx.globalCompositeOperation = val;
      };

      Turtle.prototype.background = function(val) {
        var h, w;
        w = this.canvas.width;
        h = this.canvas.height;
        this.ctx.fillStyle = val;
        return this.ctx.fillRect(0, 0, w, h);
      };

      Turtle.prototype.job = function(fn) {
        var Job, turtle;
        turtle = this;
        Job = (function() {
          function Job(fn1) {
            this.fn = fn1;
          }

          Job.prototype.before = function() {};

          Job.prototype.run = function() {
            this.beforeEach.apply(turtle);
            return this.fn.apply(turtle);
          };

          return Job;

        })();
        return new Job(fn);
      };

      Turtle.prototype.forward = function(px, mod) {
        if (mod == null) {
          mod = 0;
        }
        this.commands.push({
          fn: this.drawer.forward,
          args: px,
          mod: mod
        });
        return this;
      };

      Turtle.prototype.turn = function(deg, mod) {
        if (mod == null) {
          mod = 0;
        }
        this.commands.push({
          fn: this.drawer.turn,
          args: deg,
          mod: mod
        });
        return this;
      };

      Turtle.prototype.color = function(color, mod) {
        this.commands.push({
          fn: this.drawer.color,
          args: color,
          mod: mod
        });
        return this;
      };

      Turtle.prototype.lineWidth = function(px, mod) {
        this.commands.push({
          fn: this.drawer.lineWidth,
          args: px,
          mod: mod
        });
        return this;
      };

      Turtle.prototype.moveX = function(x, mod) {
        this.commands.push({
          fn: this.drawer.moveX,
          args: x,
          mod: mod
        });
        return this;
      };

      Turtle.prototype.moveY = function(y, mod) {
        this.commands.push({
          fn: this.drawer.moveY,
          args: y,
          mod: mod
        });
        return this;
      };

      Turtle.prototype.setX = function(x, mod) {
        this.commands.push({
          fn: this.drawer.setX,
          args: x,
          mod: mod
        });
        return this;
      };

      Turtle.prototype.setY = function(y, mod) {
        this.commands.push({
          fn: this.drawer.setY,
          args: y,
          mod: mod
        });
        return this;
      };

      Turtle.prototype.draw = function(repeat) {
        this.n = 0;
        this.drawing = true;
        if (repeat) {
          return this.doDraw(repeat);
        } else {
          return this.keepDrawing();
        }
      };

      Turtle.prototype.stop = function() {
        this.drawing = false;
        return this.drawer.finish();
      };

      Turtle.prototype.doDraw = function(repeat) {
        var command, i, j, k, len, mod, ref, ref1;
        for (i = j = 1, ref = repeat; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
          ref1 = this.commands;
          for (k = 0, len = ref1.length; k < len; k++) {
            command = ref1[k];
            if (typeof command.mod === 'number') {
              mod = command.mod ? command.mod * i : 1;
              command.fn.apply(this.drawer, [command.args, mod]);
            } else if (typeof command.mod === 'function') {
              command.fn.apply(this.drawer, [command.args, command.mod(i)]);
            } else {
              command.fn.apply(this.drawer, [command.args]);
            }
          }
        }
        return this.stop();
      };

      Turtle.prototype.keepDrawing = function() {
        var command, i, j, k, len, mod, ref;
        if (!this.drawing) {
          return;
        }
        for (i = j = 0; j <= 10; i = ++j) {
          this.n = this.n + 1;
          ref = this.commands;
          for (k = 0, len = ref.length; k < len; k++) {
            command = ref[k];
            if (typeof command.mod === 'number') {
              mod = command.mod ? command.mod * this.n : 1;
              command.fn.apply(this.drawer, [command.args, mod]);
            } else if (typeof command.mod === 'function') {
              command.fn.apply(this.drawer, [command.args, command.mod(this.n)]);
            } else {
              command.fn.apply(this.drawer, [command.args]);
            }
          }
        }
        window.requestAnimationFrame((function(_this) {
          return function() {
            return _this.keepDrawing();
          };
        })(this));
        return this;
      };

      Turtle.prototype.finish = function() {
        this.drawer.finish();
        return this;
      };

      Turtle.blendMode = {
        'NORMAL': 'normal',
        'MULTIPLY': 'multiply',
        'SCREEN': 'screen',
        'OVERLAY': 'overlay',
        'DARKEN': 'darken',
        'LIGHTEN': 'lighten',
        'COLOR-DODGE': 'color-dodge',
        'COLOR-BURN': 'color-burn',
        'HARD-LIGHT': 'hard-light',
        'SOFT-LIGHT': 'soft-light',
        'DIFFERENCE': 'difference',
        'EXCLUSION': 'exclusion',
        'HUE': 'hue',
        'SATURATION': 'saturation',
        'COLOR': 'color',
        'LUMINOSITY': 'luminosity'
      };

      return Turtle;

    })();
  });

}).call(this);
