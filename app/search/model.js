import Ember from 'ember';
import DS from 'ember-data';
import { parseSearch } from '../utils/rt-api-parser';

export default DS.Model.extend({
    name:      DS.attr('string'),
    rtquery:   DS.attr('string'),
    rtorderby: DS.attr('string'),

    rtQueryString: function() {
        let q = `/REST/1.0/search/ticket?query=${this.get('rtquery')}&format=l`
        if ( this.get('rtorderby') ) {
            q += `&orderby=${this.get('rtorderby')}`;
        }
        return q;
    }.property('rtquery', 'rtorderby'),

    tickets: function() {
        console.log("tickets search model");

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
    }.property('rtQueryString'),
    // tickets:   DS.hasMany('tickets', {async: true})
});
