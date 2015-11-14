import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';

export default Base.extend({
    tokenEndpoint: '/REST/1.0/',

    restore: function(data) {
        console.log("restore...");
        console.log(data);
        return new Ember.RSVP.Promise((resolve, reject) => {
            if (!Ember.isEmpty(data.token)) {
                resolve(data);
            } else {
                reject();
            }
        });
    },

    authenticate: function(options) {
        console.log("authenticate");
        return new Ember.RSVP.Promise((resolve, reject) => {
            Ember.$.ajax({
                url: this.tokenEndpoint,
                method: 'POST',
                data: `user=${options.user}&pass=${options.password}`,
                // contentType: 'application/json;charset=utf-8',
                dataType: 'html'
            }).then((response, textStatus, xhr) => {
                // console.log(xhr);
                // console.log(xhr.id_token);
                // console.log(status);
                // console.log(error);
                // console.log(response);
                console.log(xhr.responseText);
                // console.log(xhr.getAllResponseHeaders());
                Ember.run(() => {
                    resolve(response);
                });
            }, (xhr, status, error) => {
                var response = xhr.responseText;
                // console.log(status);
                // console.log(error);
                console.log(xhr.responseText);
                // console.log(xhr.getAllResponseHeaders());
                Ember.run(() => {
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
