import Ember from 'ember';

export default Ember.Route.extend({
  redirect: function () {
    var url = this.router.location.formatURL('/four_oh_four');
    if (window.location.pathname !== url) {
      this.transitionTo('/four_oh_four');
    }
  }
});