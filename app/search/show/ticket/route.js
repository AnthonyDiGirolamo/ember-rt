import Ember from 'ember';
// import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
    model: function(params) {
        console.log("search/show/ticket/route model");
        let ticket = this.store.findRecord('ticket', params.ticket_id, { reload: true }); // always reload
        return ticket;
    },
    // afterModel: function(model) {
    //     console.log("search/show/ticket/route afterModel");
    // },
    actions: {
        reloadTicket: function() {
            console.log("search/show/ticket/route reloadTicket");
            // this.refresh();
            this.modelFor('search/show/ticket').reload().then((ticket) => {
                ticket.get('messages').reload().then((messages) => {
                    messages.forEach((message) => {
                        message.get('emails').reload();
                    });
                });
            });
        }
    }
});
