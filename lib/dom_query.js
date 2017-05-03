/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class DOMNodeCollection {
  constructor (elArray){
    this.elArray = elArray;
  }

  each(callback) {
    this.elArray.forEach(callback);
  }

  html (string) {
    if (string === undefined) {
      return this.elArray[0].innerHTML;
    } else {
      this.each ( el => {
        el.innerHTML = string;
      });
    }
  }

  empty() {
    this.html("");
  }

  append(newEl) {

    if(typeof newEl === 'object' && !(newEl instanceof DOMNodeCollection)){
      newEl = $l(newEl);
    }

    if(newEl instanceof DOMNodeCollection){
      this.each( el => {
        newEl.each( addEl => {
          el.appendChild(addEl.cloneNode(true));
        });
      });
    } else if (newEl instanceof "string"){
      this.each( el => {
        el.innerHTML += newEl;
      });
    }
  }


  attr(get, set) {
    if (typeof set === "string") {
      this.each( el => {
        el.setAttribute(get, set);
      });
    } else {
      return this.elArray[0].getAttribute(get);
    }
  }

  addClass(className) {
    this.each(el => el.classList.add(className));
  }

  removeClass(className) {
    this.each(el => el.classList.remove(className));
  }

  toggleClass(className) {
    this.each(el => el.classList.toggle(className));
  }

  children() {
    let children = [];
    this.each(node => {
      children = children.concat(Array.from(node.children));
    });
    return new DOMNodeCollection(children);
  }

  parent() {
    const parents = [];
    this.each(node => {
      parents.push(node.parentNode);
    });
    return new DOMNodeCollection(parents);
  }

  find(queryStr) {
    const foundItems = [];
    this.each(node => {
      const foundItem = Array.from(node.querySelectorAll(queryStr));
      foundItems = foundItems.concat(foundItem);
    });
    return new DOMNodeCollection(foundItems);
  }

  remove(queryStr){

    let foundItems;
    if(queryStr !== undefined){
      foundItems = this.find(queryStr);
    } else {
      foundItems = this;
    }

    foundItems.each( el => {
      el.outerHTML = "";
    });

    foundItems.elArray = [];
  }


  on(type, callback) {
    this.each (el => {
      el.addEventListener(type, callback);
      const eKey = `callback-${type.toLowerCase()}`;
      if (!el[eKey]) el[eKey] = [];
      el[eKey].push(callback);
    });
  }

  off(type) {
    this.each (el =>{
      const eKey = `callback-${type.toLowerCase()}`;
      if(el[eKey]) {
        el[eKey].forEach( callback => {
          el.removeEventListener(type, callback);
        });
      }
      el[eKey] = [];
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (DOMNodeCollection);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dom_node_collection_js__ = __webpack_require__(0);


const functions = [];
const runFunctions = () => {
  functions.forEach(fcn => {
    fcn();
  });
};

document.addEventListener("DOMContentLoaded", runFunctions);


window.$l = argument => {
  if (typeof argument === 'string') {
    const selectorList = document.querySelectorAll(argument);
    const selectorArray = Array.from(selectorList);
    return new __WEBPACK_IMPORTED_MODULE_0__dom_node_collection_js__["a" /* default */](selectorArray);
  } else if (argument instanceof HTMLElement) {
    return new __WEBPACK_IMPORTED_MODULE_0__dom_node_collection_js__["a" /* default */]([argument]);
  } else if (argument instanceof Function) {
    if (document.readyState === "complete") {
      argument();
    } else {
      functions.push(argument);
    }
  }
};


$l.extend = (...objects) => {
  return Object.assign(...objects);
};

$l.ajax = (options) => {
  const defaults = {
    method: 'GET',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    url: "",
    success: () => {},
    error: () => {},
    data: {}
  };

  options = $l.extend(defaults, options);
  options.method = options.method.toUpperCase();

  if (options.method === "GET"){
    options.url += "?" + toQueryString(options.data);
  }

  const xhr = new XMLHttpRequest();
  xhr.open(options.method, options.url);

  let promise;

  xhr.onload = () => {
    if(xhr.status === 200){
      options.success(xhr.response);
    } else {
      options.error(xhr.response);
    }

    promise = new Promise( (resolve, reject) => {
      if(xhr.status === 200){
        resolve(xhr.response);
      } else {
        reject(xhr.response);
      }
    });
  };

  xhr.send(JSON.stringify(options.data));

  return promise;
};

const toQueryString = (data) => {
  let result = "";
  for(let prop in data){
    if(data.hasOwnProperty(prop)){
      result += "=" + data[prop] + "&";
    }
  }
  return result.substring(0, result.length - 1);
};


/***/ })
/******/ ]);
