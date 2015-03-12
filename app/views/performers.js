import Ember from 'ember';

export default Ember.View.extend({
  showLazyImages: function() {
    Ember.$("img.lazy").lazyload();
  }.on("didInsertElement")
});
