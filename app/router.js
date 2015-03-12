import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('performers', function() {});
  this.resource('performer', {path: '/performer/:pageUrl'});
  this.resource('venues', function() {});
  this.resource('shows', function() {});
  this.resource('show', {path: '/show/:pageUrl'});
  this.resource('events', function() {});
  this.route('faqs');
  this.route('press');
  this.route('sponsors');
  this.route('contact');
  this.route('four_oh_four', { path: '/*path' });
});

Router.reopen({
  notifyGoogleAnalytics: function() {
    try {
    return window.ga('send', 'pageview', {
        'page': this.get('url'),
        'title': this.get('url')
      });
  } catch(e) {}
  }.on('didTransition')
});

export default Router;
