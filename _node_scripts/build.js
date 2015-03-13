var ShowBuilder = require( "./build_shows");
var buildEvents = require( "./build_events");
var buildVenues = require( "./build_venues");
var PerformerBuilder = require( "./build_performers");
var festivalData = require( "./festival-data" );
var Q = require( "q" );
var util = require( "./utilities" );

TMP_EVENTS_PATH = festivalData.tmpEventsPath;
////http://bridgetown.festivalthing.com/export/events/json
FESTIVALTHING_EVENTS_URL = "http://127.0.0.1:4200/fixtures/festivalthing-events.json";

TMP_VENUES_PATH = festivalData.tmpVenuesPath;
////http://bridgetown.festivalthing.com/export/venues/json
FESTIVALTHING_VENUE_URL = "http://127.0.0.1:4200/fixtures/festivalthing-venues.json";

TMP_SCHEDULE_PATH = festivalData.tmpSchedulePath;
////http://bridgetown.festivalthing.com/export/schedule/json
FESTIVALTHING_SCHEDULE_URL = "http://127.0.0.1:4200/fixtures/festivalthing-schedule.json";

TMP_PERFORMERS_PATH = festivalData.tmpPerformersPath;
//http://bridgetown.festivalthing.com/export/performers/json
FESTIVALTHING_PERFORMERS_URL = "http://bridgetown.festivalthing.com/export/performers/json";

TMP_SHOWS_PATH = festivalData.tmpShowsPath;
////http://bridgetown.festivalthing.com/export/submitted-shows/json
FESTIVALTHING_SHOWS_URL = "http://bridgetown.festivalthing.com/export/submitted-shows/json";


Q.all([
  // util.requestJsonAndSave( FESTIVALTHING_VENUE_URL, TMP_VENUES_PATH ),
  // util.requestJsonAndSave( FESTIVALTHING_EVENTS_URL, TMP_EVENTS_PATH),
  // util.requestJsonAndSave( FESTIVALTHING_SCHEDULE_URL, TMP_SCHEDULE_PATH),
  util.requestJsonAndSave( FESTIVALTHING_PERFORMERS_URL, TMP_PERFORMERS_PATH),
  util.requestJsonAndSave( FESTIVALTHING_SHOWS_URL, TMP_SHOWS_PATH)
]).then(function() {
  // buildVenues();
  // buildEvents();

  var a = new ShowBuilder();
  a.buildFixtures();
  a.createHeadshots();

  var b = new PerformerBuilder();
  b.buildFixtures();
  b.createHeadshots();
}).catch(function(error) {
  console.error(error.stack);
})



