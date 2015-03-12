import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    error: function (error) {
      Ember.Logger.error(error);
      this.transitionTo('/not-found');
    }
  },

  model: function(params) {
    var _this = this;

    return this.loadAllData()
      .then(function() {
        return _this.store.find('show',params.pageUrl.split('-')[0]);
      });
  },
  title: 'Show'
});
