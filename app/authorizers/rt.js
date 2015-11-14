import Ember from 'ember';
import Base from 'ember-simple-auth/authorizers/base';

export default Base.extend({
    authorize: function(jqXHR, requestOptions) {
        console.log("authorize");
        var accessToken = this.get('session.content.secure.token');
        console.log(accessToken);
        if (this.get('session.isAuthenticated') && !Ember.isEmpty(accessToken)) {
            jqXHR.setRequestHeader('Authorization', 'Bearer ' + accessToken);
        }
    }
});
