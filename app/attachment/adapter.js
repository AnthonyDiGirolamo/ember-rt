import Ember from 'ember';
import ApplicationAdapter from '../adapters/application';
import { parseAttachment } from '../utils/rt-api-parser';

export default ApplicationAdapter.extend({
    findHasMany: function(store, snapshot, url, relationship) {
        console.log("attachment findHasMany");
        console.log(snapshot);
        // let ticket_id = snapshot.get('ticket').get('id');
        // console.log([store, snapshot, url, relationship]);

        return new Ember.RSVP.Promise((resolve, reject) => {
            Ember.$.ajax(url, relationship.type, {
                method: 'GET',
                dataType: 'html'
            }).then((data, textStatus, xhr) => {
                Ember.run(null, resolve, parseAttachment(data, this.namespace, snapshot.id));
            }, (xhr, status, error) => {
                console.log("fail:");
                console.log(xhr.responseText);
                xhr.then = null;
                Ember.run(null, reject, xhr.responseText);
            });
        });
    }
});
