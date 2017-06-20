import DOMNodeCollection from './lib/dom_node_collection.js';

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
    return new DOMNodeCollection(selectorArray);
  } else if (argument instanceof HTMLElement) {
    return new DOMNodeCollection([argument]);
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

  return new Promise( () => {
    const xhr = new XMLHttpRequest();
    xhr.open(options.method, options.url);
    xhr.onload = () => {
      if(xhr.status === 200){
        options.success(xhr.response);
      } else {
        options.error(xhr.response);
      }
    };
    xhr.send(JSON.stringify(options.data));
  });
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
