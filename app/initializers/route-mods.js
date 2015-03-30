import Ember from 'ember';
export function initialize(/* container, application */) {
  // application.inject('route', 'foo', 'service:foo');
}

export default {
  name: 'route-mods',
  initialize: function() {
    Ember.Route.reopen({
      render: function() {
        this._super();
        window.scrollTo(0, 0);
      },
      activate: function() {
        this._super();
        if (this.get('title')) {
          document.title = this.get('title') + ' | Bridgetown Comedy Festival';
        } else {
          document.title = 'Bridgetown Comedy Festival';
        }
      },
      deactivate: function() {
        if (Ember.$(".navbar .navbar-collapse.collapse.in").length) {
          Ember.$(".navbar-toggle").not(".collapsed").click();
        }
      },
      loadAllData: function() {
        return Ember.RSVP.hash({
          venues: this.store.find('venue'),
          events: this.store.find('event'),
          performers: this.store.find('performer'),
          shows: this.store.find('show')
        });
      },

      _getLocalHtml: function( pageUrl ) {
        var host = "http://www.bridgetowncomedy.com";
        if ( window.location.host === "localhost:4000" ) {
          host = "http://localhost:4000";
        }
        return Ember.$.ajax({
          url: host + pageUrl,
          dataType: "html"
        })
          .then(function(data) {
            return Ember.$(data).find("#jekyll-content").html();
        });
      }
    });
  }
};
