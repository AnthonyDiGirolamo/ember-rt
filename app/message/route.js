import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    // model: function(params) {
    //     return this.store.query('messages', {ticket:  params.ticket_id});
    // },
});