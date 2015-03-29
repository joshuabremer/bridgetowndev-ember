import Ember from 'ember';
export function initialize(/* container, application */) {
  // application.inject('route', 'foo', 'service:foo');
}

export default {
  name: 'trackjs',
  initialize: function() {
    // Log Emberjs errors to TrackJS
    Ember.onerror = function(error){
      if(window.trackJs) {
        window.trackJs.track(error);
      }

      // Optional pass error through to embers error logger
      Ember.Logger.assert(false, error);

    };

    // Log Ember promise errors
    Ember.RSVP.on('error', function(error) {

      if(window.trackJs) {
        window.trackJs.track(error);
      }

      // Optional pass error through to embers error logger
      Ember.Logger.assert(false, error);

    });
  }
};
