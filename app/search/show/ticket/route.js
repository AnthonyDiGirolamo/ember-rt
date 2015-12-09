import Ember from 'ember';
// import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
    model: function(params) {
        console.log("search/show/ticket/route model");
        console.log(params);
        let ticket = this.store.find('ticket', params.ticket_id);
        // console.log(ticket);
        // ticket.refresh();
        return ticket;
    },
    afterModel: function(model) {
        console.log("search/show/ticket/route afterModel");
        // return this.store.find('ticket', model.get('id'));
        // this.modelFor('ticket').reload();
    },
    actions: {
    }
});
