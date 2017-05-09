# DOMQuery

[Live Demo](https://github.com/madnivek/SnakeGame)

## a simple, easy-to-use JavaScript API for HTML DOM manipulation.

DOMQuery is a small JavaScript library, built for quick and efficient HTML document traversal, manipulation, event-handling, and AJAX requests.

DOMQuery Features:

* Selecting a single or a series of DOM elements
* DOM traversal and manipulation
* Creation and addition of DOM elements
* Queueing document ready callbacks
* Easy-to-write HTTP requests.

## How To Get Started

To use DOMQuery, simply download the library and add the following script tag in your source code.

```HTML
<head>
  ...
  <script type="text/javascript" src="../dist/dom_query.js"</script>
  ...
</head>
```

## API

[`$l`](#l) : universal selector for DOMQuery methods

[DOM Traversal](#dom-traversal)

* [`each`](#each)
* [`children`](#children)
* [`parent`](#parent)
* [`find`](#find)

[DOM Manipulation](#dom-manipulation)

* [`html`](#html)
* [`empty`](#empty)
* [`append`](#append)
* [`attr`](#attr)
* [`addClass`](#addClass)
* [`removeClass`](#removeClass)
* [`toggleClass`](#toggleClass)
* [`remove`](#remove)

[DOM Event Listeners](#event-listeners)

* [`on`](#on)
* [`off`](#off)

### Universal Wrapper $l

DOMQuery wraps all of its methods in a global variable `$l`. `$l` has three main functions:

* When passed a string with a CSS selector, `$l` returns all matching elements in the `DOMNodeCollection`
* When passed an `HTMLElement`, `$l` returns a `DOMNodeCollection` that wraps the element, giving it access to all DOMQuery methods.
* When passed a function, `$l` will add the function to a queue of functions that will run once the DOM is fully loaded.

Example:

```javascript
$l(() => {
    //$l will select all elements in the document with the .example-class class and attach an event listener to each element in the resulting `DOMNodeCollection`
    $l('.example-class').each((el) => {
      el.on('keydown', () => console.log('hello world!'));
    });
  };
)
```

### DOM Traversal

#### `each`
Iterates through all nodes (elements) in a `DOMNodeCollection` and applies the supplied callback function.

#### `children`
Returns a `DOMNodeCollection` containing direct children of each element in the original `DOMNodeCollection`

#### `parent`
Returns a `DOMNodeCollection` containing every parent of each element in the original `DOMNodeCollection`

### DOM Manipulation

#### `html`
Optional string argument. Sets the `innerHTML` of each element in the `DOMNodeCollection` to the supplied string.

When no string is passed, returns the `innerHTML` of the first element in the `DOMNodeCollection`

#### `empty`
Empties the `innerHTML` of each element in the `DOMNodeCollection`

#### `append`
Receives a `string`, `HTMLElement`, or `DOMNodeCollection` as an argument and appends it as a child to each element in the `DOMNodeCollection`.

#### `remove`
Removes each element in the `DOMNodeCollection` from the DOM.

#### `attr`
When receives one argument (`attr(attribute)`), returns the value of the attribute for the first element in the `DOMNOde collection`. When recieves two arguments, (`attr(attribute, value)`) sets each element in the `DOMNodeCollection` with the given attribute to the value.


#### `addClass`
Takes a string argument and adds it as a class name to each element in the `DOMNodeCollection`

#### `removeClass`
Takes a string argument and removes the class name from each element in the `DOMNodeCollection`

#### `toggleClass`
Removes or adds a class from each element in the `DOMNodeCollection`

### Event Listeners

### `on`
Takes two arguments, an event type and a callback and adds the corresponding event listener to each element in the `DOMNodeCollection`

### `off`
Removes an event listener of the specified type from each element in the `DOMNodeCollection.`

### $l.ajax

Sends an HTTP request as specified by the hash object passed as an argument. The argument hash can contain any of the folllowing attributes:
* method: type/method of HTTP request
* url: URL for the HTTP request
* success: success callback
* error: error callback
* contentType: contentType of the HTTP Request

Example:

```javascript
$l.ajax({
  method: "POST",
  url: "/api/notes",
  data: {
    note: {
    title: "Example note",
    body: "This note will be posted"
    }
  },
  success(noteData) {
    console.log(noteData.title)
  },
  error(noteErrors) {
    console.log(noteErrors)
  }
  });
```

#### Features To Be Implemented

* Ability to create DOM elements by passing in a HTML string
* Simple selector functions such as `first`, `last`, `nth-child`, etc...
* `filter` function that will allow filtering of HTML elements by a specific selector
