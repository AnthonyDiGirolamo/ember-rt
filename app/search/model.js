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
        params.format = 'l';
        return params;
    }.property('rtquery', 'rtorderby')

});
