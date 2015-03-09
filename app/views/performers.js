import Ember from 'ember';

export default Ember.View.extend({
  showLazyImages: function() {
    $("img.lazy").lazyload();
  }.on("didInsertElement")
});
