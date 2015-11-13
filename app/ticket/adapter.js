import Ember from 'ember';
import ApplicationAdapter from '../adapters/application';
import { parseTicket, parseHistory } from '../utils/rt-api-parser';

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
        // console.log([store, type, id, snapshot]);

        // var url = [type.modelName, id].join('/');
        var url = `${this.namespace}/ticket/${id}/show`;

        console.log(type);
        return new Ember.RSVP.Promise((resolve, reject) => {
            Ember.$.ajax(url, type, {
                method: 'GET',
                dataType: 'html'
            }).then((data, textStatus, xhr) => {
                // console.log(xhr);
                // console.log("success:"); console.log(data);
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

    findHasMany: function(store, snapshot, url) {
        console.log(url);
        console.log(snapshot);
        return new Ember.RSVP.Promise((resolve, reject) => {
            Ember.$.ajax(url, {
                method: 'GET',
                dataType: 'html'
            }).then((data, textStatus, xhr) => {
                Ember.run(null, resolve, parseHistory(data, this.namespace));
            }, (xhr, status, error) => {
                console.log("fail:");
                console.log(xhr.responseText);
                xhr.then = null;
                Ember.run(null, reject, xhr.responseText);
            });
        });
    }
});
