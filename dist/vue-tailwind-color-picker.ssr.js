'use strict';function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  name: 'VueTailwindColorPicker',
  props: {
    value: String,
    swatches: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    hideSwatches: Boolean
  },
  data: function data() {
    return {
      canvasCursor: null,
      lineCursor: null,
      opacityCursor: null,
      draggingLineCursor: false,
      draggingCanvasCursor: false,
      draggingOpacityCursor: false,
      dragStartColor: null,
      lineWidth: 160,
      lineLeft: 0,
      canvasWidth: 208,
      canvasLeft: 0,
      canvasTop: 0,
      canvasHeight: 0,
      opacityWidth: 160,
      opacityLeft: 0,
      percentageOpacity: 0,
      percentageBlack: 0,
      percentageWhite: 0,
      inputType: 'rgba',
      colorLazy: {
        r: 255,
        g: 219,
        b: 0,
        a: 1,
        hexa: '#FFFE00FF'
      },
      colorData: {
        r: 0,
        g: 0,
        b: 0,
        a: 1,
        hexa: '#000000FF'
      },
      lineColorData: {
        r: 0,
        g: 0,
        b: 0
      },
      swatchesLazy: []
    };
  },
  computed: {
    inputValue: {
      get: function get() {
        return this.value;
      },
      set: function set(val) {
        this.$emit('input', val);
      }
    },
    swatchesValue: {
      get: function get() {
        return this.swatches || [];
      },
      set: function set(val) {
        this.$emit('update:swatches', val);
      }
    },
    hasSelectedSwatch: function hasSelectedSwatch() {
      return this.swatchesLazy.includes(this.inputValue);
    },
    color: function color() {
      return "rgba(".concat(this.colorData.r, ", ").concat(this.colorData.g, ", ").concat(this.colorData.b, ", ").concat(this.colorData.a, ")");
    },
    canvasColor: function canvasColor() {
      return "rgba(".concat(this.lineColorData.r, ", ").concat(this.lineColorData.g, ", ").concat(this.lineColorData.b, ", 1)");
    },
    opacityLineBackground: function opacityLineBackground() {
      var opaque = "rgba(".concat(this.colorData.r, ", ").concat(this.colorData.g, ", ").concat(this.colorData.b, ", 0)");
      var solid = "rgba(".concat(this.colorData.r, ", ").concat(this.colorData.g, ", ").concat(this.colorData.b, ", 1)");
      return "linear-gradient(to right, ".concat(opaque, ", ").concat(solid, ")");
    }
  },
  methods: {
    mousedownCanvas: function mousedownCanvas(e) {
      if (e.which !== 1) {
        return;
      }

      this.registerListeners();
      this.dragStartColor = this.color;
      this.draggingCanvasCursor = true;
      this.setSizePoses();
      this.canvasCursor = this.$refs.canvasCursor;
      this.canvasCursor.style.transform = "translate(".concat(e.offsetX, "px, ").concat(e.offsetY, "px)");
      this.percentageBlack = e.offsetY / this.canvasHeight;
      this.percentageWhite = 1 - e.offsetX / this.canvasWidth;
      this.setColorData();
      e.stopPropagation();
      e.preventDefault();
    },
    mousedownLine: function mousedownLine(e) {
      if (e.which !== 1) {
        return;
      }

      this.registerListeners();
      this.dragStartColor = this.color;
      this.draggingLineCursor = true;
      this.setSizePoses();
      this.lineCursor = this.$refs.lineCursor;
      this.lineCursor.style.transform = "translate(".concat(e.offsetX, "px, 0px)");
      this.calculateLineColor(e.offsetX);
      this.setColorData();
      e.stopPropagation();
      e.preventDefault();
    },
    mousedownOpacity: function mousedownOpacity(e) {
      if (e.which !== 1) {
        return;
      }

      this.registerListeners();
      this.dragStartColor = this.color;
      this.draggingOpacityCursor = true;
      this.setSizePoses();
      this.opacityCursor = this.$refs.opacityCursor;
      this.opacityCursor.style.transform = "translate(".concat(e.offsetX, "px, 0px)");
      this.percentageOpacity = e.offsetX / this.opacityWidth;
      this.setColorData();
      e.stopPropagation();
      e.preventDefault();
    },
    mouseup: function mouseup(e) {
      if (this.draggingLineCursor || this.draggingCanvasCursor || this.draggingOpacityCursor) {
        if (this.dragStartColor !== this.color) {
          this.$emit('change', this.color);
        }
      }

      this.draggingLineCursor = false;
      this.draggingCanvasCursor = false;
      this.draggingOpacityCursor = false;
      this.unregisterListeners();
    },
    mousemove: function mousemove(e) {
      if (this.draggingLineCursor) {
        var pos = e.pageX - this.lineLeft;
        pos = Math.min(this.lineWidth, Math.max(0, pos));
        this.lineCursor.style.transform = "translate(".concat(pos, "px, 0px)");
        this.calculateLineColor(pos);
      } else if (this.draggingCanvasCursor) {
        var posX = e.pageX - this.canvasLeft;
        var posY = e.pageY - this.canvasTop;
        posX = Math.min(this.canvasWidth, Math.max(0, posX));
        posY = Math.min(this.canvasHeight, Math.max(0, posY));
        this.canvasCursor.style.transform = "translate(".concat(posX, "px, ").concat(posY, "px)");
        this.percentageBlack = posY / this.canvasHeight;
        this.percentageWhite = 1 - posX / this.canvasWidth;
      } else if (this.draggingOpacityCursor) {
        var pos = e.pageX - this.opacityLeft;
        pos = Math.min(this.opacityWidth, Math.max(0, pos));
        this.opacityCursor.style.transform = "translate(".concat(pos, "px, 0px)");
        this.percentageOpacity = pos / this.opacityWidth;
      }

      this.setColorData();
    },
    setColorData: function setColorData() {
      var targetVal = 255 * (1 - this.percentageBlack);
      targetVal = Math.min(255, Math.max(0, Math.round(targetVal)));
      var remainingR = targetVal - this.lineColorData.r;
      var remainingG = targetVal - this.lineColorData.g;
      var remainingB = targetVal - this.lineColorData.b;
      var rDiff = this.percentageWhite * remainingR;
      var gDiff = this.percentageWhite * remainingG;
      var bDiff = this.percentageWhite * remainingB;
      var r = this.lineColorData.r + rDiff;
      var g = this.lineColorData.g + gDiff;
      var b = this.lineColorData.b + bDiff;
      this.colorData.r = Math.min(targetVal, Math.max(0, Math.round(r)));
      this.colorData.g = Math.min(targetVal, Math.max(0, Math.round(g)));
      this.colorData.b = Math.min(targetVal, Math.max(0, Math.round(b)));
      this.colorData.a = Math.min(1, Math.max(0, Number(this.percentageOpacity.toFixed(2))));
      this.colorLazy.r = this.colorData.r;
      this.colorLazy.g = this.colorData.g;
      this.colorLazy.b = this.colorData.b;
      this.colorLazy.a = this.colorData.a;
      this.colorData.hexa = '#' + this.componentToHex(this.colorData.r) + this.componentToHex(this.colorData.g) + this.componentToHex(this.colorData.b) + this.componentToHex(Math.round(this.colorData.a * 255));
      this.colorLazy.hexa = this.colorData.hexa;
      this.inputValue = this.colorData.hexa;
    },
    calculateLineColor: function calculateLineColor(linePos) {
      var perc = linePos / this.lineWidth;
      var value = perc % (1 / 6);
      var colorPerc = value / (1 / 6);
      var percRed = 1;
      var percGreen = 1;
      var percBlue = 1;

      if (perc < 1 / 6) {
        percGreen = colorPerc;
        percBlue = 0;
      } else if (perc < 2 / 6) {
        percRed = 1 - colorPerc;
        percBlue = 0;
      } else if (perc < 3 / 6) {
        percRed = 0;
        percBlue = colorPerc;
      } else if (perc < 4 / 6) {
        percRed = 0;
        percGreen = 1 - colorPerc;
      } else if (perc < 5 / 6) {
        percRed = colorPerc;
        percGreen = 0;
      } else {
        percGreen = 0;
        percBlue = 1 - colorPerc;
      }

      this.lineColorData.r = Math.min(255, Math.max(0, Math.round(percRed * 255)));
      this.lineColorData.g = Math.min(255, Math.max(0, Math.round(percGreen * 255)));
      this.lineColorData.b = Math.min(255, Math.max(0, Math.round(percBlue * 255)));
    },
    registerListeners: function registerListeners() {
      document.addEventListener('mouseup', this.mouseup);
      document.addEventListener('mousemove', this.mousemove);
    },
    unregisterListeners: function unregisterListeners() {
      document.removeEventListener('mouseup', this.mouseup);
      document.removeEventListener('mousemove', this.mousemove);
    },
    setSizePoses: function setSizePoses() {
      var boundingRect = this.$refs.line.getBoundingClientRect();
      this.lineLeft = boundingRect.left;
      var canvBoundingRect = this.$refs.canvas.getBoundingClientRect();
      this.canvasLeft = canvBoundingRect.left;
      this.canvasTop = canvBoundingRect.top;
      this.canvasHeight = canvBoundingRect.height;
      var boundingRect = this.$refs.opacityLine.getBoundingClientRect();
      this.opacityLeft = boundingRect.left;
    },
    normalizeColorData: function normalizeColorData() {
      var _this = this;

      var normalized = {
        r: null,
        g: null,
        b: null,
        variable: null
      };
      var _this$colorData = this.colorData,
          r = _this$colorData.r,
          g = _this$colorData.g,
          b = _this$colorData.b;

      if (b > g && b > r) {
        normalized.b = 1;
      } else if (g > r && g > b) {
        normalized.g = 1;
      } else {
        normalized.r = 1;
      }

      if (r < g && r < b) {
        normalized.r = 0;
      } else if (g < r && g < b) {
        normalized.g = 0;
      } else {
        normalized.b = 0;
      }

      Array.from('rgb').forEach(function (col) {
        if (normalized[col] === null) {
          normalized.variable = col;
          normalized[col] = _this.colorData[col] / 255;
        }
      });
      return normalized;
    },
    initSwatches: function initSwatches() {
      var _this2 = this;

      if (this.swatches !== null && Array.isArray(this.swatches)) {
        var cleanedSwatches = this.swatches.map(function (s) {
          return _this2.cleanHexa(s);
        });
        cleanedSwatches.forEach(function (swatch) {
          if (!_this2.swatchesLazy.includes(swatch)) {
            _this2.swatchesLazy.push(swatch);
          }
        });
      } else {
        var cleanedSwatches = ['#f94144', '#f3722c', '#f8961e', '#f9c74f', '#90be6d', '#43aa8b', '#577590', '#22223b', '#4a4e69', '#c9ada7'].map(function (s) {
          return _this2.cleanHexa(s);
        });
        this.swatchesLazy = cleanedSwatches;
      }
    },
    init: function init() {
      if (this.value) {
        this.colorLazy = this.parseHexa(this.value);
      }

      if (!this.hideSwatches) this.initSwatches();
      this.validate();
      this.setUICursors();
    },
    inputUpdated: function inputUpdated() {
      this.validate();
      this.setUICursors();
    },
    hexaInputUpdated: function hexaInputUpdated() {
      this.validateHexa();
      this.setUICursors();
    },
    validateHexChar: function validateHexChar(c) {
      if (c.length < 0 || c.length > 1) return '0';

      if (isNaN(c)) {
        var validChars = ['A', 'B', 'C', 'D', 'E', 'F'];

        if (validChars.includes(c.toUpperCase())) {
          return c.toUpperCase();
        } else {
          return '0';
        }
      } else {
        return c;
      }
    },
    cleanHexa: function cleanHexa(hexa) {
      var _this3 = this;

      if (!hexa || hexa.length < 3) return '#000000FF';

      var _cleaned = hexa.toUpperCase();

      if (_cleaned.startsWith('#')) _cleaned = _cleaned.substr(1);
      if (_cleaned.length < 3) return '#000000FF';
      var r, g, b, a;
      r = g = b = '00';
      a = 'FF';

      if (_cleaned.length === 3) {
        var rgb = _cleaned.split('').map(function (r) {
          return "0".concat(r);
        }).map(function (r) {
          return _this3.validateHexChar(r);
        });

        r = rgb[0];
        g = rgb[1];
        b = rgb[2];
      } else if (_cleaned.length >= 6) {
        var rgb = _cleaned.split('').map(function (r) {
          return _this3.validateHexChar(r);
        });

        r = rgb[0] + rgb[1];
        g = rgb[2] + rgb[3];
        b = rgb[4] + rgb[5];

        if (rgb.length === 8) {
          a = rgb[6] + rgb[7];
        }
      }

      return "#".concat(r).concat(g).concat(b).concat(a);
    },
    parseHexa: function parseHexa(hexa) {
      var hexaArr = this.cleanHexa(hexa).substr(1).split('');
      var h = hexaArr[0] + hexaArr[1];
      var e = hexaArr[2] + hexaArr[3];
      var x = hexaArr[4] + hexaArr[5];
      var ha = hexaArr[6] + hexaArr[7];
      var r = parseInt(h, 16);
      var g = parseInt(e, 16);
      var b = parseInt(x, 16);
      var a = parseInt(ha, 16) / 255;
      return {
        hexa: '#' + h + e + x + ha,
        r: r,
        g: g,
        b: b,
        a: a
      };
    },
    validateHexa: function validateHexa() {
      var parsedColor = this.parseHexa(this.colorLazy.hexa);
      this.colorData = _objectSpread2({}, parsedColor);
      this.colorLazy.r = this.colorData.r;
      this.colorLazy.g = this.colorData.g;
      this.colorLazy.b = this.colorData.b;
      this.colorLazy.a = this.colorData.a;
    },
    componentToHex: function componentToHex(c) {
      var hex = c.toString(16).toUpperCase();
      return hex.length == 1 ? '0' + hex : hex;
    },
    validate: function validate() {
      var r = Number(this.colorLazy.r);
      var g = Number(this.colorLazy.g);
      var b = Number(this.colorLazy.b);
      var a = Number(this.colorLazy.a);
      if (isNaN(r) || r === null) r = 0;
      if (isNaN(g) || g === null) g = 0;
      if (isNaN(b) || b === null) b = 0;
      if (isNaN(a) || a === null) a = 1;
      r = Math.min(255, Math.max(0, r));
      g = Math.min(255, Math.max(0, g));
      b = Math.min(255, Math.max(0, b));
      a = Math.min(1, Math.max(0, a));
      this.colorData.r = r;
      this.colorData.g = g;
      this.colorData.b = b;
      this.colorData.a = a;
      this.colorData.hexa = '#' + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b) + this.componentToHex(Math.round(a * 255));
      this.colorLazy.hexa = this.colorData.hexa;
    },
    setUICursors: function setUICursors() {
      var _this4 = this;

      this.setSizePoses();
      this.percentageOpacity = this.colorData.a;
      var opacityX = this.percentageOpacity * this.opacityWidth;
      this.$refs.opacityCursor.style.transform = "translate(".concat(opacityX, "px, 0px)");
      var normalized = this.normalizeColorData();
      var sector = 0;
      var variablePerc = 0;

      if (normalized.variable === 'r') {
        if (normalized.g === 1) {
          sector = 1;
          variablePerc = 1 - this.colorData.r / 255;
        } else if (normalized.b === 1) {
          sector = 4;
          variablePerc = this.colorData.r / 255;
        }
      } else if (normalized.variable === 'b') {
        if (normalized.r === 1) {
          sector = 5;
          variablePerc = 1 - this.colorData.b / 255;
        } else if (normalized.g === 1) {
          sector = 2;
          variablePerc = this.colorData.b / 255;
        }
      } else {
        if (normalized.r === 1) {
          sector = 0;
          variablePerc = this.colorData.g / 255;
        } else if (normalized.b === 1) {
          sector = 3;
          variablePerc = 1 - this.colorData.g / 255;
        }
      }

      var sectorLength = this.lineWidth / 6;
      var variableSectorLeft = variablePerc * sectorLength;
      var lineCursorLeft = sectorLength * sector + variableSectorLeft;
      this.$refs.lineCursor.style.transform = "translate(".concat(lineCursorLeft, "px, 0px)");
      this.lineColorData.r = Math.min(255, Math.max(0, Math.round(normalized.r * 255)));
      this.lineColorData.g = Math.min(255, Math.max(0, Math.round(normalized.g * 255)));
      this.lineColorData.b = Math.min(255, Math.max(0, Math.round(normalized.b * 255)));
      Array.from('rgb').forEach(function (col) {
        if (_this4.lineColorData[col] === 0) {
          _this4.percentageWhite = _this4.colorData[col] / 255;
        } else if (_this4.lineColorData[col] === 255) {
          _this4.percentageBlack = 1 - _this4.colorData[col] / 255;
        }
      });
      var canvCursorX = this.canvasWidth * (1 - this.percentageWhite);
      var canvCursorY = this.canvasHeight * this.percentageBlack;
      this.$refs.canvasCursor.style.transform = "translate(".concat(canvCursorX, "px, ").concat(canvCursorY, "px)");
    },
    blurInputR: function blurInputR() {
      this.colorLazy.r = this.colorData.r;
    },
    blurInputG: function blurInputG() {
      this.colorLazy.g = this.colorData.g;
    },
    blurInputB: function blurInputB() {
      this.colorLazy.b = this.colorData.b;
    },
    blurInputA: function blurInputA() {
      this.colorLazy.a = this.colorData.a;
    },
    blurInputHexa: function blurInputHexa() {
      this.colorLazy.hexa = this.colorData.hexa;
    },
    toggleInputs: function toggleInputs() {
      if (this.inputType === 'rgba') {
        this.inputType = 'hexa';
      } else {
        this.inputType = 'rgba';
      }
    },
    selectSwatch: function selectSwatch(swatchHexa) {
      var parsedHexa = this.parseHexa(swatchHexa);
      this.colorData = _objectSpread2({}, parsedHexa);
      this.colorLazy = _objectSpread2({}, parsedHexa);
      this.inputValue = parsedHexa.hexa;
      this.setUICursors();
    },
    deleteSwatch: function deleteSwatch(swatch) {
      this.swatchesLazy = this.swatchesLazy.filter(function (s) {
        return s !== swatch;
      });
      this.$emit('update:swatches', this.swatchesLazy);
      this.$emit('deleteSwatch', swatch);
    },
    addRemoveCurrentSwatch: function addRemoveCurrentSwatch() {
      if (this.hasSelectedSwatch) {
        this.deleteSwatch(this.inputValue);
      } else {
        this.swatchesLazy.push(this.inputValue);
        this.$emit('update:swatches', this.swatchesLazy);
        this.$emit('addSwatch', this.inputValue);
      }
    }
  },
  mounted: function mounted() {
    var _this5 = this;

    this.$nextTick(function () {
      _this5.init();
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.unregisterListeners();
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "border min-w-min w-min rounded-lg bg-white"
  }, [_vm._ssrNode("<div class=\"p-4 w-60\"><div class=\"w-52 h-40\"" + _vm._ssrStyle(null, {
    backgroundColor: _vm.canvasColor
  }, null) + "><div class=\"w-full h-full\" style=\"background-image:linear-gradient(90deg,#fff,rgba(204,154,129,0));\"><div class=\"w-full h-full relative cursor-pointer\" style=\"background-image:linear-gradient(0deg,#000,rgba(204,154,129,0));\"><div class=\"h-4 w-4 border border-gray-200 rounded-full bg-white absolute -left-2 -top-2 pointer-events-none\" style=\"box-shadow:2px 2px 2px 0 rgb(0 0 0 / 20%)\"></div></div></div></div> <div class=\"w-52 flex my-2\"><div class=\"w-8 h-8 rounded-lg\" style=\"background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAJElEQVQYV2NctWrVfwYkEBYWxojMZ6SDAmT7QGx0K1EcRBsFAADeG/3M/HteAAAAAElFTkSuQmCC') repeat\"><div class=\"w-full h-full rounded-lg\"" + _vm._ssrStyle(null, {
    backgroundColor: _vm.color
  }, null) + "></div></div> <div><div class=\"w-40 h-3 ml-4 relative cursor-pointer rounded\" style=\"background-image:linear-gradient(90deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red)\"><div class=\"h-4 w-4 border border-gray-200 rounded-full bg-white absolute -left-2 pointer-events-none\" style=\"top:-2px;box-shadow:2px 2px 2px 0 rgb(0 0 0 / 20%)\"></div></div> <div class=\"w-40 h-3 ml-4 mt-2 relative cursor-pointer rounded\" style=\"background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAJElEQVQYV2NctWrVfwYkEBYWxojMZ6SDAmT7QGx0K1EcRBsFAADeG/3M/HteAAAAAElFTkSuQmCC') repeat\"><div class=\"w-full h-full relative\"" + _vm._ssrStyle(null, {
    background: _vm.opacityLineBackground
  }, null) + "><div class=\"h-4 w-4 border border-gray-200 rounded-full bg-white absolute -left-2 pointer-events-none\" style=\"top:-2px;box-shadow:2px 2px 2px 0 rgb(0 0 0 / 20%)\"></div></div></div></div></div> <div class=\"flex items-center\"><div class=\"flex\"" + _vm._ssrStyle(null, null, {
    display: _vm.inputType === 'rgba' ? '' : 'none'
  }) + "><div><p class=\"text-center text-gray-500 text-sm\">R</p> <input" + _vm._ssrAttr("value", _vm.colorLazy.r) + " class=\"shadow appearance-none border rounded text-center w-10 h-8 text-grey-darker\"></div> <div class=\"mx-1\"><p class=\"text-center text-gray-500 text-sm\">G</p> <input" + _vm._ssrAttr("value", _vm.colorLazy.g) + " class=\"shadow appearance-none border rounded text-center w-10 h-8 text-grey-darker\"></div> <div class=\"mr-1\"><p class=\"text-center text-gray-500 text-sm\">B</p> <input" + _vm._ssrAttr("value", _vm.colorLazy.b) + " class=\"shadow appearance-none border rounded text-center w-10 h-8 text-grey-darker\"></div> <div><p class=\"text-center text-gray-500 text-sm\">A</p> <input" + _vm._ssrAttr("value", _vm.colorLazy.a) + " class=\"shadow appearance-none border rounded text-center w-10 h-8 text-grey-darker\"></div></div> <div class=\"mr-3\"" + _vm._ssrStyle(null, null, {
    display: _vm.inputType === 'hexa' ? '' : 'none'
  }) + "><p class=\"text-gray-500 text-center text-sm\">HEXA</p> <input" + _vm._ssrAttr("value", _vm.colorLazy.hexa) + " class=\"shadow appearance-none border rounded text-center w-40 h-8 text-grey-darker\"></div> <div class=\"px-2 text-gray-500 cursor-pointer\"><svg viewBox=\"0 0 24 24\" style=\"width:24px;height:24px\"><path fill=\"currentColor\" d=\"M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z\"></path></svg></div></div> " + (!_vm.hideSwatches ? "<div class=\"flex mt-2 flex-wrap px-1\">" + _vm._ssrList(_vm.swatchesLazy, function (swatch) {
    return "<div class=\"w-8 h-8 m-1 relative cursor-pointer rounded-full shadow-md\"" + _vm._ssrStyle(null, {
      backgroundColor: swatch
    }, null) + "><div class=\"h-full w-full rounded-full border-2 border-gray-200 p-0 relative\"" + _vm._ssrStyle(null, null, {
      display: _vm.inputValue === swatch ? '' : 'none'
    }) + "></div></div>";
  }) + " <div class=\"w-8 h-8 m-1 cursor-pointer rounded-full shadow-md text-gray-600 flex items-center justify-center\"" + _vm._ssrStyle(null, {
    backgroundColor: _vm.color
  }, null) + ">" + (!_vm.hasSelectedSwatch ? "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" fill=\"currentColor\" class=\"h-6 w-6\"><path fill-rule=\"evenodd\" d=\"M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z\" clip-rule=\"evenodd\"></path></svg>" : "<svg viewBox=\"0 0 24 24\" class=\"h-5 w-5\"><path fill=\"currentColor\" d=\"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z\"></path></svg>") + "</div></div>" : "<!---->") + "</div>")]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = "data-v-66cc2436";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var component = /*#__PURE__*/(function () {
  // Get component instance
  var installable = __vue_component__; // Attach install function executed by Vue.use()

  installable.install = function (Vue) {
    Vue.component('VueTailwindColorPicker', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;
var namedExports=/*#__PURE__*/Object.freeze({__proto__:null,'default': component});// only expose one global var, with named exports exposed as properties of
// that global var (eg. plugin.namedExport)

Object.entries(namedExports).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      exportName = _ref2[0],
      exported = _ref2[1];

  if (exportName !== 'default') component[exportName] = exported;
});module.exports=component;