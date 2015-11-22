import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
    actions: {
        invalidateSession: function() {
            this.get('session').invalidate();
        },

        showModal: function(name, model) {
            console.log(name);
            console.log(model);
            this.render(name, {
                into: 'application',
                outlet: 'modal',
                model: model
            });
        },
        removeModal: function() {
            this.disconnectOutlet({
                outlet: 'modal',
                parentView: 'application'
            });
        }

    }
});
