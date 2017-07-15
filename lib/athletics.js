(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("athletics", [], factory);
	else if(typeof exports === 'object')
		exports["athletics"] = factory();
	else
		root["athletics"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var eventTypes = { RUN: 'RUN', JUMP: 'JUMP', THROW: 'THROW' };

  var pointsFormula = {
    RUN: function RUN(a, b, c, T) {
      return a * Math.pow(b - T, c);
    }, // T in seconds
    JUMP: function JUMP(a, b, c, M) {
      return a * Math.pow(M - b, c);
    }, // M in centimeters
    THROW: function THROW(a, b, c, D) {
      return a * Math.pow(D - b, c);
    } // D in meters
  };

  var eventsMen = {
    '100m': { a: 25.4347, b: 18.00, c: 1.81, type: eventTypes.RUN, adjustment: 0.24 },
    '200m': { a: 5.8425, b: 38.00, c: 1.81, type: eventTypes.RUN, adjustment: 0.24 },
    '400m': { a: 1.53775, b: 82.00, c: 1.81, type: eventTypes.RUN, adjustment: 0.14 },
    '1500m': { a: 0.03768, b: 480.00, c: 1.85, type: eventTypes.RUN },
    '110mH': { a: 5.74352, b: 28.50, c: 1.92, type: eventTypes.RUN, adjustment: 0.24 },
    'High Jump': { a: 0.8465, b: 75.00, c: 1.42, type: eventTypes.JUMP },
    'Pole Vault': { a: 0.2797, b: 100.00, c: 1.35, type: eventTypes.JUMP },
    'Long Jump': { a: 0.14354, b: 220.00, c: 1.40, type: eventTypes.JUMP },
    Shot: { a: 51.39, b: 1.50, c: 1.05, type: eventTypes.THROW },
    Discus: { a: 12.91, b: 4.00, c: 1.10, type: eventTypes.THROW },
    Javelin: { a: 10.14, b: 7.00, c: 1.08, type: eventTypes.THROW },
    '60m': { a: 58.0150, b: 11.50, c: 1.81, type: eventTypes.RUN, adjustment: 0.24 },
    '1000m': { a: 0.08713, b: 305.50, c: 1.85, type: eventTypes.RUN },
    '60mH': { a: 20.5173, b: 15.50, c: 1.92, type: eventTypes.RUN, adjustment: 0.24 }
  };

  var eventsWomen = {
    '200m': { a: 4.99087, b: 42.50, c: 1.81, type: eventTypes.RUN, adjustment: 0.24 },
    '800m': { a: 0.11193, b: 254.00, c: 1.88, type: eventTypes.RUN },
    '100mH': { a: 9.23076, b: 26.70, c: 1.835, type: eventTypes.RUN, adjustment: 0.24 },
    'High Jump': { a: 1.84523, b: 75.00, c: 1.348, type: eventTypes.JUMP },
    'Long Jump': { a: 0.188807, b: 210.00, c: 1.41, type: eventTypes.JUMP },
    Shot: { a: 56.0211, b: 1.50, c: 1.05, type: eventTypes.THROW },
    Javelin: { a: 15.9803, b: 3.80, c: 1.04, type: eventTypes.THROW },
    '100m': { a: 17.8570, b: 21.0, c: 1.81, type: eventTypes.RUN, adjustment: 0.24 },
    '400m': { a: 1.34285, b: 91.7, c: 1.81, type: eventTypes.RUN, adjustment: 0.14 },
    '1500m': { a: 0.02883, b: 535, c: 1.88, type: eventTypes.RUN },
    'Pole Vault': { a: 0.44125, b: 100.00, c: 1.35, type: eventTypes.JUMP },
    Discus: { a: 12.3311, b: 3.00, c: 1.10, type: eventTypes.THROW },
    '60mH': { a: 20.0479, b: 17.00, c: 1.835, type: eventTypes.RUN, adjustment: 0.24 }
  };

  var events = {
    MEN: eventsMen,
    WOMEN: eventsWomen
  };

  function resolveResult(result, event) {
    var resolvedResult = result.value;

    // TODO: convert dimensions and ages

    if (result.adjustment) {
      console.log(event);
      resolvedResult += event.adjustment || 0;
    }

    return resolvedResult;
  }

  function calculatePoints(options) {
    return Math.floor(pointsFormula[options.event.type](options.event.a, options.event.b, options.event.c, resolveResult(options.result, options.event)));
  }

  var event1 = {
    event: events.MEN['100m'],
    result: {
      value: 10.40,
      dimension: 's',
      adjustment: false
    }
  };

  var event2 = {
    event: events.MEN['100m'],
    result: {
      value: 10.40,
      dimension: 's',
      adjustment: true
    }
  };

  console.log(calculatePoints(event1));
  console.log(calculatePoints(event2));
})();

/***/ })
/******/ ]);
});
//# sourceMappingURL=athletics.js.map