import Ember from 'ember';
// import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

// export default Ember.Route.extend(AuthenticatedRouteMixin, {
export default Ember.Route.extend(ApplicationRouteMixin, {
    model: function(params) {
        return this.store.find('ticket', params.ticket_id);
    },
    actions: {
    }
});
