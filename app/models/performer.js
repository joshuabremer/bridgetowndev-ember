import DS from 'ember-data';

var Performer = DS.Model.extend({

    events: DS.hasMany('event', {inverse: 'performers'}),

    mc_events:  DS.hasMany('event', {inverse: 'emcees'}),

    Name: DS.attr('string'),

    Twitter: DS.attr('string'),

    Website: DS.attr('string'),

    PhotoUrl: DS.attr('string'),

    SortOrder: DS.attr('number'),

    ExcludeFromList: DS.attr('boolean'),

    slug: function() {
      return sluggify(this.get('Name'));
    }.property('Name'),

    Bio: DS.attr('string'),

    pageUrl: DS.attr('string'),

    twitterUrl: function() {
      return "https://twitter.com/" + this.get("Twitter").replace("@", "");
    }.property("Twitter"),

    headshot300: function() {
      return '/img/performer-images/performer-' + cleanStr(this.get('Name')) + '-300x300.jpg';
    }.property('Name'),

    backgroundImageCSS: function() {
      return "background-image:url('" + this.get("PhotoUrl") + "?format=300w')";
    }.property("PhotoUrl"),

    isAnMC: function() {
      return this.get('mc_events').get('length');
    }.property('mc_events.@each.isLoaded'),

    sortedEvents: function () {
      var events = this.get('events').toArray();
      return events.sort(function (lhs, rhs) {
        return lhs.get('start_time') > rhs.get('start_time');
      });
    }.property('events.@each.isLoaded'),

    allSortedEvents: function () {
      var events = this.get('events').toArray().slice(0);
      var mc_events = this.get('mc_events').toArray();
      var all_events = events.slice(0).concat(mc_events);

      return all_events.sort(function (lhs, rhs) {
        return lhs.get('start_time') > rhs.get('start_time');
      });
    }.property('events.@each.isLoaded','mc_events.@each.isLoaded')
});

function sluggify(string) {
  string = string || "";
  return string.replace(/\W/g, '-').toLowerCase();
}

function cleanStr(string) {
  string = string || "";
  return string.replace(/\W/g, '').toLowerCase();
}


export default Performer;
