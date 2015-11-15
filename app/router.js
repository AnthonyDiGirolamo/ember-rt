import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('search', function() {
    this.route('show', { path: ':search_id' }, function() {
      this.route('ticket', { path: 'ticket/:ticket_id' });
    });
  });
  this.route('ticket', { path: 'ticket/:ticket_id' }, function() {
  });
  this.route('login');
});

export default Router;
