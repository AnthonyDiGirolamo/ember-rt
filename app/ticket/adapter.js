import Ember from 'ember';
import ApplicationAdapter from '../adapters/application';
import { parseTicket, parseHistory, parseAttachment } from '../utils/rt-api-parser';

export default ApplicationAdapter.extend({
    buildURL: function(root, suffix, record) {
        // console.log(root);
        // console.log(suffix);
        // console.log(record);
        // let url = this._super();
        let url = `${url}/ticket/${suffix}/show`;
        // if (url.toString().contains('conversations')){
        //     url = url.replace('conversations', 'me/convos');
        // }
        // console.log(url);
        return url;
    },

    findRecord: function(store, type, id, snapshot) {

        // console.log("findRecord");
        // console.log([store, type, id, snapshot]);

        // var url = [type.modelName, id].join('/');
        var url = `${this.namespace}/ticket/${id}/show`;

        // console.log("url:");
        // console.log(url);


        return new Ember.RSVP.Promise((resolve, reject) => {
            Ember.$.ajax(url, type.modelName, {
                method: 'GET',
                dataType: 'html'
            }).then((data, textStatus, xhr) => {
                // console.log(xhr);
                Ember.run(null, resolve, parseTicket(data, this.namespace));
                // Ember.run(() => {
                //     resolve(parseTicket(data, this.namespace));
                // });
            }, (xhr, status, error) => {
                console.log("fail:");
                // var response = xhr.responseText;
                // console.log(status);
                // console.log(error);
                console.log(xhr.responseText);
                // console.log(xhr.getAllResponseHeaders());

                xhr.then = null;
                Ember.run(null, reject, xhr.responseText);
                // Ember.run(function() {
                //     reject(xhr.responseText);
                // });
            });
        });
    },

    findHasMany: function(store, snapshot, url, relationship) {
        // console.log("ticket findHasMany");
        // console.log([store, snapshot, url, relationship]);
        // var parent_ticket = snapshot;
        // console.log("url:");
        // console.log(url);
        // // var url = this.urlPrefix(url, this.buildURL(type, id, null, 'findHasMany'));

        return new Ember.RSVP.Promise((resolve, reject) => {
            Ember.$.ajax(url, relationship.type, {
                method: 'GET',
                dataType: 'html'
            }).then((data, textStatus, xhr) => {
                console.log(`ticket adapter fetch: ${relationship.type}`);
                // console.log(data);
                let json_data = {};
                if (relationship.type === 'message') {
                    json_data = parseHistory(data, this.namespace, snapshot.id);
                }
                else if (relationship.type === 'attachment') {
                    json_data = parseAttachment(data, this.namespace, snapshot.id);
                }
                Ember.run(null, resolve, json_data);
            }, (xhr, status, error) => {
                console.log("fail:");
                console.log(xhr.responseText);
                xhr.then = null;
                Ember.run(null, reject, xhr.responseText);
            });
        });
    }

});
