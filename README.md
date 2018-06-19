# Introduction to Building Web Components
Details and demos for a ~90 minute workshop

## Overview

By following this workshop, you will learn:

    1. What technologies make up a Web Component
    2. How they can be used / are useful
    3. The current compatability of web components with modern browsers, and...
        - How we can polyfill much of their functionality
    4. How the different technologies can interact with one another
    5. How to build web component that:
        A. Can emulate the classic <blink> tag
        B. Can hide spoilers for stories in text
        C. Can easily interface with a webcam
    6. Which front-end frameworks can help you use Web Components today.

## Prerequisites

To follow this workshop, you will need:

    1. Node.js / npm installed `>= 7.0.0`
    2. Your favourite IDE
    3. A modern web browser (Chrome/Firefox/Safari/Samsung Internet)

Though not strictly neccesary to have all of the above to follow the workshop, you will struggle to run the code examples without them.

## So, what is a Web Component?

// Answer this after working through all of the steps to build the web components.

## Getting started
**NB**: _These following steps are for individuals running macOS/Linux systems. If you're running a Windows device, you may need to adjust some of the CLI commands to better suit your OS._

### Creating an Express.js server to run our code from

1. Either clone or download this repo to your system `git clone git@github.com:seanmtracey/web-component-examples.git`
2. Using your CLI (such as terminal, or iTerm) enter the newly downloaded repo with `cd web-components-examples/scaffold`. This is the directory that we'll be working from for the remainder of the workshop. It has all of the code that we'll need to deliver the web components that we'll be writing code for in the next little while. In essence, directory is a very simple Express.js web server that uses the Handlebars templating system to deliver the HTML/CSS/JavaScript that  we'll construct (including the required polyfills to help with cross-browser compatability).
3. Install the dependencies for our Express.js server with `npm i`. This may take a few moments, depending on your speed of your internet connection.
4. Enter `DEBUG=* npm run start` to start the server. The `DEBUG=*` is an environment variable that Express.js uses to decide how verbose it should be in it's logging. In this case we're telling it to be as verbose as possible.
5. After a bunch of text has scrolled by, you should see the message "Listening on port 3000". This means that your server has successfully installed all of its dependencies and started. You should now be able to access it in a browser by heading to `http://localhost:3000`. Once the page has loaded you should see something like the following: 
![The webpage displaying (currently none of) the available web components](images/first_run.png)
There's no web components listed! Don't worry, that's because we haven't made any yet, but now we're ready to start putting together the code for our first web component - A modern version of the `<blink>` tag.

### Creating the `<component-blink>` tag

If you arrived on the world wide web sometime after the year 2000, you may not have ever encountered the `<blink>` tag in the wild before. The result of a drunken conversation between two developer of the Lynx browser in the mid-90's, the `<blink>` tag would make any amount of text that it surrounds _blink_. It sounds innocent enough, but when used heavily (as it was) web users grew to detest the tag and browser vendors moved to deprecate it towards the end of the noughties.

**_THAT SAID..._** because it's such a simple little bit of functionality to code (and the author of this document is a sucker for web nostalgia) it's the perfect candidate for the first web component that we'll code.

First up, we need to create a file to put all of our code in. In the `views` folder of the `scaffold` directory that we've been running our commands in so far, there is an empty folder called `components`. This is where we'll be writing the code for the three web components that we'll be making.

1. Create a new file with the following command `touch views/components/blink.hbs` (a Handlebars template file) and then open `blink.hbs` for editing in _Your Favourite IDE™_
2. Restart your Express.js server with `DEBUG=* npm run start` and reload the page at `http://localhost:3000`. You'll now see that "Blink" is a web component that we can view! You can click the link, but the page will be blank.
3. Let's write some code! The very first thing we're going to enter in our `blink.hbs` file is `<h1><component-blink>Blink</component-blink></h1>`. When we've finished writing the code for this component, our header node will blink (which is only fitting, given that it's the _blink page_).
4. If you like, you can add some random text/lipsum/meaningful words into the page which you could also wrap in `<component-blink>` tags. Whatever you wrap will blink when we're done, so do so at your own discretion.

