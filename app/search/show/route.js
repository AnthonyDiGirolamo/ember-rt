import Ember from 'ember';
// import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
    model: function(params) {
        console.log("search show route model");
        return this.store.find('search', params.search_id);
    },
    afterModel: function(model) {
        console.log("search show route after model");
        return this.store.find('ticket', model.get('rtQueryParams')).then((data) => {
            console.log(data);
            this.set('tickets', data);
        });
    },

    tickets: function() {
        console.log("search show tickets");
        console.log(this.get('model'));
        console.log(this.get('model').get('rtquery'));
        let q = this.get('model').get('rtQueryParams');
        console.log(q);
        return this.store.find('ticket', q);
    }.property(),

    actions: {
    }
});
