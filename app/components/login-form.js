import Ember from 'ember';
export default Ember.Component.extend({
    session: Ember.inject.service('session'),

    authenticator: 'authenticator:rt',

    actions: {
        authenticate: function() {
            var credentials = this.getProperties('user', 'password');
            this.get('session').authenticate('authenticator:rt', credentials).catch((message) => {
                this.set('errorMessage', message);
            });
        }
    }
});
