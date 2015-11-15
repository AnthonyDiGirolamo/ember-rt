import Ember from 'ember';
import ApplicationAdapter from '../adapters/application';
import { parseSearch } from '../utils/rt-api-parser';

export default ApplicationAdapter.extend({
    findHasMany: function(store, snapshot, url, relationship) {
        console.log("search findHasMany");
        console.log([store, snapshot, url, relationship]);
        // var parent_ticket = snapshot;
        // console.log("url:");
        // console.log(url);
        // // var url = this.urlPrefix(url, this.buildURL(type, id, null, 'findHasMany'));

        return new Ember.RSVP.Promise((resolve, reject) => {
            Ember.$.ajax(url, relationship.type, {
                method: 'GET',
                dataType: 'html'
            }).then((data, textStatus, xhr) => {
                Ember.run(null, resolve, parseSearch(data, this.namespace, snapshot.id));
            }, (xhr, status, error) => {
                console.log("fail:");
                console.log(xhr.responseText);
                xhr.then = null;
                Ember.run(null, reject, xhr.responseText);
            });
        });
    }
});
