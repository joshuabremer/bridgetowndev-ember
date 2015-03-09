import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var host = "http://www.bridgetowncomedy.com";
    if ( window.location.host === "localhost:4000" ) {
      host = "http://localhost:4000";
    }

    return Ember.$.ajax( host + "/")
      .then(function(data) {
        return Ember.$(data).find("#jekyll-content").html();
    });
  },

  renderTemplate: function() {
    this.render('index');
    this.render('jumbotron_index', { outlet: 'jumbotron' });
  }
});
