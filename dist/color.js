(function() {
  var umd;

  umd = function(factory) {
    if (typeof exports === 'object') {
      return module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
      return define([], factory);
    } else {
      this.TURTLE = this.TURTLE || {};
      return this.TURTLE.Color = factory();
    }
  };

  umd(function() {
    var Color;
    return Color = Color = (function() {
      function Color(r1, g1, b1, opacity) {
        this.r = r1;
        this.g = g1;
        this.b = b1;
        this.opacity = opacity != null ? opacity : 1;
        this;
      }

      Color.prototype.toString = function() {
        return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.opacity + ")";
      };

      Color.prototype.setHue = function(val) {
        var hsl;
        if (val > 360) {
          val = val % 360;
        }
        hsl = this.toHSL();
        hsl.H = val;
        return this.fromHSL(hsl.H, hsl.S, hsl.L);
      };

      Color.prototype.getHue = function() {
        return this.toHSL().H;
      };

      Color.prototype.toHSL = function() {
        var H, L, S, b, delta, delta_B, delta_G, delta_R, g, max, min, r;
        r = this.r / 255;
        g = this.g / 255;
        b = this.b / 255;
        max = Math.max(r, g, b);
        min = Math.min(r, g, b);
        delta = max - min;
        L = (max + min) / 2;
        if (delta === 0) {
          H = 0;
          S = 0;
        } else {
          if (L < 0.5) {
            S = delta / (max + min);
          } else {
            S = delta / (2 - max - min);
          }
          delta_R = (((max - r) / 6) + (delta / 2)) / delta;
          delta_G = (((max - g) / 6) + (delta / 2)) / delta;
          delta_B = (((max - b) / 6) + (delta / 2)) / delta;
          if (r === max) {
            H = delta_B - delta_G;
          } else if (g === max) {
            H = (1 / 3) + delta_R - delta_B;
          } else if (b === max) {
            H = (2 / 3) + delta_G - delta_R;
          }
        }
        if (H < 0) {
          H += 1;
        }
        if (H > 1) {
          H -= 1;
        }
        return {
          H: H * 360,
          S: S * 100,
          L: L * 100
        };
      };

      Color.prototype.fromHSL = function(H, S, L) {
        var Hue_2_RGB, var_1, var_2;
        Hue_2_RGB = function(v1, v2, vH) {
          if (vH < 0) {
            vH += 1;
          }
          if (vH > 1) {
            vH -= 1;
          }
          if ((6 * vH) < 1) {
            return v1 + (v2 - v1) * 6 * vH;
          }
          if ((2 * vH) < 1) {
            return v2;
          }
          if ((3 * vH) < 2) {
            return v1 + (v2 - v1) * ((2 / 3) - vH) * 6;
          }
          return v1;
        };
        H = H / 360;
        S = S / 100;
        L = L / 100;
        if (S === 0) {
          this.r = L * 255;
          this.g = L * 255;
          this.b = L * 255;
        } else {
          if (L < 0.5) {
            var_2 = L * (1 + S);
          } else {
            var_2 = (L + S) - (S * L);
          }
          var_1 = 2 * L - var_2;
          this.r = 255 * Hue_2_RGB(var_1, var_2, H + (1 / 3));
          this.g = 255 * Hue_2_RGB(var_1, var_2, H);
          this.b = 255 * Hue_2_RGB(var_1, var_2, H - (1 / 3));
        }
        return [this.r, this.g, this.b];
      };

      return Color;

    })();
  });

}).call(this);
