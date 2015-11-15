import DS from 'ember-data';

export default DS.Model.extend({
    name:      DS.attr('string'),
    rtquery:   DS.attr('string'),
    rtformat:  DS.attr('string'),
    rtorderby: DS.attr('string'),
    tickets:   DS.hasMany('tickets', {async: true})
});
