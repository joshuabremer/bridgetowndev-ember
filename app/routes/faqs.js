import Ember from 'ember';
var $ = Ember.$;

export default Ember.Route.extend({
  model: function() {

    var host = "http://www.bridgetowncomedy.com";
    if ( window.location.host === "localhost:4000" ) {
      host = "http://localhost:4000";
    }
    return Ember.$.ajax( host + "/faqs")
      .then(function(data) {
        return $(data).find("#jekyll-content").html();
    });
  },
  title: 'Faqs'
});
