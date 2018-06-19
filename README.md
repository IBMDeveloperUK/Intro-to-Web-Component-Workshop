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

### Creating the <component-blink> tag