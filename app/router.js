import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('ticket', { path: 'ticket/:ticket_id' }, function() {
    this.route('messages');
  });
});

export default Router;
