import Ember from 'ember';
var $ = Ember.$;

export default Ember.Route.extend({
  model: function() {

    return Ember.$.ajax("http://www.bridgetowncomedy.com/venues/")
      .then(function(data) {
        return $(data).find("#jekyll-content").html();
    });
  },
  title: 'Venues'
});
