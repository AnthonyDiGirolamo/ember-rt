import Ember from 'ember';
import ApplicationAdapter from '../adapters/application';
import { parseEmail } from '../utils/rt-api-parser';

export default ApplicationAdapter.extend({
    findHasMany: function(store, snapshot, url, relationship) {
        // console.log("message findHasMany");
        // console.log([store, snapshot, url, relationship]);

        return new Ember.RSVP.Promise((resolve, reject) => {
            Ember.$.ajax(url, relationship.type, {
                method: 'GET',
                dataType: 'html'
            }).then((data, textStatus, xhr) => {
                console.log(`email adapter fetch: ${url}`);
                console.log(data);
                Ember.run(null, resolve, {});
            }, (xhr, status, error) => {
                console.log("fail:");
                console.log(xhr.responseText);
                xhr.then = null;
                Ember.run(null, reject, xhr.responseText);
            });
        });
    }
});
