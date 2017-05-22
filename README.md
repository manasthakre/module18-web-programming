# Module 18: Web Programming

The most common use of programming in JavaScript is to create **dynamic, interactive web pages**: websites where the content changes over time or in response to user input _without the page reloading_. Almost any interaction that isn't following a hyperlink to a new web page is produce through JavaScript. This module provide an overview of using JavaScript to produce interactive web pages: using HTML syntax to define content, programmatically manipulating that content (using the D3 library), responding to user input, and dynamically downloading data.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Contents**

- [Resources](#resources)
- [Web Pages and HTML](#web-pages-and-html)
  - [Elements are Nested](#elements-are-nested)
  - [Scalable Vector Graphics (SVG)](#scalable-vector-graphics-svg)
- [DOM Manipulation with D3](#dom-manipulation-with-d3)
  - [Selecting Elements](#selecting-elements)
  - [Changing Elements](#changing-elements)
    - [Changing Content](#changing-content)
    - [Changing Attributes](#changing-attributes)
  - [Adding Elements](#adding-elements)
- [User Events](#user-events)
- [AJAX](#ajax)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Resources
- [HTML Fundamentals (Joel Ross)](https://info343-au16.github.io/#/tutorials/html). You may also be interested in the rest of the [INFO 343 Web Development](https://info343-au16.github.io/#/) materials, or those from [INFX598 Web Development](https://infx-web-win17.github.io/tutorials/).
- [What is the DOM?](https://css-tricks.com/dom/)
- [SVG Tutorial (MDN)](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial); also the tutorial from [w3schools](https://www.w3schools.com/graphics/svg_intro.asp).
- [D3 Selections](https://github.com/d3/d3-selection)
- [An Introduction to AJAX](https://webdesign.tutsplus.com/tutorials/an-introduction-to-ajax-for-front-end-designers--cms-25099)

## Web Pages and HTML
A webpage is simply a set of files that the browser _renders_ (shows) in a particular way, allowing you to interact with it. Webpage content (words, images, etc.) is formatted and structured using **HTML** (**H**yper**T**ext **M**arkup **L**anguage). This is code that functions similarly to [Markdown](../../module3-markdown) by allowing yout to _annotate_ plain text (e.g., "this content is a heading", "this content is a hyperlink"), except it is much more flexible and powerful.

HTML annotes content by _surrounding_ it with **tags**:

![Element diagram](img/element-diagram.png)

The **opening/start tag** comes before the content and tell the computer "I'm about to give you content with some meaning", while the **closing/end tag** comes after the content to tell the computer "I'm done giving content with that meaning." For example, the ```<h1>``` tag represents a [top-level heading](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements) (equivalent to one `#` in Markdown), and so the open tag says "here's the start of the heading" and the closing tag says "that's the end of the heading". Taken together, the tags and the content they _contain_ are called an **HTML Element**. A website is made of a bunch of these elements.

Tags are written with a less-than symbol **```<```**, then the name of the tag (often a single letter), then a greater-than symbol **```>```**. An _end tag_ is written just like a _start tag_, but includes a forward slash `/` immediately after the less-than symbol&mdash;this indicates that the tag is closing the annotation. Line breaks and white space around tags (including indentation) is ignored.

- HTML tag names are not case sensitive, but you should always write them in all lowercase.

The _start tag_ of an element may also contain one or more **attributes**. These are similar to attributes in object-oriented programming: they specify _properties_, options, or otherwise add additional meaning to an element. Like named keyword parameters in Python or HTTP query parameters, attributes are written in the format `attributeName=value`; Values of attributes are almost always strings, and so are written in quotes. Multiple attributes are separated by spaces:

```html
<tag attributeA="value" attributeB="value">
   content
</tag>
```

For example, a hyperlink anchor (`<a>`) uses a `href` ("**h**ypertext **ref**erence") attribute to specify where the content should link to:

```html
<a href="https://ischool.uw.edu">iSchool homepage</a>
```

- In a hyperlink, the _content_ of the tag is the displayed text, and the _attribute_ specifies the link's URL. Contrast this to the same link in Markdown:

  ```markdown
  [iSchool homepage](https://ischool.uw.edu)
  ```

Every HTML element can include an **`id`** attribute, which is used to give them a unique identifier so that we can refer to them later (e.g., from JavaScript). `id` attributes are named like variable names, and must be **unique** on the page.

```html
<h1 id="title">My Web Page</h1>
```

Other common attributes include `style` for specifying appearance style rules, or `class` for giving a (space-separated) list of [Cascading Style Sheet](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS) classifications.

Some HTML elements don't require a closing tag because they don't or can't contain any textual content. These tags are often used for inserting media into a web page, such as with the `<img>` tag. With an `<img>` tag, you can specify the path to the image file in the `src` attribute, but the image element itself can't contain additional text or other content. Since it can't contain any content, we leave off the end tag entirely. However, we do include the "end" slash **`/`** just before the greater-than symbol to indicate that the element is complete and to expect no further content:

```html
<!-- images have no text content! -->
<img src="picture.png" alt="description of image for screen readers and indexers" />
```

### Elements are Nested
The content of an HTML element can contain _other_ HTML tags (and thus other HTML elements):

![Nesting diagram](img/nesting.png)

The semantic meaning indicated by an elements applies to _all_ its content: thus all the text in the above example is a top-level heading, and the content "(with emphasis)" is emphasized as well.

Because elements can contain elements which can _themselves_ contain elements, an HTML document ends up being structured as a <a href="https://en.wikipedia.org/wiki/Tree_(data_structure)">**"tree"**</a> of elements:

![DOM tree](img/dom-tree.jpg)

In an HTML document, the `<html>` element is the "root" element of the tree. Inside this we put a `<head>` element to represent "header" information (meta-data that is **not**shown on the page itself), and a `<body>` element to contain the document's "body" (the shown content):

```html
<html>
  <head>
    <title>The title that appears in the browser tab</title>
  </head>
  <body>
    <h1>Hello world!</h1>
    <p>This is <em>conteeeeent</em>!</p>
  <body>
</html>
```

This model of HTML as a tree of "nodes"&mdash;along with an API (programming interface) for manipulating them&mdash; is known as the [**Document Object Model (DOM)**](https://en.wikipedia.org/wiki/Document_Object_Model).


### Scalable Vector Graphics (SVG)
[**Scalable Vector Graphics (SVG)**](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics) is a syntax for representing ("coding") simple graphical images. For example, you can use SVG to define "a 100x200 pixel green rectangle at the top of the screen", or a squiggly line that follows a path like a la Turtle Graphics! SVG images can be very complex and made up of lots of different shapes: most logos, icons, and other "non-photograph" images on the internet are defined using SVG.

SVG is used to represent [vector graphics](https://en.wikipedia.org/wiki/Vector_graphics)&mdash;that is, pictures defined in terms of the connection between points (lines and other shapes), rather than in terms of the pixels being displayed. In order to be shown on a screen, these lines are converted (_rastered_) into grids of pixels based on the size and resolution of the display. This allows SVG images to "scale" or "zoom" independent of the size of the display or the image&mdash;you never need to worry about things getting blurry as you make them larger!

SVG images are written in a [XML](https://en.wikipedia.org/wiki/XML) (E**x**tensible **M**arkup **L**anguage) syntax that is identical to HTML (just with different "tags"). And in HTML5 (supported by all modern browsers), SVG elements can be included _directly_ in the HTML, allowing you to include&mdash;and more importantly, manipulate&mdash;these elements as if they were any other HTML element.

An SVG image is specified with an **`<svg>`** tag, inside of which is _nested_ the individual shapes and components that should be shown. `<svg>` tags are usually give a `width` and `height` attribute specifying their size (in screen pixels). Inside the `<svg>` tag are nested further elements, each representing a different shape:

```html
<svg width=400 height=400> <!-- the image -->
   <!-- a rectangle -->
   <rect x=20 y=130 width=50 height=80 />

   <!-- a circle -->
   <circle cx=150 cy=150 r=35 />

   <!-- some text -->
   <text x=100 y=100>SVG!</text>

   <!-- a turtle-style "path" of a triangle -->
   <path d="M150 0 L75 200 L225 200 Z" />
</svg>
```

Notice that each "shape" uses different attributes to define its appearance:

- A `<rect>` has an (x,y) position, as well as a width and height.
- A `<circle>` has a "**c**enter-x" and "**c**enter-y" position, as well as a **r**adius.
- A `<text>` includes the text to show as the element's content.
- A `<path>` defines a turtle-style path as a string of instructions. For example, `M` means "**m**ove to" the following (absolute) coordinates, and `L` means "draw a **l**ine to" the following (absolute) coordinates, and the `Z` means to "close/end" the path by drawing a line back to the start. See [the SVG specification](https://www.w3.org/TR/SVG/paths.html#PathData) for complete details.

  Note that SVG paths can be quite complex. The below path represents the UW logo!

  ```html
  <path d="M 111.003,0 L 111.003,18.344 L 123.896,18.344 L 109.501,71.915 C 109.501,71.915 91.887,0.998 91.636,0 L 73.006,0 C 72.743,0.975 53.684,71.919 53.684,71.919 L 40.427,18.344 L 53.851,18.344 L 53.851,0 L 0,0 L 0,18.344 L 11.932,18.344 C 11.932,18.344 32.523,100.706 32.772,101.706 L 61.678,101.706 C 61.934,100.729 75.476,49.251 75.476,49.251 C 75.476,49.251 88.343,100.716 88.591,101.706 L 117.495,101.706 C 117.755,100.723 139.422,18.344 139.422,18.344 L 151.256,18.344 L 151.256,0 L 111.003,0 z"/> <!-- from wikicommons -->
  ```

Additionally, all SVG shape elements support attributes that indicate the _appearance_ of that shape. These include (among other options):

- **`fill`** indicates the color that the shape should be "filled in". This can be a [named colors](https://www.w3schools.com/colors/colors_names.asp) or [RGB hex codes](https://www.smashingmagazine.com/2012/10/the-code-side-of-color/).
- **`stroke`** indicates the color of the shape's _outline_. This can be different than the `fill` color.
- **`stroke-width`** can be used to specify the width of the shape's outline (in pixels).
- **`style`** allows you to specify CSS style properties (in a format `property:value;`), and is can be used for some appearance aspects that are not supported by specific attributes. For example, this can be used to make a shape transparent using the `opacity` property:

  ```html
  <!-- a circle that is 50% transparent -->
  <circle cx=100 cy=100 r=50 fill="red" style="opacity:0.5;" />
  ```

## DOM Manipulation with D3
We use JavaScript to make a web page's content **dynamic** (change over time) and **interactive** (responding to user input) by writing a script that will _modify_ the HTML elements that are shown on the page: whether by changing their content, attributes, or even creating new elements!

Web browsers render HTML into a **DOM** tree that provides an [API](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) for performing these operations (e.g., by calling methods on the provided `document` global module). While this is a perfectly reasonable and effective way of making interactive web pages, this module will focus on how to use the [D3](https://d3js.org/) library to interact with the DOM. The D3 library provides more powerful and (slightly) easier-to-use functions for manipulating the HTML. Moreover, learning these functions now will make it easier to later use D3 for its primary purpose: creating interactive visualizations (described in a subsequent learning module).

D3 is a third-party library, so as with Python modules we will need to "download" it and "import" it into our script. We do this by including a `<script>` tag with a _link_ to the online version of the library **before** the `<script>` tag for our script:

```html
<script src="https://d3js.org/d3.v4.min.js"></script>
```

- Note that this means you will need to be connected to the internet to utilize this library. If you need to write your program offline, you can instead download the library (the `d3.zip`) and load the included `d3.min.js` script.

### Selecting Elements
In order to modify the web page's HTML elements from a JavaScript script, the first thing you will need to do is get a **reference** to the particular element you wish to modify: that is, create a _variable_ whose value an object corresponding to that element.

In D3, we can get this object by using the **`d3.select()`** function. This function takes as a **string** as an argument specifying _which_ element in the DOM should be selected. This string can take a few different formats:

- Specifying the element's **tag name** will select the _first_ element on the page (from the top) with that tag:

  ```js
  var header = d3.select('h1'); //select the FRIST <h1> element
  ```

  Note that the angle brackets `<>` are _not_ included in the selector string&mdash;just the tag itself.

  This format works great if you know there is only one element of a type on the page (e.g., if there is only one `<svg>` image on the page).

- You can select a particular element by its **`id`** attribute by using that `id` with a **`#`** immediately front of it:

  ```js
  var element = d3.select('#myElement'); //selects the element with attribute `id="myElement"`
  ```

  The `#` symbol can be read as "thing with id of". This format works great to select a particular element from many (as long as that element has an `id` attribute of course!)

- You can also use most any other standard [CSS selector](https://www.w3schools.com/cssref/css_selectors.asp) to be more precise about which element you wish to reference. In any case, the `d3.select()` function will return the **first** matching element.

The `d3.select()` function returns an object that is like an instance of a **`d3.selection`** class. You can think of these as being "D3-specific" versions of that HTML DOM element. This object will provide a variety of methods that we can use to manipulate that element, as described below.

It is possible to select more than one element by using the `d3.selectAll()` function. This function also takes a selector string as an argument, but instead returns a `d3.selection` object that refers to **all** elements that "match" the selector. For example, `d3.selectAll('p')` will return an object representing all of the `<p>` (paragraph) tags on the page. This will allow us to easily manipulate large numbers of similar elements (e.g., all of the `<circle>` elements in a scatter plot).

- All the `d3.selection` methods are **vectorized** (like with a `pandas` Series), meaning that they will apply to _each_ selected DOM element. Thus calling a method to change the result of a `d3.selectAll()` function will change _all_ of those elements in the same way. See below for examples.

It is also possible to call the `select()` and `selectAll()` methods on a `d3.selection` object. In this case, D3 will return the match **child** element(s) from the DOM tree. For example, consider the HTML:

```html
<div id="firstGroup">
  <p>First paragraph</p>
</div>
<div id="secondGroup">
  <p>Second paragraph</p>
  <p>Third paragraph</p>
</div>
```

In order to get a reference to the "Second paragraph", you could use the following:

```js
var secondGroup = d3.select('#secondGroup');  //select second <div> by `id`
var paragraph = secondGroup.select(`p`);  //select first <p> inside that element
```

This allows you to interact with only particular "branches" of the DOM tree by first selecting the "root" of that branch, and the selecting the element(s) from that branch that you care about.

### Changing Elements
Once you have a _reference_ to an element, you can call methods on that object in order to modify its state in the DOM&mdash;which will in turn modify how it _currently_ is displayed on the page. Thus by calling these methods, you are dynamically changing the web page's content!

- **Important** these methods _do not change the `.html` source code file!_ Instead, they just change the _rendered DOM elements_ (think: the content stored in the computer's memory rather than in a file). If you refresh the page, the content will go back to how the `.html` source code file specifies it should appear&mdash;unless that also loads the script that modifies it. With such dynamic content, what is shown on the page is the HTML with the JavaScript modifications added in.


#### Changing Content
You can change a select element's **content** of an element (e.g., the stuff between the start and close tags) by using the **`.text()`** method. This method takes as an argument the new content for the element (which will replace any old content):

```js
var paragraph = d3.select('p');
paragraph.text('This is new content!');  //change the paragraph's content.
```

Remember that an element's contents can include _other HTML elements_. However, any HTML included in the argument string will be _escaped_ and shown as text content (e.g., showing the `<>`). For example:

```js
var paragraph = d3.select('p');
paragraph.text('This is <em>new</em> content!');
```

will change the paragraph to display: "This is &lt;em&gt;new&lt;/em&gt; content!"

If you want to include HTML elements inside the new content, you should instead use the `.html()` method:

```js
var paragraph = d3.select('p');
paragraph.text('This is <em>new</em> content!');
```

will change the paragraph to display: "This is _new_ content!"

- Be careful using `.html()` to display any user-provided data, since the content they give could include malicious `<script>` tags!
- The `.html()` method is primarily used for "inline" formatting tags like `<em>` (emphasis, italics) or `<strong>` (bold).
- The `.html()` method does not work with SVG elements; see below for other options.

Both the `.text()` and `.html()` can also be called without _any_ arguments. In this situation, the methods _return_ a string of the element's content without changing anything (`.text()` returns a string with all of the HTML tags removed). This lets you "get" the current contents of an element, such if if you want to do any string processing on it.

Calling either method on a selection with multiple elements (e.g., from `d3.selectAll()`) will cause the change to be made to _all_ of the elements in the selection.

#### Changing Attributes
You can change a selected element's **attributes** calling the **`.attr()`** method on that selection. This method takes two arguments: the name of the attribute to change, and the new value to give to that attribute:

```js
var circle = d3.select('circle');  //select a circle
circle.attr('fill', 'green');  //make the circle green
```

The `.attr()` method _returns_ a reference to the object that it modified. You can then use that returned value as the _anonymous subject_ of additional method calls. This is called **chaining methods**:

```js
var circle = d3.select('circle')  //no semicolon!
    .attr('fill', 'green')  //call `.attr()` on (anonymous) result
    .attr('stroke', 'yellow')  //call .attr() on (anonymous) result
    .attr('stroke-width', 5);  //semi-colon when all done
```

- The first `d3.select()` call returns a selection for a `<circle>` element, which we then call `.attr()` on to change its fill color. That method returns _the same_ circle element, which we then call `.attr()` to change its stroke color. _That_ method then returns the same circle element again, which call `.attr()` on a third time to change its stroke width. The third `.attr()` returns the same circle yet again, which is the ultimate result of this expression and so is assigned to the `circle` variable.

- Method channing is very common when working with D3 and in JavaScript in general, such as when you want to do lots of things in sequence to the same set of objects.

The `.attr()` method can also be called without the second argument (the new value), in which case it returns the _current_ value of the specified attribute.

Calling this method on a selection with multiple elements (e.g., from `d3.selectAll()`) will cause the change to be made to _all_ of the elements in the selection.

In addition to changing the attributes, you can also change components of the CSS `style` attribute directly using the `.style()` method. This takes similar arguments, and can be used for easily adjusting the style.

### Adding Elements
You can use JavaScript to add new elements as _children_ of a selection (e.g., inside that element) by using the **`append()`** method. This method takes as an argument the _name of the tag_ to create and add (without the `<>`). The `.append()` method _returns_ a reference to the newly created element, allowing you to call further methods (e.g., `.text()`, `.attr()`) to specify the content or attributes of this new element.

For example, if you have HTML:

```html
<div id="content">
</div>
```

then you could add a new `<p>` _inside_ that `<div>`, along with some content:

```js
var div = d3.select('#content');  //get reference to the <div>
var newP = div.append('p');  //add a new <p>
newP.text('Hello world!');  //set the content
```

which will produce:

```html
<div id="content">
   <p>Hello world!</p>
</div>
```

- You can of course use _method chaining_ here as well, including to add and create multiple new elements at once!

- `append()` adds an element as the "last" child of the parent. If you wish to insert an element _before_ a sibling, using the `insert()` method with a second argument of a selector string for which element you want to the new one to precede.

You can remove a selected element by calling the `remove()` method on it.

Calling any of these methods on a selection with multiple elements (e.g., from `d3.selectAll()`) will cause the change to be made to _all_ of the elements in the selection&mdash;each element will have a new child added, or each element will be removed.


## User Events
<!-- //event-based programming / listeners
//.on('click') and callbacks -->


## AJAX
<!-- //what is it? Having our program send HTTP requests!
//d3.json()
//also d3.csv() !
//note about needing to run a separate web server -->
