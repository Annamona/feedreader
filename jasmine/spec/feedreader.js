/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

         it('have valid URL', function() {
             allFeeds.forEach(function(feed) {
               expect(feed.url).toBeDefined();
               expect(feed.url).not.toBe("");
             });
         });

         it('have valid Name', function() {
             allFeeds.forEach(function(feed) {
               expect(feed.name).toBeDefined();
               expect(feed.name).not.toBe("");
             });
         });
    });

    describe('The menu', function() {
      /* The menu is hidden using the class menu-hidden
       * toggle this class will show or hide again the menu
       */
        it('is hidden by default', function() {
            expect($(document.body).hasClass("menu-hidden")).toBe(true);
        });
         it('is hiding/showing on click', function() {
             $(".menu-icon-link").trigger("click");
             expect($(document.body).hasClass("menu-hidden")).toBe(false);
             $(".menu-icon-link").trigger("click");
             expect($(document.body).hasClass("menu-hidden")).toBe(true);
         });
    });

    describe('Initial Entries', function() {
        beforeEach(function(done){
            loadFeed(1,function(){done();});
        });
        it('at least 1 is defined', function(done) {
            var entries = $(".feed").find(".entry");
            expect(entries.length).not.toBe(0);
            done();
        });
    });


    describe('New Feed Selection', function() {
      var previous;
      beforeEach(function(done){
          loadFeed(0,function(){done();});
      });
      beforeEach(function(done){
          previous = $(".feed").html();
          loadFeed(1,function(){done();});
      });
      it('is loading different feeds entry', function(done) {
          expect($(".feed").html()).not.toBe(previous);
          done();
      });
    });
}());