Once you've added all of the text and markup you want to blink it's time to add a `<template>` tag to our page. The `<template>` tag serves as a place to put the content that and styles that we want all of our web components of a certain type to contain. It only really exists to be cloned/copied/queried, and any text/HTML included within will not be rendered. Think of the `<template>` tag as an element which contains fragments of HTML that can be used for rendering elsewhere - like in the shadow DOM of a web component, which we'll get to shortly.

5. Copy the following HTML and paste it after all of the text/HTML that you've added to the `blink.hbs` file. This `<template>` node contains all of the HTML and CSS that the Shadow DOM of our web component will use to render the component.
```HTML
<template id="component-blink-template">
    <style>

        #content[data-visible="false"]{
            opacity : 0;
        }

    </style>
    <span data-visible="true" id="content"></span>

</template>
<!--SNIPPET ZERO-->

```

Next, we're going to create a `<script>` tag. In here, we'll create a JavaScript class which will inherit all of the properties of a standard HTML element, and then we'll write JavaScript to augment how we want that node to look and behave. 

6. Copy and paste the following just after the line that reads `<!--SNIPPET ZERO-->` we created in the previous step.

```HTML

<script>

    const templateElement = document.body.querySelector('template#component-blink-template');

    class Blink extends HTMLElement {

        constructor() {
            
            super();

            // SNIPPET ONE
    
        }

    }
    // SNIPPET TWO

</script>

```
We now how a JavaScript class which has all of the properties and functions that are available to HTML elements. This saves us a great deal of effort in duplicating commonly used function for interrogating and manipulating HTML elements. The calling of the `super()` in the `constructor` function.

Next up, we're going to add a Shadow DOM to our web component element, a shadow DOM is just like the regular DOM, except that it's scoped to the element that it's within, and in most circumstance isn't directly accessible from code outside of the component (although some global things like styles can bleed on through, and events can still be passed between elements, which we'll look at later).

7. Copy and paste the following JavaScript just after the `// SNIPPET ONE` line in the previous code.

```JavaScript
const elementNode = this;

elementNode.attachShadow({mode: 'open'});
elementNode.shadowRoot.appendChild(document.importNode(templateElement.content, true));

// SNIPPET THREE

```
The `elementNode` variable gives us a convenient way to refer to the root element of the web component we're creating (the `<component-blink>` node itself). The `elementNode.attachShadow` line of code is where we instruct our browser to create and append a shadow DOM to our `<component-blink>` node. The `{mode: open}` object tells our browser that we want the shadow DOM to be open, which basically means that we can access the shadow DOM with `elementNode.shadowRoot` instead of defining some other property to use.

The line just after `elementNode.attachShadow` tells our browser to take all of the content of the `<template>` node that we created earlier and add it to the shadow DOM of the `<component-blink>` tag. Once there, we can start to write code that interacts with the elements in the shadow DOM.

8. We're almost ready to get our nodes `<blink>`ing! Copy and paste the following code just after the `// SNIPPET THREE` line to add the blink functionality to our elements

```JavaScript
const contentNode = elementNode.shadowRoot.querySelector('#content');
contentNode.textContent = elementNode.textContent;

setInterval(function(){

    contentNode.dataset.visible = contentNode.dataset.visible === "false" ? "true" : "false";

}, 500);
```
The `contentNode` line just gives us a convenient way to access the `<span>` element we defined in our template node, and that now lives in our elements shadow DOM. We set the content of the `<span>` tag to the text content that the `<component-blink>` tag is set to, and then every 500 seconds we check to see whether or not the tag is visible. If it's visible we make it invisible, and vice-versa.

9. Final step. Copy and paste `window.customElements.define('component-blink', Blink);` just after the `// SNIPPET TWO` line of code that we wrote back in step 6 (you didn't forget about _SNIPPET TWO_, did you?). This registers the `<component-blink>` tag with our browser, and lets the code the we've written execute for every instance of the `<component-blink>` tag on our page.

10. Save the file, restart the server, and then head to `http://localhost:3000/component/blink` and see our new `<component-blink>` tag in all its blinky glory. You can also just head back to `http://localhost:3000/` and click on the "Blink" link in there too.