import Ember from 'ember';
var $ = Ember.$;

export default Ember.Route.extend({
  model: function() {

    return Ember.$.ajax("http://www.bridgetowncomedy.com/faqs")
      .then(function(data) {
        return $(data).find("#jekyll-content").html();
    });
  },
  title: 'Faqs'
});
