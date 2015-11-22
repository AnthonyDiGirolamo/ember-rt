import Ember from 'ember';
// import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

// export default Ember.Route.extend(AuthenticatedRouteMixin, {
export default Ember.Route.extend(ApplicationRouteMixin, {
    model: function() {
        return this.store.findAll('search');
    },
    actions: {
        createNewSearch: function() {
            this.store.createRecord('search', {
                name: 'New Search'
            });
        }
    }
});
