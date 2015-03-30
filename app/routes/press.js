import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this._getLocalHtml( "/press/" );
  },
  title: 'Press'
});
