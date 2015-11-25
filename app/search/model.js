import Ember from 'ember';
import DS from 'ember-data';
import _ from 'lodash/lodash';
import { parseSearch } from '../utils/rt-api-parser';

export default DS.Model.extend({
    name: DS.attr('string'),
    rtquery: DS.attr('string', {
        defaultValue: function() { return ""; }
    }),
    rtorderby: DS.attr('string', {
        defaultValue: function() { return ""; }
    }),
    lastRefreshed: DS.attr('string', {
        defaultValue: function() { return Math.floor(new Date() / 1000); }
    }),

    rtQueryParams: function(){
        let params = {
            query: _.collect((this.get('rtquery') || "").split('\n'), (line) => {
                return line.trim(); // blank line
            }).join('')
        };
        if ( this.get('rtorderby') ) {
            params.orderby = this.get('rtorderby');
        }
        return params;
    }.property('rtquery', 'rtorderby'),

    rtQueryString: function() {
        let rawq =  _.collect((this.get('rtquery') || "").split('\n'), (line) => {
            return line.trim(); // blank line
        }).join('');

        let q = `/REST/1.0/search/ticket?query=${rawq}&format=l`;
        if ( this.get('rtorderby') ) {
            q += `&orderby=${this.get('rtorderby')}`;
        }
        return q;
    }.property('rtquery', 'rtorderby'),

    tickets: function() {
        // console.log("tickets search model");

        return new Ember.RSVP.Promise((resolve, reject) => {
            Ember.$.ajax(this.get('rtQueryString'), 'ticket', {
                method: 'GET',
                dataType: 'html'
            }).then((data, textStatus, xhr) => {
                this.set('tickets', parseSearch(data));
                // Ember.run(null, resolve, parseSearch(data));
            }, (xhr, status, error) => {
                console.log("fail:");
                console.log(xhr.responseText);
                // xhr.then = null;
                // Ember.run(null, reject, xhr.responseText);
            });
        });
    }.property('lastRefreshed'),
    // tickets:   DS.hasMany('tickets', {async: true})
});
