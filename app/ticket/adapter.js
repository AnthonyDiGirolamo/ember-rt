import Ember from 'ember';
import ApplicationAdapter from '../adapters/application';
import { parseSearch, parseTicket, parseHistory, parseAttachment } from '../utils/rt-api-parser';

export default ApplicationAdapter.extend({
    // find: function(store, type, id, snapshot) {
    //     console.log("ticket adapter find");
    //     console.log([store, type, id, snapshot]);
    //     return {};
    // },

    // ticket search method
    query: function(store, type, query, snapshot) {
        console.log("ticket adapter query");
        console.log([store, type, query, snapshot]);

        let url = `/REST/1.0/search/ticket?query=${query.query}&format=l`;
        console.log(url);
        return new Ember.RSVP.Promise((resolve, reject) => {
            Ember.$.ajax(url, 'ticket', {
                method: 'GET',
                dataType: 'html'
            }).then((data, textStatus, xhr) => {
                Ember.run(null, resolve, parseSearch(data));
            }, (xhr, status, error) => {
                console.log("fail:");
                console.log(xhr.responseText);
                // xhr.then = null;
                Ember.run(null, reject, xhr.responseText);
            });
        });
    },

    findRecord: function(store, type, id, snapshot) {

        console.log("ticket findRecord");
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
        // console.log(url);

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
