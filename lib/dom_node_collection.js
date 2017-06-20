class DOMNodeCollection {
  constructor (elArray){
    this.elArray = elArray;
  }

  each(callback) {
    this.elArray.forEach(callback);
  }

  html(string) {
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

    if(typeof newEl === 'object' &&
      !(newEl instanceof DOMNodeCollection)){
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

export default DOMNodeCollection;
