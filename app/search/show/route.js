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
            // console.log(data);
            this.set('tickets', data);
        });
    },
    setupController: function(controller, model) {
        console.log("search show route setupController");
        // console.log(model);
        // console.log(this.get('tickets'));
        controller.set('model', model)
        controller.set('tickets', this.get('tickets'))
    },

    actions: {
    }
});
