import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this._getLocalHtml( "/" );
  },

  renderTemplate: function() {
    this.render('index');
    this.render('jumbotron_index', { outlet: 'jumbotron' });
  }
});
