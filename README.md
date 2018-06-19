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

1. Create a new directory on your system: `mkdir <NAME_FOR_YOUR_FOLDER>`
2. Enter your directory and enter: `npm i express-generator && express --view=hbs`. You will be prompted that the "directory is not empty" and asked whether or not you'd like to proceed. Answer "yes". This will create a simple Express.js server that we can use to serve our web component code to browsers.
3. Install the dependencies with `npm i`.
4. Run the server with the command `DEBUG=* npm run start`. The DEBUG command is an environment variable that we're creating that Express will use to output any 