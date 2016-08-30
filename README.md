# Udacity Capstone Project- University Search Website
A University Search application to help international students planning to pursue Master's in USA, pick the right colleges based on their test scores.
Website features all technologies learnt throught the Udacity Nanodegree

## [DEMO] (https://university-search.herokuapp.com)

Requirements:
- App is equally functional on mobile and desktop, using responsive design to ensure its displayed in a useable state.
- All form inputs have appropriate types, labels, placeholders, and immediately validated.
- Application defaults to offline-first functionality, functioning if a network connection does not exist.
- All images have alternative text, focus is appropriately managed, elements are semantically used appropriately. When semantic elements are not used, ARIA roles are properly applied. Colors and contrast are managed.
- If components are used, they are self-contained units of functionality and declaratively configurable.
- The application is installable to user’s home screen.
- Application uses native features, like push notifications, Bluetooth, geolocation, as appropriate for the application.
- App includes a build process (such as Grunt or Gulp). Assets are minimized and concatenated as appropriate.

##Technologies Used:
- [ECMAScript 6](http://es6-features.org/)
- [AngularJS v1.5.7](https://angularjs.org/)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Gulp](http://gulpjs.com/)
- [Sass](http://sass-lang.com/)
- HTML5
- CSS3

##Compiler Used:
[Babel](https://babeljs.io/)

##Instructions to Run the Application (PRODUCTION):
- Installing dependencies:
```{r, engine='bash', count_lines}
$ npm run dep
```
This will install both npm and bower dependencies
- Running the Application:
```{r, engine='bash', count_lines}
$ npm run serve
```
This will run gulp serve, which will Compile, Collect & Minify all the Required Assets & Place them in a build directory and then serve it.

