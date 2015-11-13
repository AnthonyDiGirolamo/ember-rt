import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';

export default Base.extend({
    tokenEndpoint: '/REST/1.0/',

    restore: function(data) {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            if (!Ember.isEmpty(data.token)) {
                resolve(data);
            } else {
                reject();
            }
        });
    },

    authenticate: function(options) {
        return new Ember.RSVP.Promise((resolve, reject) => {
            Ember.$.ajax({
                url: this.tokenEndpoint,
                method: 'POST',
                data: `user=${options.user}&pass=${options.password}`,
                // contentType: 'application/json;charset=utf-8',
                dataType: 'html'
            }).then(function(response, textStatus, xhr) {
                // console.log(xhr);
                // console.log(xhr.id_token);
                // console.log(status);
                // console.log(error);
                // console.log(response);
                console.log(xhr.responseText);
                // console.log(xhr.getAllResponseHeaders());
                Ember.run(function() {
                    resolve(response);
                });
            }, function(xhr, status, error) {
                var response = xhr.responseText;
                // console.log(status);
                // console.log(error);
                console.log(xhr.responseText);
                // console.log(xhr.getAllResponseHeaders());
                Ember.run(function() {
                    reject(response);
                });
            });
        });
    },

    invalidate: function() {
        console.log('invalidate...');
        return Ember.RSVP.resolve();
    }
});
